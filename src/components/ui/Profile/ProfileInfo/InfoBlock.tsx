import {FC} from "react";
import {IProfile} from "../../../../types/types";
import styles from './ProfileInfo.module.scss';

interface IInfoBlockProps {
    userProfile: IProfile | null
}

export const InfoBlock: FC<IInfoBlockProps> = ({userProfile}) => {

    return <div>
        <h3>Личная информация:</h3>
        <div className={styles.infoWrap}>
            <span className={styles.field}>Обо мне: </span>
            <span className={styles.value}>{userProfile?.aboutMe || 'Информация отсутствует'}</span>
        </div>
        <div className={styles.infoWrap}>
            <span className={styles.field}>В поиске работы? </span>
            <span className={styles.value}>{userProfile?.lookingForAJob ? 'Да' : 'Нет'}</span>
        </div>
        <div className={styles.infoWrap}>
            <span className={styles.field}>Скиллы:</span>
            <span className={styles.value}>{userProfile?.lookingForAJobDescription || 'Информация отсутствует'}</span>
        </div>
    </div>
}