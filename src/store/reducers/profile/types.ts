import {IPhotos, IPost, IProfile} from "../../../types/types";

export interface IProfileState {
    posts: IPost[]
    userProfile: IProfile | null
    status: string
    myProfile: IProfile | null
    isLoading: boolean
}

export enum ProfileEnumAction {
    ADD_POST = 'ADD-POST',
    SET_USER_PROFILE = 'SET-USER-PROFILE',
    SET_STATUS = 'SET-STATUS',
    DELETE_POST = 'DELETE-POST',
    SET_PHOTO = 'SAVE-PHOTO',
    SET_MY_PROFILE = 'SET-MY-PROFILE',
    SET_IS_LOADING = 'SET-IS-LOADING'
}

export interface AddPostAction {
    type: ProfileEnumAction.ADD_POST,
    newPostText: string
}

export interface SetUserProfileAction {
    type: ProfileEnumAction.SET_USER_PROFILE,
    userProfile: IProfile
}

export interface SetMyProfileAction {
    type: ProfileEnumAction.SET_MY_PROFILE,
    myProfile: IProfile
}

export interface DeletePostAction {
    type: ProfileEnumAction.DELETE_POST,
    postId: number
}

export interface SetStatusAction {
    type: ProfileEnumAction.SET_STATUS,
    status: string
}

export interface SetPhotoAction {
    type: ProfileEnumAction.SET_PHOTO,
    photos: IPhotos
}

export interface SetIsLoadingAction {
    type: ProfileEnumAction.SET_IS_LOADING,
    isLoading: boolean
}


export type ProfileActions =
    AddPostAction
    | SetUserProfileAction
    | DeletePostAction
    | SetStatusAction
    | SetPhotoAction
    | SetMyProfileAction
    | SetIsLoadingAction
