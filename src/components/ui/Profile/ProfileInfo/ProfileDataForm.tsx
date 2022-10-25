import React, {FC} from "react";
import {IContact, IPhotos, IProfile} from "../../../../types/types";
import {Button, Form, Input, Radio} from "antd";
import styles from "./ProfileInfo.module.scss";
import {ProfileThunkCreators} from "../../../../store/reducers/profile/action-creators";
import {useTypedDispatch} from "../../../../hooks/useTypedDispatch";
import {validURL, validUrlString} from "../../../../utils/regex";

interface IProfileDataForm {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: null | string
    contacts_github: string
    contacts_vk: string
    contacts_facebook: string
    contacts_instagram: string
    contacts_twitter: string
    contacts_website: string
    contacts_youtube: string
    contacts_mainLink: string
}

interface IProfileDataFormProps {
    userProfile: IProfile | null
    isOwner: boolean
    editModeHandler: (value: boolean) => void
}

export const ProfileDataForm: FC<IProfileDataFormProps> = ({userProfile, isOwner, editModeHandler}) => {
    const dispatch = useTypedDispatch()
    const [form] = Form.useForm();

    const onFinish = (data: IProfileDataForm) => {
        const contacts: IContact | { [key: string]: string | boolean } = {}
        const copyData = {...data}

        for (let key in copyData) {
            if (key.includes('contacts_')) {
                const subKey = key.slice(9)
                // @ts-ignore
                contacts[subKey] = copyData[key]
                // @ts-ignore
                delete copyData[key]
            }
        }

        const result: IProfile = {
            // @ts-ignore
            contacts,
            ...copyData
        }

        dispatch(ProfileThunkCreators.saveProfile(result))

        form.resetFields()
        editModeHandler(false)
    }

    const onFinishFailed = (error: any) => {
        console.log(error)
    }

    const contactsArr: { field: string, value: string }[] = []

    for (let key in userProfile?.contacts) {
        // @ts-ignore
        contactsArr.push({field: key, value: userProfile?.contacts[key]})
    }

    return <div>
        <div className={styles.infoBlock}>
            <section className={styles.contacts}>
                <h3>Контактная информация:</h3>
                <Form
                    form={form}
                    name="profile"
                    initialValues={{remember: true}}
                    onFinishFailed={onFinishFailed}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {contactsArr.map(c => <div className={styles.infoWrap} key={c.value + '-' + c.field}>
                            <div className={styles.field}>{c.field}</div>
                            <Form.Item
                                initialValue={c.value}
                                name={`contacts_${c.field}`}
                                rules={[{message: 'Введите корректный путь', pattern: validUrlString},
                                ]}
                            >
                                <Input size={'large'} placeholder={c.value} className={styles.value}/>
                            </Form.Item>
                        </div>
                    )}
                    <div className={styles.border}/>

                    <div>
                        <h3>Личная информация:</h3>
                        <div className={styles.infoWrap}>
                            <span className={styles.field}>Обо мне: </span>
                            <Form.Item
                                name={'aboutMe'}
                                initialValue={userProfile?.aboutMe}
                                // rules={[{type: 'email', message: 'Введите корректную почту'},
                                //     {required: true, message: 'Введите почту!'}
                                // ]}
                            >
                                <Input size={'large'} placeholder={'Обо мне'} className={styles.value}/>
                            </Form.Item>
                        </div>

                        <div className={styles.infoWrap}>
                            <span className={styles.field}>Имя: </span>
                            <Form.Item
                                name={'fullName'}
                                initialValue={userProfile?.fullName}
                                // rules={[{type: 'email', message: 'Введите корректную почту'},
                                //     {required: true, message: 'Введите почту!'}
                                // ]}
                            >
                                <Input size={'large'} className={styles.value}/>
                            </Form.Item>
                        </div>

                        <div className={styles.infoWrap}>
                            <span className={styles.field}>В поиске работы? </span>
                            <Form.Item name={'lookingForAJob'} initialValue={userProfile?.lookingForAJob}>
                                <Radio.Group>
                                    <Radio value={true}> Да </Radio>
                                    <Radio value={false}> Нет </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>

                        <div className={styles.infoWrap}>
                            <span className={styles.field}>Скиллы:</span>
                            <Form.Item
                                name={'lookingForAJobDescription'}
                                initialValue={userProfile?.lookingForAJobDescription}
                                // rules={[{type: 'email', message: 'Введите корректную почту'},
                                //     {required: true, message: 'Введите почту!'}
                                // ]}
                            >
                                <Input size={'large'} className={styles.value}/>
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item>
                        <Button size={'large'} type={'primary'} htmlType="submit"
                        >Сохранить</Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    </div>
}