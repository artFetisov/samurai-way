import {IProfileState, ProfileActions, ProfileEnumAction} from "./types";
import {IProfile} from "../../../types/types";

const initialState: IProfileState = {
    posts: [
        {id: 0, message: 'You', likesCount: 0},
        {id: 1, message: 'Goodbye', likesCount: 2},
        {id: 2, message: 'I am the Best', likesCount: 18},
        {id: 3, message: 'Rock Star', likesCount: 18},
        {id: 4, message: 'I am believe you', likesCount: 101},
        {id: 5, message: 'Believer', likesCount: 39},
    ],
    userProfile: null,
    status: '',
    myProfile: null,
    isLoading: false,
    isOwner: null
}

export default function profileReducer(state = initialState, action: ProfileActions): IProfileState {
    switch (action.type) {
        case ProfileEnumAction.ADD_POST:
            const newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }

        case ProfileEnumAction.SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile,
            }

        case ProfileEnumAction.SET_STATUS:
            return {
                ...state,
                status: action.status,
            }

        case ProfileEnumAction.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }


        case ProfileEnumAction.SET_MY_PROFILE:
            return {
                ...state, myProfile: action.myProfile
            }

        case ProfileEnumAction.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.postId),
            }

        case ProfileEnumAction.SET_PHOTO:
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photos} as IProfile
            }

        default:
            return state
    }
}
