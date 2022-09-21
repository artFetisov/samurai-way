import React, {useEffect} from 'react';
import {MyLayout} from "./components/layout/Layout";
import {Router} from "./router/Router";
import {AppThunkCreators} from "./store/reducers/app/action-creators";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useTypedDispatch} from "./hooks/useTypedDispatch";
import {Spinner} from "./components/ui/spinner/Spinner";
import styles from '../src/components/ui/spinner/Spinner.module.scss';
import {MyAlert} from "./components/ui/alert/MyAlert";

export const App = () => {
    const dispatch = useTypedDispatch()
    const {isAuth} = useTypedSelector(state => state.auth)
    const {initialized, status} = useTypedSelector(state => state.app)

    useEffect(() => {
        dispatch(AppThunkCreators.initializeApp())
    }, [])

    if (status === 'loading') {
        return <div className={styles.wrapCenter}>
            <Spinner/>
        </div>
    }

    return <>
        <MyAlert/>
        {initialized && <MyLayout isAuth={isAuth}>
            <Router/>
        </MyLayout>}
    </>
}


