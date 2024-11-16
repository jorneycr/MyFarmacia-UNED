// src/components/Cart.js
import React, { useContext } from 'react';
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
            };
        }

        return null;  // En caso de que no se encuentre el producto
    }).filter(item => item !== null);

    return (
        <div>
            <h2>Tu carrito</h2>
            <button onClick={() => removeCart()}>Vaciar el carrito</button>
            {cartList.map(item => (
                <div key={item.productId}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
