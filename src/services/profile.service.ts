import {IProfile, IPhotos} from '../types/types'
import {instance, ResponseType} from "../api/api";

type SavePhotoResponseType = {
    photos: IPhotos
}

export const ProfileService = {
    async getUserProfile(userId: number | null) {
        return instance.get<IProfile>(`profile/${userId}`).then((response) => response.data)
    }
    ,
    async getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then((response) => response.data)
    },
    async updateStatus(status: string) {
        return instance
            .put<ResponseType>(`profile/status`, {status: status})
            .then((response) => response.data)
    },
    async savePhoto(photo: any) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance
            .put<ResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            .then((response) => response.data)
    },
    async saveProfile(profile: IProfile) {
        return instance.put(`profile`, profile).then((response) => response.data)
    },
}
