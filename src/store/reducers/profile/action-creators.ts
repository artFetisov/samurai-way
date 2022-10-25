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
        try {
            dispatch(ProfileActionCreators.setIsLoading(false))
            const response = await ProfileService.getUserProfile(userId)
            await dispatch(ProfileThunkCreators.getUserStatus(userId as number))
            dispatch(ProfileActionCreators.setUserProfile(response))
            dispatch(ProfileActionCreators.setIsLoading(true))
        } catch (error) {
            console.log(error)
        }

    },
    getMyProfile: (userId: number | null): AppRootThunk => async dispatch => {
        try {
            const response = await ProfileService.getUserProfile(userId)
            dispatch(ProfileActionCreators.setMyProfile(response))
        } catch (error) {
            console.log(error)
        }
    }
    ,
    getUserStatus: (userId: number): AppRootThunk => async dispatch => {
        try {
            const response = await ProfileService.getStatus(userId)
            dispatch(ProfileActionCreators.setStatus(response))
        } catch (error) {
            console.log(error)
        }
    },
    updateUserStatus: (status: string): AppRootThunk => async dispatch => {
        try {
            const response = await ProfileService.updateStatus(status)
            if (response.resultCode === 0) {
                dispatch(ProfileActionCreators.setStatus(status))
            }
        } catch (error) {
            console.log(error)
        }
    },
    savePhoto: (file: File): AppRootThunk => async dispatch => {
        try {
            const response = await ProfileService.savePhoto(file)
            if (response.resultCode === 0) {
                dispatch(ProfileActionCreators.savePhotoSuccess(response.data.photos))
            }
        } catch (error) {
            console.log(error)
        }
    },
    saveProfile: (profile: IProfile): AppRootThunk =>
        async (dispatch, getState: () => AppStateType) => {
            try {
                const userId = getState().auth.id
                const response = await ProfileService.saveProfile(profile)
                if (response.resultCode === 0) {
                    dispatch(ProfileThunkCreators.getUserProfile(userId))
                } else {
                    return Promise.reject(response.messages[0])
                }
            } catch (error) {
                console.log(error)
            }
        }
}


