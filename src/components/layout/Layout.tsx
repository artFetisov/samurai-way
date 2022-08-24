import {FC, ReactNode} from "react";
import {Layout} from 'antd';
import styles from './Layout.module.scss';
import {NavLink} from "react-router-dom";

const {Header, Footer, Sider, Content} = Layout;

export const MyLayout: FC<{ children?: ReactNode }> = ({children}) => {
    return <Layout>
        <header className={styles.header}>Header</header>
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.navbar}>
                    <NavLink to={'/profile/2'}>Моя страница</NavLink>
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