import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '141ae543-407d-4592-b0d4-31dd70ac99d9',
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
