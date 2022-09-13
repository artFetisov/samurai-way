import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import {useState} from 'react';
import {useDispatch} from "react-redux";
import {Profile} from "./Profile";
import {ProfileActionCreators, ProfileThunkCreators} from "../../../../store/reducers/profile/action-creators";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";

export const ProfileStatus: FC = () => {
    const status = useTypedSelector(state => state.profile.status)
    const dispatch = useTypedDispatch()
    const [editMode, setEditMode] = useState(false)
    const [newStatus, setNewStatus] = useState('')

    const setEditModeHandler = () => {
        setEditMode(true)
        setNewStatus(status)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeStatus()
        }
    }

    const changeStatus = () => {
        setEditMode(false)
        dispatch(ProfileThunkCreators.updateUserStatus(newStatus))
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }

    return (
        <div>
            <b>Status</b> :
            {!editMode &&
                <div>
                    <span onDoubleClick={setEditModeHandler}>{status || 'no status'}</span>
                </div>}
            {editMode
                && <div>
                    <span>
                        <input onChange={onChangeStatus} autoFocus={true}
                               onBlur={changeStatus} value={newStatus}
                               onKeyDown={onKeyPressHandler}
                        />
                    </span>
                </div>}
        </div>
    );
}