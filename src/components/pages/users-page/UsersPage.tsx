import {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {UsersAsyncActionCreators} from "../../../store/reducers/users/action-creators";
import {AppStateType} from "../../../store";
import {IUserState} from "../../../store/reducers/users/types";
import {Users} from "../../ui/users/Users";
import styles from "../../ui/users/Users.module.scss";
import React from 'react';
import {Col, Row} from 'antd';
import {MyLoader} from "../../ui/loader/SkeletonLoader";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";

const UsersPage: FC = () => {
    // useAuthRedirect()
    const dispatch = useTypedDispatch()
    const {
        currentPage,
        filter,
        pageSize,
        isFetching
    } = useSelector<AppStateType, IUserState>(state => state.users)

    useEffect(() => {
        dispatch(UsersAsyncActionCreators.requestUsers(currentPage, pageSize, filter))
    }, [])

    return <Row>
        <Col className={styles.container}>
            <div>Все пользователи</div>
            {isFetching ? Array(5).fill(<MyLoader/>) : <Users/>}
        </Col>
    </Row>
}

export default UsersPage;
