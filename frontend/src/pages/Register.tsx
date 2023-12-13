import React, {useState} from 'react';
import {Navigate } from 'react-router-dom';
import { Form, Button } from '@douyinfe/semi-ui';

const Register = () => {
    const [redirect, setRedirect] = useState(false);

    interface LoginFormValues {
        name: string;
        email: string;
        password: string;
    }

    const submit = async (values: LoginFormValues) => {
        const res = await fetch('http://127.0.0.1:8000/api/user/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/login"/>;
    }

    return (
        <Form onSubmit={values => submit(values)} style={{ width: 400 }}>
            {({ formState, values, formApi }) => (
                <>
                    <Form.Input field='name' label='Name' style={{ width: '100%' }} placeholder='Enter your name'></Form.Input>
                    <Form.Input field='email' label='Email_address' style={{ width: '100%' }} placeholder='Enter your Email address'></Form.Input>
                    <Form.Input field='password' label='Password' style={{ width: '100%' }} placeholder='Enter your password' mode="password"></Form.Input>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button htmlType='submit' type="tertiary">Register</Button>
                    </div>
                </>
            )}
        </Form>
    );
};

export default Register;
