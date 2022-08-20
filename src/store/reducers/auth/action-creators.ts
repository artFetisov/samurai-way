import {authAPI} from "../../../api/auth-api";
import {ResultCodeEnum, ResultCodeForCaptcha} from "../../../api/api";
// import {stopSubmit} from "redux-form";
import {securityApi} from "../../../api/security-api";
import {BaseThunkType} from "../../index";
import {AuthActionEnum, AuthActions, SetUserDataAction} from "./types";

export const AuthActionCreators = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataAction =>
        ({
            type: AuthActionEnum.SET_USER_DATA,
            payload: {id, email, login, isAuth},
        }),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'auth/SET_USER_DATA', payload: {captchaUrl}}),
}

export const AuthAsyncActionCreators = {
    loginization: (): ThunkType => async (dispatch) => {
        let response = await authAPI.authLogin()
        if (response.resultCode === ResultCodeEnum.Success) {
            let {id, email, login} = response.data
            dispatch(AuthActionCreators.setUserData(id, email, login, true))
        }
    },
    // login: (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    //     async (dispatch) => {
    //         let response = await authAPI.login(email, password, rememberMe, captcha)
    //         if (response.resultCode === ResultCodeEnum.Success) {
    //             dispatch(AuthAsyncActionCreators.loginization())
    //         } else {
    //             if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
    //                 dispatch(AuthAsyncActionCreators.getCaptchaUrl())
    //             }
    //             let message = response.messages.length > 0 ? response.messages : 'Some Error'
    //             dispatch(stopSubmit('login', {_error: message}))
    //         }
    //     },
    logout: (): ThunkType => async (dispatch) => {
        let response = await authAPI.logout()
        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(AuthActionCreators.setUserData(null, null, null, false))
        }
    },
    getCaptchaUrl: (): ThunkType => async (dispatch) => {
        let response = await securityApi.getCaptchaUrl()
        let captchaUrl = response.url
        // dispatch(AuthActionCreators.getCaptchaUrlSuccess(captchaUrl))
    }
}

type ThunkType = BaseThunkType<AuthActions>
// | ReturnType<typeof stopSubmit