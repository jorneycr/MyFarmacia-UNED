// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import GlobalContext from '../context/GlobalState';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(GlobalContext); // Accede al usuario desde el contexto

    // Si el usuario no está autenticado, redirige al login
    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
