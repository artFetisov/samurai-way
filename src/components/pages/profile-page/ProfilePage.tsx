import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {ProfileThunkCreators} from "../../../store/reducers/profile/action-creators";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {Profile} from "../../ui/Profile/ProfileInfo/Profile";
import {Row} from "antd";
import styles from '../../ui/Profile/Profile.module.scss';
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";

export const ProfilePage: FC = () => {
    let isOwner = false
    const dispatch = useTypedDispatch()
    const {id} = useParams()
    const {userProfile, myProfile, isLoading} = useTypedSelector(state => state.profile)

    if (myProfile) {
        isOwner = id === String(myProfile?.userId)
    }

    useEffect(() => {
        if (id) {
            dispatch(ProfileThunkCreators.getUserProfile(Number(id)))
        }
    }, [id])

    if (!isLoading) return <div>...загрузка</div>
    return <Row>
        <div className={styles.container}>
            <Profile userProfile={userProfile} isOwner={isOwner}/>
        </div>
    </Row>
}