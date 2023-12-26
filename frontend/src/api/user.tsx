export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
}

export const user_register = async (values: RegisterFormValues) => {
    const res = await fetch('http://127.0.0.1:8000/api/user/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password
        })
    });
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export const user_login = async (values: LoginFormValues) => {
    const response = await fetch('http://127.0.0.1:8000/api/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            email: values.email,
            password: values.password
        })
    });
    return response.json();
}

export const user_logout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    await fetch('http://localhost:8000/api/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
    });
}

export const user_get = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('http://127.0.0.1:8000/api/user/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
    });
    return response.json();
}