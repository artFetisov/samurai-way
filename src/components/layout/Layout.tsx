import {FC, ReactNode} from "react";
import {Layout} from 'antd';
import styles from './Layout.module.scss';
import {NavLink} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Header} from "./Header/Header";

const {Content} = Layout;

export const MyLayout: FC<{ children?: ReactNode }> = ({children}) => {
    const {id} = useTypedSelector(state => state.auth)

    return <Layout>
        <Header/>
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.navbar}>
                    <NavLink to={`/profile/${id}`}>Моя страница</NavLink>
                    <NavLink to={'/dialogs'}>Мессенджер</NavLink>
                    <NavLink to={'/users'}>Пользователи</NavLink>
                </div>
                <Content>
                    {children}
                </Content>
            </div>
        </div>
    </Layout>
}