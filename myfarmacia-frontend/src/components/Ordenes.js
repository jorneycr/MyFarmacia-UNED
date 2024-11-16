import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../context/GlobalState';

const OrdenItem = ({ order, products }) => {
    const findProductById = (id) => {
        return products.find(product => product._id === id);
    };

    const matchedProducts = order.products
        .map(product => ({
            ...product,
            details: findProductById(product.productId),
        }))
        .filter(product => product.details); // Filtrar solo los que tienen detalles

    return (
        <div className="order-item">
            <h3>Orden ID: {order._id}</h3>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            {matchedProducts.length > 0 && (
                <>
                    <h4>Productos:</h4>
                    <ul>
                        {matchedProducts.map(product => (
                            <li key={product._id}>
                                <p><strong>Nombre:</strong> {product.details.name}</p>
                                <p><strong>Precio:</strong> ${product.details.price}</p>
                                <p><strong>Descripción:</strong> {product.details.description}</p>
                                <p><strong>Categoría:</strong> {product.details.category}</p>
                                <p><strong>Cantidad:</strong> {product.quantity}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <hr />
        </div>
    );
};


const Ordenes = () => {
    const { orders, products, fetchUserOrders, user } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchUserOrders(user.user._id).finally(() => setLoading(false));
        }
    }, []);

    if (loading) {
        return <p>Cargando órdenes...</p>;
    }

    if (!orders || !orders.length) {
        return <p>No hay órdenes disponibles.</p>;
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

