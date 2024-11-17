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
        <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </form>
    </div>
    );
};

export default Register;
