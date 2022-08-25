import React, {useEffect} from 'react';
import {MyLayout} from "./components/layout/Layout";
import {Router} from "./router/Router";
import {useDispatch} from "react-redux";
import {AppAsyncActionCreators} from "./store/reducers/app/action-creators";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {ProfileThunkCreators} from "./store/reducers/profile/action-creators";

export const App = () => {
    const dispatch = useDispatch()
    const {id, isAuth} = useTypedSelector(state => state.auth)

    useEffect(() => {
        // @ts-ignore
        dispatch(AppAsyncActionCreators.initializeApp())
    }, [])

    useEffect(() => {
        if (id) {
            // @ts-ignore
            dispatch(ProfileThunkCreators.getMyProfile(id))
        }
    }, [id])


    return <MyLayout isAuth={isAuth}>
        <Router/>
    </MyLayout>
}


