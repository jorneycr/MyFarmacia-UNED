import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import GlobalContext from '../context/GlobalState';
import '../styles/Navbar.css';

const Navbar = () => {
    const { cart, user, logout } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Se ha cerrado la sesión");
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">Farmacia UNED</Link>
            </div>
            <div className="navbar-links">
                <Link to="/products" className="navbar-link">Productos</Link>
                {user && user.user.role === "admin" && (<Link to="/product-manager" className="navbar-link">Gestionar Productos</Link>)}
                {user ? (
                    <>
                        <Link to="/ordenes" className="navbar-link">Ordenes</Link>
                        <Link to="/cart" className="navbar-link">Carrito</Link>
                        {cart.length > 0 && (<Link to="/checkout" className="navbar-link">Checkout</Link>)}                        
                        <button onClick={handleLogout} className="navbar-button">
                        Cerrar sesión con {user.user.name} 
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
                        <Link to="/register" className="navbar-link">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
