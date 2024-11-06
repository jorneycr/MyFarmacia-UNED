// src/context/GlobalState.js

import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
    products: [],
    cart: [],
    user: null,
};

const GlobalContext = createContext(initialState);

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, action.payload] };
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    const fetchProducts = async () => {
        const res = await axios.get('/api/products');
        dispatch({ type: 'SET_PRODUCTS', payload: res.data });
    };

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const setUser = (user) => {
        dispatch({ type: 'SET_USER', payload: user });
    };

    return (
        <GlobalContext.Provider
            value={{
                products: state.products,
                cart: state.cart,
                user: state.user,
                fetchProducts,
                addToCart,
                removeFromCart,
                setUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
