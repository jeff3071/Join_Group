import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Group from "./pages/Group";
import {user_get} from "./api/user";

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                if(name.length === 0 || name === undefined) {
                    const accessToken = localStorage.getItem('accessToken');

                    if(accessToken !== null) {
                        const content = await user_get();

                        if (content.email !== undefined) {
                            setName(content.email);
                        } else {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                        }
                    }
                }
            }
        )();
    });


    return (
        <div className="App">
            <Router>
                <Nav name={name} setName={setName}/>

                <main className="form-signin">
                    <Routes>
                        <Route path="/" element={<Home name={name}/>}/>
                        <Route path="/login" element={<Login setName={setName}/>}/>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/create_group" element={<Group name={name}/>}/>
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;
