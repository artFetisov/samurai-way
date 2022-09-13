import {ResultCodeEnum, ResultCodeForCaptcha} from "../../../api/api";
// import {stopSubmit} from "redux-form";
import {securityApi} from "../../../api/security-api";
import {AppRootThunk} from "../../index";
import {AuthActionEnum, AuthActions, SetUserDataAction} from "./types";
import {AuthService} from "../../../services/auth.service";
import {ProfileThunkCreators} from "../profile/action-creators";

export const AuthActionCreators = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataAction =>
        ({
            type: AuthActionEnum.SET_USER_DATA,
            payload: {id, email, login, isAuth},
        }),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: AuthActionEnum.GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    }),
}

export const AuthAsyncActionCreators = {
    loginization: (): AppRootThunk => async dispatch => {
        const response = await AuthService.authLogin()
        if (response.resultCode === ResultCodeEnum.Success) {
            const {id, email, login} = response.data
            dispatch(ProfileThunkCreators.getMyProfile(id))
            dispatch(AuthActionCreators.setUserData(id, email, login, true))
        }
    },
    login: (email: string, password: string, rememberMe: boolean, captcha: string): AppRootThunk =>
        async dispatch => {
            let response = await AuthService.login(email, password, rememberMe, captcha)
            if (response.resultCode === ResultCodeEnum.Success) {
                dispatch(AuthAsyncActionCreators.loginization())
            } else {
                if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(AuthAsyncActionCreators.getCaptchaUrl())
                }
                let message = response.messages.length > 0 ? response.messages : 'Some Error'
                // dispatch(stopSubmit('login', {_error: message}))
            }
        },
    logout: (): AppRootThunk => async dispatch => {
        let response = await AuthService.logout()
        if (response.resultCode === ResultCodeEnum.Success) {
            dispatch(AuthActionCreators.setUserData(null, null, null, false))
        }
    },
    getCaptchaUrl: (): AppRootThunk => async dispatch => {
        let response = await securityApi.getCaptchaUrl()
        let captchaUrl = response.url
        // dispatch(AuthActionCreators.getCaptchaUrlSuccess(captchaUrl))
    }
}