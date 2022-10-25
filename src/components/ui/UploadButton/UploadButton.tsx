import {Input} from 'antd';
import React, {ChangeEvent, FC} from 'react';
import styles from './UploadButton.module.scss';

interface IProps {
    onChange: (image: File) => void
}

export const UploadButton: FC<IProps> = ({onChange}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files && e.currentTarget.files[0]

        if (!file) return

        onChange(file)
    }

    return <label className={styles.inputFile}>
        <Input type={'file'} onChange={onChangeHandler}>
        </Input>
        <span>Обновить фотографию</span>
    </label>
}