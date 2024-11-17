// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GlobalContext from '../context/GlobalState';
import './FormStyles.css'; // Importa el CSS


const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      if(data === undefined){
        toast.error("Error al iniciar sesión");
      }else{
        toast.success("Inicio de sesión exitoso");
        navigate('/products');
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="form-container">
    <form className="form" onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Iniciar Sesión</button>
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </form>
  </div>
  );
};

export default Login;
