import React, {FC} from "react";
import styles from "./ProfileInfo.module.scss";
import {ProfileStatus} from "./ProfileStatus";
import {Button} from "antd";
import {ContactsBlock} from "./ContactsBlock";
import {InfoBlock} from "./InfoBlock";
import {IProfile} from "../../../../types/types";

interface IProfileDataProps {
    userProfile: IProfile | null
    isOwner: boolean
    editModeHandler: (value: boolean) => void
}

export const ProfileData: FC<IProfileDataProps> = ({userProfile, isOwner, editModeHandler}) => {

    const onClickHandler = () => {
        editModeHandler(true)
    }

    return <div className={styles.infoBlock}>
        {isOwner && <Button size={'large'} type={'primary'} onClick={onClickHandler}>Редактировать профиль</Button>}
        <ContactsBlock userProfile={userProfile}/>
        <InfoBlock userProfile={userProfile}/>
    </div>
}