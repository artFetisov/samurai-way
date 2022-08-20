import {BaseThunkType} from "../../index";
import {AppActions, AppEnumAction} from "./types";
import {AuthAsyncActionCreators} from "../auth/action-creators";

export const AppActionCreators = {
    initializedSuccess: () => ({type: AppEnumAction.INITIALIZED_SUCCESS}),
}

export const AppAsyncActionCreators = {
    initializeApp: (): ThunkType => async (dispatch) => {
        let promise = dispatch(AuthAsyncActionCreators.loginization())
        Promise.all([promise]).then(() => {
            dispatch(AppActionCreators.initializedSuccess())
        })
    }
}

type ThunkType = BaseThunkType<AppActions>
