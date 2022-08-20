import {IDialog, IMessage} from "../../../types/types";

export interface IDialogsState {
    dialogs: IDialog[],
    messages: IMessage[]
}

export enum DialogsEnumAction {
    ADD_MESSAGE = 'ADD-MESSAGE'
}

export interface AddMessageAction {
    type: DialogsEnumAction.ADD_MESSAGE,
    text: string
}

export type DialogsActions = AddMessageAction