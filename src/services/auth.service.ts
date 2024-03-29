import {instance, ResponseType, ResultCodeEnum, ResultCodeForCaptcha} from "../api/api";

type AuthResponseDataType = {
    id: number
    login: string
    email: string
}

type LoginResponseType = {
    userId: number
}

export const AuthService = {
    async authLogin() {
        return instance
            .get<ResponseType<AuthResponseDataType>>(`auth/me`)
            .then((response) => response.data)
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance
            .post<ResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, {
                email,
                password,
                rememberMe,
                captcha,
            })
            .then((response) => response.data)
    },
    async logout() {
        return instance.delete(`auth/login`).then((response) => response.data)
    },
}
