import React, {FC} from 'react';
import styles from './ProfileInfo.module.scss';
import {ProfileStatus} from './ProfileStatus';
import {IProfile} from "../../../../types/types";
import {Image} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {InfoBlock} from "./InfoBlock";
import {ContactsBlock} from "./ContactsBlock";
import {Friends} from "../../users/Friends";

interface IProfileProps {
    userProfile: IProfile | null
    isOwner: boolean
}

export const Profile: FC<IProfileProps> = React.memo(({userProfile, isOwner}) => {

    return <div className={styles.profile}>
        <div className={styles.leftSide}>
            {userProfile?.photos?.small
            && userProfile.photos.large
                ? <Image width={200}
                         className={styles.image}
                         src={userProfile.photos.large
                             ? userProfile.photos.large
                             : userProfile.photos.small}
                         alt={'avatar'}
                         preview={false}/>
                : <span className={styles.avatar}><UserOutlined/></span>
            }
            <Friends/>
        </div>
        <div className={styles.rightSide}>
            <div className={styles.nameWrap}>
                <div className={styles.name}>{userProfile?.fullName}</div>
                <ProfileStatus isOwner={isOwner}/>
            </div>
            <div className={styles.infoBlock}>
                <ContactsBlock userProfile={userProfile}/>
                <InfoBlock userProfile={userProfile}/>
            </div>
        </div>
    </div>
})

