import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import { Form, Button } from '@douyinfe/semi-ui';

const Login = (props: { setName: (name: string) => void }) => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    interface LoginFormValues {
        email: string;
        password: string;
    }

    const login_submit = async (values: LoginFormValues) => {
        const response = await fetch('http://127.0.0.1:8000/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setName(content.name);
    }

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <Form onSubmit={values => login_submit(values)} style={{ width: 400 }}>
            {({ formState, values, formApi }) => (
                <>
                    <Form.Input field='email' label='Email_address' style={{ width: '100%' }} placeholder='Enter your Email address'></Form.Input>
                    <Form.Input field='password' label='Password' style={{ width: '100%' }} placeholder='Enter your password'></Form.Input>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button htmlType='submit' type="tertiary">Log in</Button>
                    </div>
                </>
            )}
        </Form>
        // <form onSubmit={login_submit}>
        //     <h1>Please sign in</h1>
        //     <input type="email" className="form-control" placeholder="Email address" required
        //            onChange={e => setEmail(e.target.value)}
        //     />

        //     <input type="password" className="form-control" placeholder="Password" required
        //            onChange={e => setPassword(e.target.value)}
        //     />

        //     <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        // </form>
    );
};

export default Login;
