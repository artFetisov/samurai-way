import {FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {ProfileThunkCreators} from "../../../store/reducers/profile/action-creators";
import {Profile} from "../../ui/Profile/Profile";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAuthRedirect} from "../../../hooks/useAuthRedirect";

export const ProfilePage: FC = () => {
    // useAuthRedirect()
    const dispatch = useDispatch()
    const {id} = useParams()
    const {userProfile, isLoading} = useTypedSelector(state => state.profile)
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // @ts-ignore
            dispatch(ProfileThunkCreators.getUserProfile(id))
        }
    }, [id])

    if (!isLoading) return <div>...загрузка</div>
    return <Profile userProfile={userProfile}/>
}