import {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {ProfileAsyncActionCreators} from "../../../store/reducers/profile/action-creators";
import Profile from "../../ui/Profile/Profile";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export const ProfilePage: FC = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {userProfile} = useTypedSelector(state => state.profile)
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // @ts-ignore
            dispatch(ProfileAsyncActionCreators.getUserProfile(id))
        } else if (!id) {
            navigate('/login')
        }

    }, [id])

    return <Profile userProfile={userProfile}/>
}