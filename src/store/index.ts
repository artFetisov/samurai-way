import {createStore, combineReducers, applyMiddleware, compose, Action, AnyAction} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import reducers from './reducers'

const rootReducer = combineReducers(reducers)

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>


export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

