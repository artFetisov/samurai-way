import {AppActions, AppEnumAction, IAppState} from "./types";

const initialState: IAppState = {
    initialized: false,
}

export default function appReducer(state = initialState, action: AppActions): IAppState {
    switch (action.type) {
        case AppEnumAction.INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state
    }
}
