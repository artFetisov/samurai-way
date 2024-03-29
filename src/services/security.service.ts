import {instance} from "../api/api";

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(response => response.data)
    }
}