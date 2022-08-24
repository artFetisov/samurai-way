import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {AppStateType} from "../store";

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector
