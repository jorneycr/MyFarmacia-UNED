// src/components/Cart.js
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import GlobalContext from '../context/GlobalState';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, products, removeFromCart, removeCart } = useContext(GlobalContext);

    const cartList = cart.map((item) => {
        // Encuentra el producto correspondiente en la lista de productos usando el productId
        const product = products.find(p => p._id === item.productId);

        if (product) {
            // Retorna un nuevo objeto con todos los detalles del producto y la cantidad
            return {
                productId: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                quantity: item.quantity
            };
        }
        console.log(product)
        return null;
    }).filter(item => item !== null);

    const handleRemoveCart = () => {
        removeCart();
        toast.success("Productos elimanados del carrito");
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        toast.success("Producto elimanado de mi carrito");
    };

    // Calcular el total
    const calculateTotal = () => {
        return cartList.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2>Tu carrito</h2>
            {cartList.length > 0 ? (
                <>

                    <div className="cart-items">
                        {cartList.map(item => (
                            <div key={item.productId} className="cart-item">
                                <div className="cart-item-info">
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p className="price">Precio: ${item.price}</p>
                                        <p>Cantidad: {item.quantity}</p>
                                    </div>
                                </div>
                                <button className="remove-btn" onClick={() => handleRemoveFromCart(item.productId)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <h3>Total: ${calculateTotal()}</h3>
                        <div className="cart-total-btn">
                            <button className="empty-cart-btn" onClick={handleRemoveCart}>Vaciar el carrito</button>
                            <button className="checkout-btn"><Link style={{ textDecoration: 'none', color: 'white' }} to="/checkout">Proceder al pago</Link></button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="empty-cart-msg">Tu carrito está vacío. <Link to="/products" className="empty-cart-msg add-products">Agregar Productos</Link></p>
            )}
        </div>
    );
};

export default Cart;
