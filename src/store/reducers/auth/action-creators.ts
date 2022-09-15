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

export const AuthThunkCreators = {
    loginization: (): AppRootThunk => async dispatch => {
        try {
            const response = await AuthService.authLogin()
            if (response.resultCode === ResultCodeEnum.Success) {
                const {id, email, login} = response.data
                dispatch(ProfileThunkCreators.getMyProfile(id))
                dispatch(AuthActionCreators.setUserData(id, email, login, true))
            }
        } catch (error) {
            console.log(error)
        }
    },
    login: (email: string, password: string, rememberMe: boolean, captcha?: string): AppRootThunk =>
        async dispatch => {
            try {
                const response = await AuthService.login(email, password, rememberMe, captcha)
                if (response.resultCode === ResultCodeEnum.Success) {
                    dispatch(AuthThunkCreators.loginization())
                    // @ts-ignore
                    dispatch(AuthActionCreators.getCaptchaUrlSuccess(null))
                } else {
                    if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                        dispatch(AuthThunkCreators.getCaptchaUrl())
                    }
                }
            } catch (error) {
                console.log(error)
            }

        },
    logout: (): AppRootThunk => async dispatch => {
        try {
            const response = await AuthService.logout()
            if (response.resultCode === ResultCodeEnum.Success) {
                dispatch(AuthActionCreators.setUserData(null, null, null, false))
            }
        } catch (error) {
            console.log(error)
        }
    },
    getCaptchaUrl: (): AppRootThunk => async dispatch => {
        try {
            const response = await securityApi.getCaptchaUrl()
            const captchaUrl = response.url
            // @ts-ignore
            dispatch(AuthActionCreators.getCaptchaUrlSuccess(captchaUrl))
        } catch (error) {
            console.log(error)
        }
    }
}