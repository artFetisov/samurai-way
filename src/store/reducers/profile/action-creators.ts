// import {stopSubmit} from "redux-form";
import {BaseThunkType} from "../../index";
import {IPhotos, IProfile} from "../../../types/types";
import {
    AddPostAction,
    DeletePostAction,
    ProfileActions,
    ProfileEnumAction,
    SetMyProfileAction,
    SetPhotoAction,
    SetStatusAction,
    SetUserProfileAction
} from "./types";
import {Dispatch} from "redux";
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
}

export const ProfileAsyncActionCreators = {
    getUserProfile: (userId: number | null): ThunkType =>
        async (dispatch: Dispatch<ProfileActions>) => {
            const response = await ProfileService.getUserProfile(userId)
            dispatch(ProfileActionCreators.setUserProfile(response))
        },
    getMyProfile: (userId: number | null): ThunkType =>
        async (dispatch: Dispatch<ProfileActions>) => {
            const response = await ProfileService.getUserProfile(userId)
            dispatch(ProfileActionCreators.setMyProfile(response))
        }
    ,
    getUserStatus: (userId: number): ThunkType =>
        async (dispatch) => {
            let response = await ProfileService.getStatus(userId)
            dispatch(ProfileActionCreators.setStatus(response))
        },
    updateUserStatus: (status: string): ThunkType =>
        async (dispatch) => {
            let response = await ProfileService.updateStatus(status)
            if (response.resultCode === 0) {
                dispatch(ProfileActionCreators.setStatus(status))
            }
        },
    savePhoto: (file: File): ThunkType =>
        async (dispatch) => {
            let response = await ProfileService.savePhoto(file)
            if (response.resultCode === 0) {
                dispatch(ProfileActionCreators.savePhotoSuccess(response.data.photos))
            }
        },
    saveProfile: (profile: IProfile): ThunkType =>
        async (dispatch, getState) => {
            const userId = getState().auth.id
            const response = await ProfileService.saveProfile(profile)
            if (response.resultCode === 0) {
                dispatch(ProfileAsyncActionCreators.getUserProfile(userId))
            } else {
                // dispatch(stopSubmit('profile', {_error: response.messages[0]}))
                return Promise.reject(response.messages[0])
            }
        }
}


type ThunkType = BaseThunkType<ProfileActions>
