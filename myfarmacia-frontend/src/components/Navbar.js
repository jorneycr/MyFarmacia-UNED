// src/components/Navbar.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import GlobalContext from '../context/GlobalState';

const Navbar = () => {
    const { user, logout } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Se ha cerrado la sesión");
        navigate('/');
    };
    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/products">Productos</Link>
            {user ? (
                <>
                    <Link to="/ordenes">Ordenes</Link>
                    <Link to="/cart">Carrito</Link>
                    <Link to="/checkout">Checkout</Link>

                    <button onClick={handleLogout}>{user.user.name} Cerrar Sesión</button>
                </>
            ) : (
                <>
                    <Link to="/login">Iniciar Sesión</Link>
                    <Link to="/register">Registrarse</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
