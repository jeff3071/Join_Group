import React, {useState} from 'react';
import {Navigate } from 'react-router-dom';
import { Form, Button } from '@douyinfe/semi-ui';
import { RegisterFormValues, user_register } from '../api/user';

const Register = () => {
    const [redirect, setRedirect] = useState(false);

    const submit = async (values: RegisterFormValues) => {
        user_register(values)
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
