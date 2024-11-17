import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../context/GlobalState';
import OrdenItem from './OrdenItem';
import './Ordenes.css';

const Ordenes = () => {
    const { orders, products, fetchUserOrders, user } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchUserOrders(user.user._id).finally(() => setLoading(false));
        }
    }, [user, fetchUserOrders]);

    if (loading) {
        return <p className="loading-message">Cargando órdenes...</p>;
    }

    if (!orders || !orders.length) {
        return <p className="empty-message">No tienes órdenes disponibles.</p>;
    }

    return (
        <div className="orders-container">
            <h1>Mis Órdenes</h1>
            {orders.map(order => (
                <OrdenItem key={order._id} order={order} products={products} />
            ))}
        </div>
    );
};

export default Ordenes;
