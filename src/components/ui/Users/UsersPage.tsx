import React from 'react'
import {useSelector} from 'react-redux'
import {Users} from './Users'
import Preloader from '../../ui/Preloader/Preloader'
import {AppStateType} from "../../../store";
import {IUserState} from "../../../store/reducers/users/types";

type UserPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UserPagePropsType> = (props) => {
    const {isFetching} = useSelector<AppStateType, IUserState>(state => state.users)

    return (
        <>
            <h2>{props.pageTitle}</h2>
            {isFetching
                ? <Preloader/>
                : null
            }
            <Users/>
        </>
    )
}


