import {AppRootThunk} from "../../index";
import {AppActions, AppEnumAction} from "./types";
import {AuthAsyncActionCreators} from "../auth/action-creators";
import {ProfileThunkCreators} from "../profile/action-creators";

export const AppActionCreators = {
    initializedSuccess: () => ({type: AppEnumAction.INITIALIZED_SUCCESS}),
}

export const AppAsyncActionCreators = {
    initializeApp: (): AppRootThunk => async dispatch => {
        const response = dispatch(AuthAsyncActionCreators.loginization())
        Promise.all([response]).then(() => {
            dispatch(AppActionCreators.initializedSuccess())
        })
    }
}
