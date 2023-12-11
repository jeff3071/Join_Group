import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Group from "./pages/Group";

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://127.0.0.1:8000/api/user/user', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                setName(content.name);
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
