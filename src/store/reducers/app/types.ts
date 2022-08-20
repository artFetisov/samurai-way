export interface IAppState {
    initialized: boolean,
}

export enum AppEnumAction {
    INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'
}

export interface InitializedSuccess {
    type: AppEnumAction.INITIALIZED_SUCCESS
}

export type AppActions = InitializedSuccess