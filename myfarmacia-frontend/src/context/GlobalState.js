import React, { createContext, useReducer } from 'react';
import { registerUser, loginUser } from '../api/userApi';
import { createOrder, getUserOrders } from '../api/orderApi';
import { fetchProducts, fetchProductById } from '../api/productApi';

const initialState = {
    products: [],
    cart: [],
    user: null,
    orders: [],
    error: null,
};

const GlobalContext = createContext(initialState);

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, action.payload] };
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item._id !== action.payload) };
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_ORDERS':
            return { ...state, orders: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null, cart: [], orders: [] }; // Reset the state when logging out
        default:
            return state;
    }
};

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    // Funciones de la lógica
    const fetchProductsData = async () => {
        try {
            const res = await fetchProducts();
            dispatch({ type: 'SET_PRODUCTS', payload: res });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al cargar los productos' });
        }
    };

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const register = async (userData) => {
        try {
            const user = await registerUser(userData);
            dispatch({ type: 'SET_USER', payload: user });
            dispatch({ type: 'SET_ERROR', payload: null });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error en el registro' });
        }
    };

    const login = async (credentials) => {
        try {
            const user = await loginUser(credentials);
            localStorage.setItem('token', user.token);
            dispatch({ type: 'SET_USER', payload: user });
            dispatch({ type: 'SET_ERROR', payload: null });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al iniciar sesión' });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    const fetchUserOrders = async () => {
        try {
            const orders = await getUserOrders();
            dispatch({ type: 'SET_ORDERS', payload: orders });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al cargar las órdenes del usuario' });
        }
    };

    const createNewOrder = async (orderData) => {
        try {
            const newOrder = await createOrder(orderData);
            fetchUserOrders(); // Refresca la lista de órdenes
            dispatch({ type: 'SET_ERROR', payload: null });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al crear la orden' });
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                products: state.products,
                cart: state.cart,
                user: state.user,
                orders: state.orders,
                error: state.error,
                fetchProductsData,
                addToCart,
                removeFromCart,
                register,
                login,
                logout,
                fetchUserOrders,
                createNewOrder,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export {
    GlobalProvider
}

export default GlobalContext;
