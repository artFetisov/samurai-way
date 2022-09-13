import {AppRootThunk, AppStateType} from "../../index";
import {IPhotos, IProfile} from "../../../types/types";
import {
    AddPostAction,
    DeletePostAction,
    ProfileEnumAction,
    SetIsLoadingAction,
    SetIsOwner,
    SetMyProfileAction,
    SetPhotoAction,
    SetStatusAction,
    SetUserProfileAction
} from "./types";
import {ProfileService} from "../../../services/profile.service";

export const ProfileActionCreators = {
    addPost: (newPostText: string): AddPostAction => ({type: ProfileEnumAction.ADD_POST, newPostText}),
    deletePost: (postId: number): DeletePostAction => ({type: ProfileEnumAction.DELETE_POST, postId}),
    setUserProfile: (userProfile: IProfile): SetUserProfileAction => ({
        type: ProfileEnumAction.SET_USER_PROFILE,
        userProfile
    }),
    setMyProfile: (myProfile: IProfile): SetMyProfileAction => ({type: ProfileEnumAction.SET_MY_PROFILE, myProfile}),
    setStatus: (status: string): SetStatusAction => ({type: ProfileEnumAction.SET_STATUS, status}),
    savePhotoSuccess: (photos: IPhotos): SetPhotoAction => ({type: ProfileEnumAction.SET_PHOTO, photos}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({type: ProfileEnumAction.SET_IS_LOADING, isLoading}),
    setIsOwner: (isOwner: boolean): SetIsOwner => ({type: ProfileEnumAction.SET_IS_OWNER, isOwner})
}

export const ProfileThunkCreators = {
    getUserProfile: (userId: number | null): AppRootThunk => async dispatch => {
        dispatch(ProfileActionCreators.setIsLoading(false))
        const response = await ProfileService.getUserProfile(userId)
        dispatch(ProfileThunkCreators.getUserStatus(userId as number))
        dispatch(ProfileActionCreators.setUserProfile(response))
        dispatch(ProfileActionCreators.setIsLoading(true))
    },
    getMyProfile: (userId: number | null): AppRootThunk => async dispatch => {
        const response = await ProfileService.getUserProfile(userId)
        dispatch(ProfileActionCreators.setMyProfile(response))
    }
    ,
    getUserStatus: (userId: number): AppRootThunk => async dispatch => {
        let response = await ProfileService.getStatus(userId)
        dispatch(ProfileActionCreators.setStatus(response))
    },
    updateUserStatus: (status: string): AppRootThunk => async dispatch => {
        let response = await ProfileService.updateStatus(status)
        if (response.resultCode === 0) {
            dispatch(ProfileActionCreators.setStatus(status))
        }
    },
    savePhoto: (file: File): AppRootThunk => async dispatch => {
        let response = await ProfileService.savePhoto(file)
        if (response.resultCode === 0) {
            dispatch(ProfileActionCreators.savePhotoSuccess(response.data.photos))
        }
    },
    saveProfile: (profile: IProfile): AppRootThunk =>
        async (dispatch, getState: () => AppStateType) => {
            const userId = getState().auth.id
            const response = await ProfileService.saveProfile(profile)
            if (response.resultCode === 0) {
                dispatch(ProfileThunkCreators.getUserProfile(userId))
            } else {
                // dispatch(stopSubmit('profile', {_error: response.messages[0]}))
                return Promise.reject(response.messages[0])
            }
        }
}


