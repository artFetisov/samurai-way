import {AppRootThunk} from "../../index";
import {AppActions, AppEnumAction} from "./types";
import {AuthAsyncActionCreators} from "../auth/action-creators";

export const AppActionCreators = {
    initializedSuccess: () => ({type: AppEnumAction.INITIALIZED_SUCCESS}),
}

export const AppAsyncActionCreators = {
    initializeApp: (): AppRootThunk => async dispatch => {
        const promise = dispatch(AuthAsyncActionCreators.loginization())
        Promise.all([promise]).then(() => {
            dispatch(AppActionCreators.initializedSuccess())
        })
    }
}
