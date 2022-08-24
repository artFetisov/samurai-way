import {IFilter, IUser} from "../../../types/types";

export interface IUserState {
    users: IUser[]
    pageSize: number
    totalUsersCount: number
    portionNumber: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    filter: IFilter,
}

export enum UsersEnumAction {
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    SET_USERS = 'SET-USERS',
    SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
    SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT',
    TOGGLE_PRELOADER = 'TOGGLE-PRELOADER',
    SET_FILTER = 'SET-FILTER',
    TOGGLE_IN_PROGRESS = 'TOGGLE-IN-PROGRESS',
    SET_PORTION_NUMBER = 'SET-PORTION-NUMBER'
}

export interface FollowAction {
    type: UsersEnumAction.FOLLOW,
    userId: number
}

export interface UnfollowAction {
    type: UsersEnumAction.UNFOLLOW,
    userId: number
}

export interface SetUsersAction {
    type: UsersEnumAction.SET_USERS,
    users: IUser[]
}

export interface SetCurrentPageAction {
    type: UsersEnumAction.SET_CURRENT_PAGE,
    currentPage: number
}

export interface SetTotalUsersCountAction {
    type: UsersEnumAction.SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}

export interface TogglePreloaderAction {
    type: UsersEnumAction.TOGGLE_PRELOADER,
    isFetching: boolean
}

export interface SetFilterAction {
    type: UsersEnumAction.SET_FILTER,
    payload: IFilter
}

export interface ToggleInProgressAction {
    type: UsersEnumAction.TOGGLE_IN_PROGRESS,
    verity: boolean,
    userId: number
}

export interface SetPortionNumberAction {
    type: UsersEnumAction.SET_PORTION_NUMBER,
    portionNumber: number
}

export type UsersActions =
    FollowAction
    | UnfollowAction
    | SetUsersAction
    | SetCurrentPageAction
    | SetTotalUsersCountAction
    | TogglePreloaderAction
    | SetFilterAction
    | ToggleInProgressAction
    | SetPortionNumberAction