import {AddMessageAction, DialogsEnumAction} from "./types";

export const DialogsActionCreators = {
    addMessage: (text: string): AddMessageAction => ({type: DialogsEnumAction.ADD_MESSAGE, text})
}
