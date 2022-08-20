import {DialogsActions, DialogsEnumAction, IDialogsState} from "./types";

const initialState: IDialogsState = {
    dialogs: [
        {id: 0, name: "Artemonnnnnnn"},
        {id: 1, name: "Irina"},
        {id: 2, name: "Alex"},
        {id: 3, name: "Roma"},
        {id: 4, name: "Nika"},
        {id: 5, name: "Dima"}
    ],
    messages: [
        {id: 0, message: 'Hi'},
        {id: 1, message: 'Bye'},
        {id: 2, message: 'Ass'},
        {id: 3, message: 'You'},
        {id: 4, message: 'Im fine'},
        {id: 5, message: 'Ok'}
    ]
}


export default function dialogsReducer(state = initialState, action: DialogsActions): IDialogsState {
    switch (action.type) {
        case DialogsEnumAction.ADD_MESSAGE:
            const newMessage = {
                id: 100,
                message: action.text
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }

        default:
            return state
    }
}


