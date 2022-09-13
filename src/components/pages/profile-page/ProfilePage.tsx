import React, {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {ProfileThunkCreators} from "../../../store/reducers/profile/action-creators";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAuthRedirect} from "../../../hooks/useAuthRedirect";
import {Profile} from "../../ui/Profile/ProfileInfo/Profile";
import {Col, Row} from "antd";
import styles from "../../ui/users/Users.module.scss";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";

export const ProfilePage: FC = () => {
    // useAuthRedirect()
    let isOwner = null
    const dispatch = useTypedDispatch()
    const {id} = useParams()
    const {userProfile, myProfile, isLoading} = useTypedSelector(state => state.profile)

    if (userProfile) {
        isOwner = id === String(userProfile?.userId)
    }

    useEffect(() => {
        if (id) {
            dispatch(ProfileThunkCreators.getUserProfile(Number(id)))
        }
    }, [id])

    if (!isLoading) return <div>...загрузка</div>
    return <Row>
        <Col className={styles.container}>
            <Profile userProfile={userProfile} isOwner={isOwner}/>
        </Col>
    </Row>
}