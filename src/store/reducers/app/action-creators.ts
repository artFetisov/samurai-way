import {AppRootThunk} from "../../index";
import {AppEnumAction} from "./types";
import {AuthThunkCreators} from "../auth/action-creators";

export const AppActionCreators = {
    initializedSuccess: () => ({type: AppEnumAction.INITIALIZED_SUCCESS}),
}

export const AppAsyncActionCreators = {
    initializeApp: (): AppRootThunk => async dispatch => {
        const response = dispatch(AuthThunkCreators.loginization())
        Promise.all([response]).then(() => {
            dispatch(AppActionCreators.initializedSuccess())
        })
    }
}
