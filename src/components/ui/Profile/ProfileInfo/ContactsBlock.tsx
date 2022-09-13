import React, {FC} from "react";
import {IProfile} from "../../../../types/types";
import styles from './ProfileInfo.module.scss';
import {Contact} from "./Contact";

interface IContactsBlockProps {
    userProfile: IProfile | null
}

export const ContactsBlock: FC<IContactsBlockProps> = ({userProfile}) => {
    const contactsArr: { field: string, value: string }[] = []

    for (let key in userProfile?.contacts) {
        // @ts-ignore
        contactsArr.push({field: key, value: userProfile?.contacts[key]})
    }

    return <div className={styles.contacts}>
        <h3>Контактная информация:</h3>
        {contactsArr.map(c => <Contact field={c.field} value={c.value}/>)}
        <div className={styles.border}/>
    </div>
}