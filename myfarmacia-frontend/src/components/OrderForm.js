import React, { useState } from 'react';
import { createOrder } from '../api/orderApi';

const OrderForm = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please login to place an order');
            return;
        }

        try {
            const orderData = { products, total };
            await createOrder(orderData, token);
            alert('Order created successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add form fields for selecting products and total */}
            <button type="submit">Place Order</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default OrderForm;
