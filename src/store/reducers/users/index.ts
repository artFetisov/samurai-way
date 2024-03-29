import {updateObjectInArray} from '../../../utils/objectHelpers'
import {IUserState, UsersActions, UsersEnumAction} from "./types";

let initialState: IUserState = {
    users: [],
    pageSize: 10,
    portionNumber: 1,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null,
    },
}

export default function usersReducer(state = initialState, action: UsersActions): IUserState {
    switch (action.type) {
        case UsersEnumAction.FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
            }

        case UsersEnumAction.UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
            }

        case UsersEnumAction.SET_USERS:
            return {...state, users: action.users}

        case UsersEnumAction.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case UsersEnumAction.SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}

        case UsersEnumAction.TOGGLE_PRELOADER:
            return {...state, isFetching: action.isFetching}

        case UsersEnumAction.SET_FILTER:
            return {...state, filter: action.payload}

        case UsersEnumAction.TOGGLE_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.verity
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId),
            }

        case UsersEnumAction.SET_PORTION_NUMBER:
            return {
                ...state, portionNumber: action.portionNumber
            }

        default:
            return state
    }
}

