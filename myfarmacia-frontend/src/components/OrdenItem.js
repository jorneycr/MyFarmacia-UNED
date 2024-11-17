import React from 'react';
import './OrdenItem.css';

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
            <div className="order-header">
                <h3>Orden ID: {order._id}</h3>
                <p className="total">Total: ${order.total.toFixed(2)}</p>
            </div>
            {matchedProducts.length > 0 && (
                <div className="order-products">
                    <h4>{matchedProducts.length >= 2 ? 'Productos:' : 'Producto:'}</h4>
                    <ul style={{ textDecoration: 'none', listStyleType: 'none' }}>
                        {matchedProducts.map(product => (
                            <li key={product._id} className="order-product">
                                <div className="product-info">
                                    <h5>{product.details.name}</h5>
                                    <p><strong>Precio:</strong> ${product.details.price}</p>
                                    <p><strong>Cantidad:</strong> {product.quantity}</p>
                                    <p><strong>Descripción:</strong> {product.details.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <hr />
        </div>
    );
};

export default OrdenItem;
