import React, { useEffect, useContext } from 'react';
import GlobalContext from '../context/GlobalState';

const Ordenes = () => {
    const { orders, fetchUserOrders, user } = useContext(GlobalContext);

    useEffect(() => {
        if(user !== null){
            fetchUserOrders(user.user._id);
        }
    }, []);

    if (!orders.length) {
        return <p>No hay órdenes disponibles.</p>;
    }
    console.log(JSON.stringify(orders));
    
    return (
        <div>
            <h1>Mis Órdenes</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        <p>ID: {order._id}</p>
                        <p>Total: ${order.total}</p>
                        {/* Otros detalles de la orden */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ordenes;
