import React, {FC} from "react";
import {Row, Col} from "antd";
import styles from '../../ui/LoginForm/Login.module.scss';
import {LoginForm} from "../../ui/LoginForm/LofinForm";


export const LoginPage: FC = () => {

    return <div className={styles.wrapper}>
        <LoginForm/>
    </div>
}