import React from 'react';
import {Link} from "react-router-dom";
import { Nav as Navbar } from '@douyinfe/semi-ui';

const Nav = (props: { name: string, setName: (name: string) => void }) => {
    const logout = async () => {
        await fetch('http://localhost:8000/api/user/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        props.setName('');
    }

    let menu;
    console.log(props.name);

    if (props.name === '' || props.name === undefined) {
        menu = (
            <Navbar
                mode={'horizontal'}
                renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
                    if (props === undefined || typeof props.itemKey !== "string") {
                        return null;
                    }

                    const routerMap: Record<string, string> = {
                        Home: "/",
                        Login: "/login",
                        register: "/register",
                    };
                    
                    return (
                        <Link
                            style={{ textDecoration: "none" }}
                            to={routerMap[props.itemKey]}
                        >
                            {itemElement}
                        </Link>
                    );
                }}
                items={[
                    { itemKey: "Home", text: "Home" },
                    { itemKey: "Login", text: "Login" },
                    { itemKey: "register", text: "Register" },
                ]}
            ></Navbar>
        )
    } else {
        menu = (
            <Navbar
                mode={'horizontal'}
                renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
                    if (props === undefined || typeof props.itemKey !== "string") {
                        return null;
                    }

                    const routerMap: Record<string, string> = {
                        Home: "/",
                        Logout: "/",
                        Create_group: "/Create_group",
                    };
                    
                    return (
                        <Link
                            style={{ textDecoration: "none" }}
                            to={routerMap[props.itemKey]}
                        >
                            {itemElement}
                        </Link>
                    );
                }}
                items={[
                    { itemKey: "Home", text: "Home" },
                    { itemKey: "Create_group", text: "Create_group"},
                    { itemKey: "Logout", text: "Logout", onClick: logout },
                ]}
            ></Navbar>
        )
    }

    return (
        <div>
            {menu}
        </div>
    );
};

export default Nav;
