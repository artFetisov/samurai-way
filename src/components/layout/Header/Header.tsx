import React, {FC} from "react";
import styles from './Header.module.scss';
import {Button} from "antd";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {NavLink} from "react-router-dom";

export const Header: FC = () => {
    const {isAuth, id} = useTypedSelector(state => state.auth)
    const {myProfile} = useTypedSelector(state => state.profile)

    return <header className={styles.header}>
        <div className={styles.container}>
            {isAuth && myProfile?.photos?.small && myProfile.photos.large
                && <>
                    <NavLink to={`/profile/${id}`}>
                        <img className={styles.img}
                             src={myProfile.photos.large
                                 ? myProfile.photos.large
                                 : myProfile.photos.small}
                             alt={'avatar'}
                        />
                    </NavLink>

                    <Button className={styles.btn} type={'primary'}>Выйти</Button>
                </>}
        </div>
    </header>
}