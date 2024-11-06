// src/components/Checkout.js

import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalState';

const Checkout = () => {
    const { cart } = useContext(GlobalContext);

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div>
            <h2>Checkout</h2>
            <p>Total: ${totalPrice}</p>
            <button>Proceed to Payment</button>
        </div>
    );
};

export default Checkout;
