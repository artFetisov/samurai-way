import {Dispatch} from "redux";
import {ResponseType, ResultCodeEnum} from "../../../api/api";
import {BaseThunkType} from "../../index";
import {
    FollowAction,
    SetCurrentPageAction,
    SetFilterAction,
    SetPortionNumberAction,
    SetTotalUsersCountAction,
    SetUsersAction,
    ToggleInProgressAction,
    TogglePreloaderAction,
    UnfollowAction,
    UsersActions,
    UsersEnumAction
} from "./types";
import {IFilter, IUser} from "../../../types/types";
import {UsersService} from "../../../services/users.service";

export const UsersActionCreators = {
    followSuccess: (userId: number): FollowAction => ({type: UsersEnumAction.FOLLOW, userId}),
    unfollowSuccess: (userId: number): UnfollowAction => ({type: UsersEnumAction.UNFOLLOW, userId}),
    setPortionNumber: (portionNumber: number): SetPortionNumberAction => ({
        type: UsersEnumAction.SET_PORTION_NUMBER,
        portionNumber
    }),
    setUsers: (users: IUser[]): SetUsersAction => ({type: UsersEnumAction.SET_USERS, users}),
    setCurrentPage: (currentPage: number): SetCurrentPageAction => ({
        type: UsersEnumAction.SET_CURRENT_PAGE,
        currentPage
    }),
    setFilter: (filter: IFilter): SetFilterAction => ({type: UsersEnumAction.SET_FILTER, payload: filter}),
    setTotalUsersCount: (totalUsersCount: number): SetTotalUsersCountAction => ({
        type: UsersEnumAction.SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }),
    togglePreloader: (isFetching: boolean): TogglePreloaderAction => ({
        type: UsersEnumAction.TOGGLE_PRELOADER,
        isFetching
    }),
    toggleProgress: (verity: boolean, userId: number): ToggleInProgressAction => ({
        type: UsersEnumAction.TOGGLE_IN_PROGRESS,
        verity,
        userId
    }),
}

export const UsersAsyncActionCreators = {
    requestUsers: (currentPage: number, pageSize: number, filter: IFilter): ThunkType =>
        async (dispatch: Dispatch<UsersActions>) => {
            dispatch(UsersActionCreators.togglePreloader(true))
            dispatch(UsersActionCreators.setCurrentPage(currentPage))
            dispatch(UsersActionCreators.setFilter(filter))
            const response = await UsersService.getUsers(currentPage, pageSize, filter.term, filter.friend)
            dispatch(UsersActionCreators.togglePreloader(false))
            dispatch(UsersActionCreators.setUsers(response.items))
            dispatch(UsersActionCreators.setTotalUsersCount(response.totalCount))
        },
    followUnfollowFlow: async (
        dispatch: Dispatch<UsersActions>,
        userId: number,
        apiMethod: (userId: number) => Promise<ResponseType>,
        actionCreator: (userId: number) => UsersActions
    ) => {
        dispatch(UsersActionCreators.toggleProgress(true, userId))
        const response = await apiMethod(userId)
        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(actionCreator(userId))
        }
        dispatch(UsersActionCreators.toggleProgress(false, userId))
    },
    follow: (userId: number): ThunkType =>
        async (dispatch) => {
            // @ts-ignore
            await UsersAsyncActionCreators.followUnfollowFlow(dispatch, userId, UsersService.followUser.bind(UsersService), UsersActionCreators.followSuccess)
        },
    unfollow: (userId: number): ThunkType =>
        async (dispatch) => {
            // @ts-ignore
            await UsersAsyncActionCreators.followUnfollowFlow(dispatch, userId, UsersService.unfollowUser.bind(UsersService), UsersActionCreators.unfollowSuccess)
        }
}

type ThunkType = BaseThunkType<UsersActions>
