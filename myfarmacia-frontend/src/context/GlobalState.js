import React, { createContext, useReducer } from 'react';
import { registerUser, loginUser } from '../api/userApi';
import { createOrder, getUserOrders } from '../api/orderApi';
import { fetchProducts } from '../api/productApi';

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
        case 'ADD_TO_CART': {
            const existingItem = state.cart.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                // Incrementar cantidad si ya está en el carrito
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.productId === action.payload.productId
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }
            // Agregar nuevo producto al carrito
            return { ...state, cart: [...state.cart, action.payload] };
        }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item._id !== action.payload) };
        case 'REMOVE_CART':  // Nueva acción para vaciar el carrito
            return { ...state, cart: [] };  // Vaciar el carrito
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

    const addToCart = (product, quantity) => {
        const payload = { productId: product._id, quantity };
        dispatch({ type: 'ADD_TO_CART', payload });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const removeCart = () => {
        dispatch({ type: 'REMOVE_CART' });
    };

    const register = async (userData) => {
        try {
            const user = await registerUser(userData);
            dispatch({ type: 'SET_USER', payload: user });
            dispatch({ type: 'SET_ERROR', payload: null });
            return user;
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
            return user;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al iniciar sesión' });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    const fetchUserOrders = async (userId) => {
        try {
            const orders = await getUserOrders(userId);
            dispatch({ type: 'SET_ORDERS', payload: orders });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error al cargar las órdenes del usuario' });
        }
    };

    const createNewOrder = async (orderData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please login to create an order.');
            }
            const data = await createOrder(orderData, token);
            dispatch({ type: 'SET_ERROR', payload: null });
            return data;
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
                removeCart,
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
