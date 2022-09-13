import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import {useState} from 'react';
import {ProfileThunkCreators} from "../../../../store/reducers/profile/action-creators";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import styles from './ProfileInfo.module.scss';
import {Button, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";

interface IProfileStatusProps {
    isOwner: boolean
}

export const ProfileStatus: FC<IProfileStatusProps> = ({isOwner}) => {
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
        <>
            {editMode &&
                <div className={styles.statusWrap}>
                    <Input onChange={onChangeStatus} autoFocus={true}
                           onBlur={changeStatus} value={newStatus}
                           onKeyDown={onKeyPressHandler} placeholder="small size"
                           prefix={<UserOutlined/>}/>
                    <Button style={{marginLeft: '10px'}} type={'primary'}>Сохранить</Button>
                </div>}

            {!editMode && <div>
                {status && isOwner && <div className={styles.statusWrap}>
                    <div className={styles.status} onDoubleClick={setEditModeHandler}>{status || ''}</div>
                    <Button type={'primary'} onClick={setEditModeHandler}>Поменять
                        статус
                    </Button>
                </div>}
                {!isOwner &&
                    <div className={styles.statusWrap}>
                        <div className={styles.status}>{status || ''}</div>
                    </div>
                }
                {!status && isOwner &&
                    <div className={styles.setStatus} onClick={setEditModeHandler}>установить статус</div>}
            </div>
            }
            <div className={styles.border}/>
        </>
    );
}