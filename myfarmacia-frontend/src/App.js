// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GlobalProvider } from './context/GlobalState';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Ordenes from './components/Ordenes';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductManager from './components/ProductManager';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE);

function App() {
    return (
        <GlobalProvider>
            <Router>
                <Navbar />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    style={{
                        position: 'absolute',
                        top: '62px',
                        right: '0px',
                    }}
                />
                <Elements stripe={stripePromise}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/ordenes" element={<ProtectedRoute><Ordenes /></ProtectedRoute>} />
                        <Route path="/product-manager" element={<ProtectedRoute><ProductManager /></ProtectedRoute>} />

                        {/* Rutas protegidas */}
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <Cart />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute>
                                    <Checkout />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Elements>
            </Router>
        </GlobalProvider>
    );
}

export default App;
