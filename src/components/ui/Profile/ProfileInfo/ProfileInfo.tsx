import React, {ChangeEvent} from 'react';
import styles from './ProfileInfo.module.scss';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/photo.png';
import {useState} from 'react';
// import {ProfileDataReduxForm} from './ProfileDataForm';
import {IProfile} from "../../../../types/types";
import Preloader from "../../Preloader/Preloader";
import {Image} from "antd";
import {UserOutlined} from "@ant-design/icons";

type PropsType = {
    userProfile: IProfile | null
    isOwner?: boolean
    saveProfile?: (profile: IProfile) => Promise<any>
    savePhoto?: (file: File) => void
    status?: string
    updateStatus?: (status: string) => void
}

export const ProfileInfo: React.FC<PropsType> = React.memo(({
                                                                userProfile,
                                                                isOwner,
                                                                saveProfile,
                                                                savePhoto,
                                                                status,
                                                                updateStatus,
                                                                ...props
                                                            }) => {

    const [editMode, setEditMode] = useState(false);

    // if (!userProfile) {
    //     return <Preloader/>
    // }

    // const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files?.length)
    //         savePhoto(e.target.files[0]);
    // }
    //
    // const onSubmitData = (dataForm: IProfile) => {
    //     saveProfile(dataForm).then(() => {
    //         setEditMode(false)
    //     })
    // }

    return (
        <div>
            <div className={styles.infoBlock}>
                {/*<img src={userProfile?.photos?.large || userPhoto} alt={userProfile.fullName}/>*/}
                {/*{isOwner && <input type="file" onChange={onMainPhotoSelected}></input>}*/}
                {/*{editMode*/}
                {/*    ? <ProfileDataReduxForm initialValues={userProfile} userProfile={userProfile}*/}
                {/*                            onSubmit={onSubmitData}/>*/}
                {/*    : <ProfileData userProfile={userProfile} isOwner={isOwner} goToEditMode={() => {*/}
                {/*        setEditMode(true)*/}
                {/*    }}/>}*/}
                {userProfile?.photos?.small
                && userProfile.photos.large
                    ? <Image className={styles.image}
                             src={userProfile.photos.large
                                 ? userProfile.photos.large
                                 : userProfile.photos.small}
                             alt={'avatar'}
                             preview={false}/>
                    : <div className={styles.avatar}><UserOutlined/></div>
                }
                <div>{userProfile?.aboutMe}</div>
                <div>{userProfile?.contacts.vk}</div>
                <div>{userProfile?.contacts.facebook}</div>
                <div>{userProfile?.contacts.github}</div>
                <div>{userProfile?.contacts.instagram}</div>
                <div>{userProfile?.contacts.youtube}</div>
                <div>{userProfile?.fullName}</div>
                <div>{userProfile?.lookingForAJob}</div>
                <div>{userProfile?.lookingForAJobDescription}</div>
            </div>

            {/*<div className={styles.status}>*/}
            {/*    <ProfileStatusWithHooks status={status}*/}
            {/*                            updateStatus={updateStatus}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
})

type ProfileDataPropsType = {
    userProfile: IProfile
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({userProfile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>Edit</button>}
            <div>
                <b>My name </b>: {userProfile.fullName}
            </div>
            <div>
                <b>Looking for a job </b>: {userProfile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {userProfile.lookingForAJob &&
                <div>
                    <b>My professionals skills</b> : {userProfile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me </b>: {userProfile.aboutMe}
            </div>
            <div>
                {Object.keys(userProfile.contacts)
                    .map((key) => {
                        return <Contact key={key} contactTitle={key}
                            // @ts-ignore
                                        contactValue={userProfile.contacts[key as keyof IContact]}/>
                    })}
            </div>
        </div>
    );
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b> : {contactValue}</div>
}
