import {FC} from "react";
import styles from './ProfileInfo.module.scss';

interface IContactProps {
    field: string
    value: string
}

export const Contact: FC<IContactProps> = ({field, value}) => {
    return <div className={styles.infoWrap}>
        <span className={styles.field}>{field}:</span>
        <span className={styles.value}>{value || 'Информация отсутствует'}</span>
    </div>
}