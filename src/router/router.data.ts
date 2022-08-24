import {UsersPage} from "../components/pages/users-page/UsersPage";
import {ProfilePage} from "../components/pages/profile-page/ProfilePage";
import {FC} from "react";
import {DialogsPage} from "../components/pages/dialogs-page/DialogsPage";
import {LoginPage} from "../components/pages/login-page/LoginPage";
import {Error404Page} from "../components/pages/error404-page/Error404Page";

export interface IRoute {
    path: string
    element: FC
}

export const routes: IRoute[] = [
    {path: '/profile/:id', element: ProfilePage},
    {path: '/users', element: UsersPage},
    {path: '/dialogs', element: DialogsPage},
    {path: '/login', element: LoginPage},
    {path: '*', element: Error404Page}
]