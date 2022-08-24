import React, {FC} from 'react';
import styles from './Users.module.scss'
import {NavLink} from 'react-router-dom';
import {IUser} from "../../../types/types";
import {Button, Image} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Typography} from 'antd';

const {Text} = Typography;

interface IUserProps {
    followingInProgress: number[]
    // unfollow: (userId: number) => void
    // follow: (userId: number) => void
    user: IUser
}

export const User: FC<IUserProps> = ({user, followingInProgress}) => {
    const smallPhoto = user.photos.small
    const largePhoto = user.photos.large

    return (
        <div className={styles.user}>
            <NavLink to={'/profile/' + user.id}>
                {largePhoto && smallPhoto ? <Image
                    className={styles.image}
                    src={largePhoto ? largePhoto : smallPhoto}
                    alt={'avatar'}
                    preview={false}
                /> : <div className={styles.avatar}><UserOutlined/></div>}
            </NavLink>
            <div className={styles.info}>
                <Text className={styles.name}>{user.name}</Text>
                <div className={styles.status}>{user.status}</div>
            </div>
            {user.followed
                ? <Button
                    className={styles.btn}
                    disabled={followingInProgress.some(id => id === user.id)}
                    type='primary'
                >
                    Отписаться
                </Button>
                : <Button
                    className={styles.btn}
                    disabled={followingInProgress.some(id => id === user.id)}
                    type='primary'
                >Подписаться</Button>
            }
        </div>
    );

}

