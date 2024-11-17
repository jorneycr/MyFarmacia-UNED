// src/pages/Register.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GlobalContext from '../context/GlobalState';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useContext(GlobalContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        try {
            const data = await register({ name, email, password });
            if(data === undefined){
                toast.error("Error al registrar. Por favor, inténtelo nuevamente.");
              }else{
                toast.success("Registro exitoso. Por favor, inicia sesión.");
                navigate('/login');
              }
            
        } catch (err) {
            console.error("Error al registrar. Por favor, inténtelo nuevamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
