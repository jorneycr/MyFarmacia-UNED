// src/components/Navbar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalState';

const Navbar = () => {
    const { user } = useContext(GlobalContext);

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            {user ? <span>Welcome, {user.name}</span> : <Link to="/login">Login</Link>}
            <Link to="/register">Register</Link>
        </nav>
    );
};

export default Navbar;
