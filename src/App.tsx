import React, {useEffect} from 'react';
import {MyLayout} from "./components/layout/Layout";
import {Router} from "./router/Router";
import {useDispatch} from "react-redux";
import {AppAsyncActionCreators} from "./store/reducers/app/action-creators";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";
import {ProfileAsyncActionCreators} from "./store/reducers/profile/action-creators";

export const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {initialized} = useTypedSelector(state => state.app)
    const {id} = useTypedSelector(state => state.auth)

    useEffect(() => {
        // @ts-ignore
        dispatch(AppAsyncActionCreators.initializeApp())

        // if (!initialized) {
        //     navigate('/login')
        // }
    }, [])

    useEffect(() => {
        if (id) {
            // @ts-ignore
            dispatch(ProfileAsyncActionCreators.getMyProfile(id))
        }
    }, [id])


    return <MyLayout>
        <Router/>
    </MyLayout>
}


