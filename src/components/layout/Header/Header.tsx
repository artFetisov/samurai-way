import React, {FC} from "react";
import styles from './Header.module.scss';
import {Button} from "antd";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {NavLink} from "react-router-dom";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {AuthThunkCreators} from "../../../store/reducers/auth/action-creators";

export const Header: FC = () => {
    const dispatch = useTypedDispatch()
    const {isAuth, id} = useTypedSelector(state => state.auth)
    const {myProfile} = useTypedSelector(state => state.profile)

    const logout = () => {
        dispatch(AuthThunkCreators.logout())
    }

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

                    <Button className={styles.btn} type={'primary'} onClick={logout}>Выйти</Button>
                </>}
        </div>
    </header>
}