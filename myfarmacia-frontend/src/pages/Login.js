// src/pages/Login.js

import React, { useState, useContext } from 'react';
import GlobalContext from '../context/GlobalState';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(GlobalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí se haría una solicitud a la API para autenticar al usuario
        // Una vez autenticado, llamamos a setUser para actualizar el estado global
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
