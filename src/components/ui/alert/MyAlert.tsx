import {FC, useEffect} from "react";
import {Alert} from "antd";
import styles from './Alert.module.scss';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {AppActionCreators} from "../../../store/reducers/app/action-creators";

export const MyAlert: FC = () => {
    const dispatch = useTypedDispatch()
    const error = useTypedSelector(state => state.app.error)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleClose()
        }, 3000)

        return () => clearTimeout(timeoutId)
    }, [error])

    const handleClose = () => {
        dispatch(AppActionCreators.setAppError(null))
    };

    return <div className={styles.wrapper}>
        {error && <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={handleClose}
        />}
    </div>
}