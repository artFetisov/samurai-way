import {UsersPage} from "../components/pages/users-page/UsersPage";
import {ProfilePage} from "../components/pages/profile-page/ProfilePage";
import {FC} from "react";
import {DialogsPage} from "../components/pages/dialogs-page/DialogsPage";

export interface IRoute {
    path: string
    element: FC
}

export const routes: IRoute[] = [
    {path: '/', element: ProfilePage},
    {path: '/users', element: UsersPage},
    {path: '/dialogs', element: DialogsPage}
]