export interface IPost {
    id: number
    message: string
    likesCount: number
}

export interface IContact {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export interface IFilter {
    term: string
    friend: null | boolean
}

export interface IPhotos {
    small: string | null
    large: string | null
}

export interface IProfile {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: IContact
    photos: IPhotos | null
    aboutMe: null | string
}

export interface IUser {
    id: number
    name: string
    status: string
    photos: IPhotos
    followed: boolean
    uniqueUrlName: null
}

export interface IDialog {
    id: number
    name: string
}

export interface IMessage {
    id: number
    message: string
}
