import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import { Form, Button } from '@douyinfe/semi-ui';
import { user_login, LoginFormValues } from '../api/user';

const Login = (props: { setName: (name: string) => void }) => {
    const [redirect, setRedirect] = useState(false);

    const login_submit = async (values: LoginFormValues) => {
        const content = await user_login(values);

        localStorage.setItem('accessToken', content.access_token);
        localStorage.setItem('refreshToken', content.refresh_token);
        
        props.setName(values.email);
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <Form onSubmit={values => login_submit(values)} style={{ width: 400 }}>
            {({ formState, values, formApi }) => (
                <>
                    <Form.Input field='email' label='Email_address' style={{ width: '100%' }} placeholder='Enter your Email address'></Form.Input>
                    <Form.Input field='password' label='Password' style={{ width: '100%' }} placeholder='Enter your password' mode="password"></Form.Input>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button htmlType='submit' type="tertiary">Log in</Button>
                    </div>
                </>
            )}
        </Form>
    );
};

export default Login;
