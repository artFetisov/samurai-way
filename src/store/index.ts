import {createStore, combineReducers, applyMiddleware, compose, Action, AnyAction} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import reducers from './reducers'
import {AppActions} from "./reducers/app/types";
import {AuthActions} from "./reducers/auth/types";
import {DialogsActions} from "./reducers/dialogs/types";
import {ProfileActions} from "./reducers/profile/types";
import {UsersActions} from "./reducers/users/types";

const rootReducer = combineReducers(reducers)

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppRootActions>
export type AppRootActions = AppActions | AuthActions | DialogsActions | ProfileActions | UsersActions
export type AppRootThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppRootActions>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
