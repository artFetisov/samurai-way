import {FC, ReactNode} from "react";
import {Layout} from 'antd';
import styles from './Latour.module.scss';
import {NavLink} from "react-router-dom";

const {Header, Footer, Sider, Content} = Layout;

export const MyLayout: FC<{ children?: ReactNode }> = ({children}) => {
    return <Layout>
        <Header className={styles.header}>Header</Header>
        <div className={styles.container}>
            <Layout className={styles.content}>
                <Sider className={styles.navbar}>
                    <NavLink to={'/profile'}>Моя страница</NavLink>
                    <NavLink to={'/dialogs'}>Мессенджер</NavLink>
                    <NavLink to={'/users'}>Пользователи</NavLink>
                </Sider>
                <Content>
                    {children}
                </Content>
            </Layout>
        </div>
    </Layout>
}