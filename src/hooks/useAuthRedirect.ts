import {useTypedSelector} from "./useTypedSelector";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const useAuthRedirect = () => {
    const navigate = useNavigate()
    const {isAuth} = useTypedSelector(state => state.auth)

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [])
}
