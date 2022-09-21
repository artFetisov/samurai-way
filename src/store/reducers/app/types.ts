import {RequestStatusType} from "../../../types/types";

export interface IAppState {
    initialized: boolean,
    error: string | null,
    status: RequestStatusType
}

export enum AppEnumAction {
    INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS',
    SET_APP_ERROR = 'SET-APP-ERROR',
    SET_APP_STATUS = 'SET-APP-STATUS'
}

export interface InitializedSuccessAction {
    type: AppEnumAction.INITIALIZED_SUCCESS
}

export interface SetAppStatusAction {
    type: AppEnumAction.SET_APP_STATUS,
    status: RequestStatusType
}

export interface SetAppErrorAction {
    type: AppEnumAction.SET_APP_ERROR,
    error: string | null
}

export type AppActions = InitializedSuccessAction | SetAppStatusAction | SetAppErrorAction