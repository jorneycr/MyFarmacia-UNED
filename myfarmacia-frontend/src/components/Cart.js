// src/components/Cart.js
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import GlobalContext from '../context/GlobalState';

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

    return (
        <div>
            <h2>Tu carrito</h2>
            <button onClick={() => handleRemoveCart()}>Vaciar el carrito</button>
            {cartList.map(item => (
                <div key={item.productId}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <button onClick={() => handleRemoveFromCart(item.productId)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
