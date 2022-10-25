import {ProfilePage} from "../components/pages/profile-page/ProfilePage";
import React, {FC, Suspense} from "react";
import {DialogsPage} from "../components/pages/dialogs-page/DialogsPage";
import {LoginPage} from "../components/pages/login-page/LoginPage";

const UsersPageLazy = React.lazy(() => import('../components/pages/users-page/UsersPage'));


export interface IRoute {
    path: string
    element: FC
    lazy: boolean
}

export const publicRoutes: IRoute[] = [
    {path: '/login', element: LoginPage, lazy: false},
]

export const privateRoutes = [
    {path: '/dialogs', element: DialogsPage, lazy: false},
    {path: '/profile/:id', element: ProfilePage, lazy: false},
    {path: '/users', element: UsersPageLazy, lazy: true},
]