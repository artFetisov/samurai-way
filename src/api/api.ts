import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'aeb6653d-2f3a-42f9-a0aa-07211832ab73',
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
