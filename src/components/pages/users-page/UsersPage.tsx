import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UsersAsyncActionCreators} from "../../../store/reducers/users/action-creators";
import {AppStateType} from "../../../store";
import {IUserState} from "../../../store/reducers/users/types";
import {Users} from "../../ui/Users/Users";
import styles from "../../ui/Users/Users.module.scss";
import Grid from "antd/lib/card/Grid";
import {Typography} from 'antd';
import React from 'react';
import {Col, Row} from 'antd';

const {Title} = Typography

export const UsersPage: FC = () => {
    const dispatch = useDispatch()
    const {
        currentPage,
        filter,
        pageSize,
        isFetching
    } = useSelector<AppStateType, IUserState>(state => state.users)

    useEffect(() => {
        // @ts-ignore
        dispatch(UsersAsyncActionCreators.requestUsers(currentPage, pageSize, filter))
    }, [pageSize, currentPage, filter])

    return <Row>
        <Col className={styles.container}>
            <div>Все пользователи</div>
            {isFetching ? <span>...загрузка</span> : <Users/>}
        </Col>
    </Row>

}
