import {AppActions, AppEnumAction, IAppState} from "./types";

const initialState: IAppState = {
    initialized: false,
    error: null,
    status: 'idle'
}

export default function appReducer(state = initialState, action: AppActions): IAppState {
    switch (action.type) {
        case AppEnumAction.INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        case AppEnumAction.SET_APP_STATUS:
            return {
                ...state,
                status: action.status
            }

        case AppEnumAction.SET_APP_ERROR:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}
