import {AppRootThunk} from "../../index";
import {AppEnumAction, SetAppErrorAction, SetAppStatusAction} from "./types";
import {AuthThunkCreators} from "../auth/action-creators";
import {RequestStatusType} from "../../../types/types";

export const AppActionCreators = {
    initializedSuccess: () => ({type: AppEnumAction.INITIALIZED_SUCCESS}),
    setAppError: (error: string | null): SetAppErrorAction => ({type: AppEnumAction.SET_APP_ERROR, error}),
    setAppStatus: (status: RequestStatusType): SetAppStatusAction => ({type: AppEnumAction.SET_APP_STATUS, status})
}

export const AppThunkCreators = {
    initializeApp: (): AppRootThunk => async dispatch => {
        try {
            const response = await dispatch(AuthThunkCreators.loginization())
            Promise.all([response]).then(() => {
                // @ts-ignore
                dispatch(AppActionCreators.initializedSuccess())
            })
        } catch (error) {
            console.log(error)
        }
    }
}
