// src/components/Checkout.js
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/GlobalState';

const Checkout = () => {
    const { user, cart, removeCart, products, createNewOrder } = useContext(GlobalContext);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const totalPrice = cart.reduce((acc, item) => {
        const product = products.find(p => p._id === item.productId);
        if (product) {
            return acc + product.price * item.quantity;
        }
        return acc;
    }, 0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        // if (!stripe || !elements) {
        //     toast.error("Stripe no está completamente cargado.");
        //     //setError("Stripe no está completamente cargado.");
        //     setIsProcessing(false);
        //     return;
        // }

        // const cardElement = elements.getElement(CardElement);

        try {
            // const response = await fetch('https://localhost:5000/api/create-payment-intent', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ amount: totalPrice * 100 }), // Total en centavos
            // });

            // const { clientSecret } = await response.json();

            // const result = await stripe.confirmCardPayment(clientSecret, {
            //     payment_method: {
            //         card: cardElement,
            //         billing_details: {
            //             name: user.user.name,
            //         },
            //     },
            // });

            // if (result.error) {
            //     toast.error("Hubo un error al realizar el pago");
            //     //throw new Error(result.error.message);
            // }

            // if (result.paymentIntent.status === 'succeeded') {
                setSuccess(true);
                const products = cart.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                }));
                
                console.log(JSON.stringify(products));

                const data = createNewOrder({
                    userId: user.user._id,
                    products: cart.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                    // transactionId: result.paymentIntent.id,
                    transactionId: "123",
                    total: totalPrice.toFixed(2),
                });

                if (data === undefined) {
                    toast.error("Hubo un error al crear el pedido");
                } else {
                    toast.success("Pago y creación de pedido exitoso");
                    removeCart();
                    navigate('/ordenes');
                }

            // }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <form onSubmit={handleSubmit}>
                {totalPrice > 0 && (<CardElement />)}

                <button type="submit" disabled={!stripe || isProcessing || totalPrice < 1}>
                    {isProcessing ? 'Procesando...' : 'Pagar'}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
