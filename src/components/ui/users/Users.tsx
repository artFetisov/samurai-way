import React, {FC, useEffect} from 'react'
import {Paginator} from '../../ui/Paginator/Paginator'
import {User} from './User'
import {useSelector, useDispatch} from 'react-redux'
import {Pagination} from 'antd';
import styles from './Users.module.scss';
// import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'
import {AppStateType} from "../../../store";
import {IUserState} from "../../../store/reducers/users/types";
import {UsersAsyncActionCreators} from "../../../store/reducers/users/action-creators";
import {IFilter, IUser} from "../../../types/types";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";

// type QueryParamsType = {
//     term?: string
//     page?: string
//     friend?: string
// }


export const Users: FC = () => {
    const {
        users,
        followingInProgress,
        currentPage,
        totalUsersCount,
        pageSize,
        filter, portionNumber
    } = useSelector<AppStateType, IUserState>(state => state.users)

    const dispatch = useTypedDispatch()

    // const history = useHistory()

    // useEffect(() => {
    //     const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType
    //     let actualPage = currentPage
    //     let actualFilter = filter
    //     if (parsed.page) actualPage = Number(parsed.page)
    //     if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
    //     if (parsed.friend) actualFilter = {
    //         ...actualFilter,
    //         friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false
    //     }
    //     dispatch(UsersAsyncActionCreators.requestUsers(actualPage, pageSize, actualFilter))
    // }, [])

    // useEffect(() => {
    //
    //     const query: QueryParamsType = {}
    //
    //     if (filter.term) query.term = filter.term
    //     if (filter.friend !== null) query.friend = String(filter.friend)
    //     if (currentPage !== 1) query.page = String(currentPage)
    //
    //     history.push({
    //         pathname: '/users',
    //         search: queryString.stringify(query)
    //     })
    // }, [filter, currentPage])


    const onPageChange = (pageNumber: number) => {
        dispatch(UsersAsyncActionCreators.requestUsers(pageNumber, pageSize, filter))
    }

    //
    // const onFilterChanged = (filter: IFilter) => {
    //     // dispatch(UsersAsyncActionCreators.requestUsers(1, pageSize, filter))
    // }

    // const followThunk = (userId: number) => {
    //     // dispatch(UsersAsyncActionCreators.follow(userId))
    // }
    //
    // const unfollowThunk = (userId: number) => {
    //     // dispatch(UsersAsyncActionCreators.unfollow(userId))
    // }


    return (
        <>
            <div>
                {users && users.map(user => <User
                    user={user}
                    key={user.id}
                    followingInProgress={followingInProgress}
                />)}
            </div>
            <Paginator
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                portionNumber={portionNumber}
            />
        </>
    );
}


