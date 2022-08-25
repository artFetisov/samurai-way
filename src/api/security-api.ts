import {instance} from "./api"

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityApi = {
    async getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(response => response.data)
    }
}