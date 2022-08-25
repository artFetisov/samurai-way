import React, {FC} from "react";
import styles from './Header.module.scss';
import {Button, Image} from "antd";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export const Header: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    const {myProfile} = useTypedSelector(state => state.profile)

    return <header className={styles.header}>
        <div className={styles.container}>
            {isAuth && myProfile?.photos?.small && myProfile.photos.large
                && <>
                    <img className={styles.img}
                         src={myProfile.photos.large
                             ? myProfile.photos.large
                             : myProfile.photos.small}
                         alt={'avatar'}
                    />
                    <Button className={styles.btn} type={'primary'}>Выйти</Button>
                </>}
        </div>
    </header>
}