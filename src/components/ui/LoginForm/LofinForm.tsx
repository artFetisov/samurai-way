import {FC} from "react";
import {ILoginInput} from "../../../types/types";
import {Button, Checkbox, Form, Input, Image} from "antd";
import styles from './Login.module.scss';
import {LockOutlined} from '@ant-design/icons';
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {AuthThunkCreators} from "../../../store/reducers/auth/action-creators";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export const LoginForm: FC = () => {
    const captcha = useTypedSelector(state => state.auth.captchaUrl)
    const dispatch = useTypedDispatch()
    const [form] = Form.useForm();

    const onFinish = (data: ILoginInput) => {
        console.log(data)
        const {email, password, rememberMe, captchaUrl} = data
        dispatch(AuthThunkCreators.login(email, password, rememberMe, captchaUrl))
        form.resetFields()
    }

    const onFinishFailed = (error: any) => {
        console.log(error)
    }

    return (
        <section className={styles.container}>
            <h2 style={{textAlign: 'center'}}>Вход в социальную сеть</h2>
            <Form
                form={form}
                name="login"
                initialValues={{remember: true}}
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item
                    name="email"
                    rules={[{type: 'email', message: 'Введите корректную почту'},
                        {required: true, message: 'Введите почту!'}
                    ]}
                >
                    <Input size={'large'} placeholder={'Почта'}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {min: 3, message: 'Введите не менее 3 символов'},
                        {required: true, message: 'Введите пароль!'}
                    ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon"/>} size={'large'}
                           placeholder={'Пароль'}/>
                </Form.Item>

                <Form.Item name="rememberMe" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                {captcha &&
                    <>
                        <Image src={captcha}/>
                        <Form.Item
                            name="captchaUrl"
                            rules={[
                                {required: true, message: 'Введите корректные символы!'}
                            ]}
                        >
                            <Input size={'large'} placeholder={'капча'}/>
                        </Form.Item></>
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit" size={'large'} style={{width: '100%'}}>
                        Войти
                    </Button>
                </Form.Item>

            </Form>
        </section>
    );
};
