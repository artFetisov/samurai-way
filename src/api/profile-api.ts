import {instance, ResponseType} from './api'
import {IProfile, IPhotos} from '../types/types'

type SavePhotoResponseType = {
    photos: IPhotos
}

export const profileAPI = {
    getUserProfile: (userId: number | null) => {
        return instance.get<IProfile>(`profile/${userId}`).then((response) => response.data)
    },
    getStatus: (userId: number) => {
        return instance.get<string>(`profile/status/${userId}`).then((response) => response.data)
    },
    updateStatus: (status: string) => {
        return instance
            .put<ResponseType>(`profile/status`, {status: status})
            .then((response) => response.data)
    },
    savePhoto: (photo: any) => {
        const formData = new FormData()
        formData.append('image', photo)
        return instance
            .put<ResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            .then((response) => response.data)
    },
    saveProfile: (profile: IProfile) => {
        return instance.put(`profile`, profile).then((response) => response.data)
    },
}
