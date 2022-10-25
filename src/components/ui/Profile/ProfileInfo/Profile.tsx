import React, {FC, useState} from 'react';
import styles from './ProfileInfo.module.scss';
import {ProfileStatus} from './ProfileStatus';
import {IProfile} from "../../../../types/types";
import {Button, Image} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {InfoBlock} from "./InfoBlock";
import {ContactsBlock} from "./ContactsBlock";
import {UploadButton} from "../../UploadButton/UploadButton";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {ProfileThunkCreators} from "../../../../store/reducers/profile/action-creators";
import {ProfileData} from "./ProfileData";
import {ProfileDataForm} from "./ProfileDataForm";

interface IProfileProps {
    userProfile: IProfile | null
    isOwner: boolean
}

export const Profile: FC<IProfileProps> = React.memo(({userProfile, isOwner}) => {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useTypedDispatch()

    const editModeHandler = (value: boolean) => {
        setEditMode(value)
    }

    const updatePhotoHandler = (image: File) => {
        dispatch(ProfileThunkCreators.savePhoto(image))
    }

    return <div className={styles.profile}>
        <div className={styles.leftSide}>
            {userProfile?.photos?.small
            && userProfile.photos.large
                ? <Image style={{display: 'block'}}
                         width={200}
                         className={styles.image}
                         src={userProfile.photos.large
                             ? userProfile.photos.large
                             : userProfile.photos.small}
                         alt={'avatar'}
                         preview={false}/>
                : <span className={styles.avatar}><UserOutlined/></span>
            }
            {isOwner && <UploadButton onChange={updatePhotoHandler}></UploadButton>}
        </div>
        <div className={styles.rightSide}>
            <div className={styles.nameWrap}>
                <div className={styles.name}>{userProfile?.fullName}</div>
                <ProfileStatus isOwner={isOwner}/>
            </div>
            {!editMode
                ? <ProfileData userProfile={userProfile} isOwner={isOwner} editModeHandler={editModeHandler}/>
                : <ProfileDataForm userProfile={userProfile} isOwner={isOwner} editModeHandler={editModeHandler}/>
            }
        </div>
    </div>
})

