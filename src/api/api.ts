import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '7fb57bd7-f0fa-46ba-8af0-708cd1c5f0eb',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})
export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}
