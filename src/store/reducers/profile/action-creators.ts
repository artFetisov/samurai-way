import {profileAPI} from "../../../api/profile-api";
// import {stopSubmit} from "redux-form";
import {BaseThunkType} from "../../index";
import {IPhotos, IProfile} from "../../../types/types";
import {
    AddPostAction,
    DeletePostAction, ProfileActions,
    ProfileEnumAction,
    SetPhotoAction,
    SetStatusAction,
    SetUserProfileAction
} from "./types";

export const ProfileActionCreators = {
    addPost: (newPostText: string): AddPostAction => ({type: ProfileEnumAction.ADD_POST, newPostText}),
    deletePost: (postId: number): DeletePostAction => ({type: ProfileEnumAction.DELETE_POST, postId}),
    setUserProfile: (userProfile: IProfile): SetUserProfileAction => ({
        type: ProfileEnumAction.SET_USER_PROFILE,
        userProfile
    }),
    setStatus: (status: string): SetStatusAction => ({type: ProfileEnumAction.SET_STATUS, status}),
    savePhotoSuccess: (photos: IPhotos): SetPhotoAction => ({type: ProfileEnumAction.SET_PHOTO, photos}),
}


export const ProfileAsyncActionCreators = {
    getUserProfileId: (userId: number | null): ThunkType =>
        async (dispatch) => {
            let response = await profileAPI.getUserProfile(userId)
            dispatch(ProfileActionCreators.setUserProfile(response))
        },
    getUserStatus: (userId: number): ThunkType =>
        async (dispatch) => {
            let response = await profileAPI.getStatus(userId)
            dispatch(ProfileActionCreators.setStatus(response))
        },
    updateUserStatus: (status: string): ThunkType =>
        async (dispatch) => {
            let response = await profileAPI.updateStatus(status)
            if (response.resultCode === 0) {
                dispatch(ProfileActionCreators.setStatus(status))
            }
        },
    savePhoto: (file: File): ThunkType =>
        async (dispatch) => {
            let response = await profileAPI.savePhoto(file)
            if (response.resultCode === 0) {
                dispatch(ProfileActionCreators.savePhotoSuccess(response.data.photos))
            }
        },
    saveProfile: (profile: IProfile): ThunkType =>
        async (dispatch, getState) => {
            const userId = getState().auth.id
            const response = await profileAPI.saveProfile(profile)
            if (response.resultCode === 0) {
                dispatch(ProfileAsyncActionCreators.getUserProfileId(userId))
            } else {
                // dispatch(stopSubmit('profile', {_error: response.messages[0]}))
                return Promise.reject(response.messages[0])
            }
        }


}


type ThunkType = BaseThunkType<ProfileActions>
