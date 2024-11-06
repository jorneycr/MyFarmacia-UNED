// src/components/Cart.js

import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalState';

const Cart = () => {
    const { cart, removeFromCart } = useContext(GlobalContext);

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.map(item => (
                <div key={item._id}>
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
