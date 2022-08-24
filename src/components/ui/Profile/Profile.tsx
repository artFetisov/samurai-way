import React from 'react';
import styles from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {IProfile} from "../../../types/types";

interface IProfileProps {
    isOwner?: boolean
    userProfile: IProfile | null
    status?: string
    updateStatus?: (status: string) => void
    savePhoto?: (file: any) => void
    saveProfile?: (profile: IProfile) => Promise<any>
}

const Profile: React.FC<IProfileProps> = (props) => {
    return <div className={styles.container}>
        <ProfileInfo userProfile={props.userProfile}
                     isOwner={props.isOwner}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     savePhoto={props.savePhoto}
                     saveProfile={props.saveProfile}
        />
    </div>

}

export default Profile;