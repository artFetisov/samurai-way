import {UsersPage} from "../components/pages/users-page/UsersPage";
import {ProfilePage} from "../components/pages/profile-page/ProfilePage";
import {FC} from "react";
import {DialogsPage} from "../components/pages/dialogs-page/DialogsPage";
import {LoginPage} from "../components/pages/login-page/LoginPage";

export interface IRoute {
    path: string
    element: FC
}

export const publicRoutes: IRoute[] = [
    {path: '/login', element: LoginPage},
]

export const privateRoutes = [
    {path: '/dialogs', element: DialogsPage},
    {path: '/profile/:id', element: ProfilePage},
    {path: '/users', element: UsersPage},
]