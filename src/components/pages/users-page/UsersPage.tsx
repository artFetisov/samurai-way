import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UsersAsyncActionCreators} from "../../../store/reducers/users/action-creators";
import {AppStateType} from "../../../store";
import {IUserState} from "../../../store/reducers/users/types";
import {Users} from "../../ui/users/Users";
import styles from "../../ui/users/Users.module.scss";
import React from 'react';
import {Col, Row} from 'antd';
import {MyLoader} from "../../ui/loader/SkeletonLoader";

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
    }, [])

    return <Row>
        <Col className={styles.container}>
            <div>Все пользователи</div>
            {isFetching ? Array(5).fill(<MyLoader/>) : <Users/>}
        </Col>
    </Row>
}
