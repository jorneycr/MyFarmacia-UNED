// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalState';

const Navbar = () => {
    const { user, logout } = useContext(GlobalContext);

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            {user ? (
                <>
                    <Link to="/ordenes">Ordenes</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/checkout">Checkout</Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
