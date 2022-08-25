import {IUser} from '../types/types'
import {instance} from "../api/api";

type GetUsersResponseType = {
    error: null | string
    items: IUser[]
    totalCount: number
}

export const UsersService = {
    async getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean = null) {
        return instance
            .get<GetUsersResponseType>(
                `users?page=${currentPage}&count=${pageSize}&term=${term}` +
                (friend === null ? '' : `&friend=${friend}`)
            )
            .then((response) => response.data)
    },
    async followUser(id: number) {
        return instance.post<ResponseType>(`follow/${id}`).then((response) => response.data)
    },
    async unfollowUser(id: number) {
        return instance
            .delete(`follow/${id}`)
            .then((response) => response.data) as Promise<ResponseType>
    },
}
