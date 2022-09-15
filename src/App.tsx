import React, {useEffect} from 'react';
import {MyLayout} from "./components/layout/Layout";
import {Router} from "./router/Router";
import {AppAsyncActionCreators} from "./store/reducers/app/action-creators";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useTypedDispatch} from "./hooks/useTypedDispatch";

export const App = () => {
    const dispatch = useTypedDispatch()
    const {isAuth} = useTypedSelector(state => state.auth)

    useEffect(() => {
        dispatch(AppAsyncActionCreators.initializeApp())
    }, [])

    return <MyLayout isAuth={isAuth}>
        <Router/>
    </MyLayout>
}


