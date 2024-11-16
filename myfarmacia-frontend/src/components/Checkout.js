// src/components/Checkout.js
import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import GlobalContext from '../context/GlobalState';

const Checkout = () => {
    const { cart } = useContext(GlobalContext);
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   setIsProcessing(true);

    //   if (!stripe || !elements) {
    //     return;
    //   }

    //   const cardElement = elements.getElement(CardElement);

    //   // Crear PaymentIntent desde el backend
    //   const response = await fetch('/api/create-payment-intent', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ amount: totalPrice * 100 }), // Total en centavos
    //   });

    //   const { clientSecret } = await response.json();

    //   // Confirmar el pago con el PaymentIntent
    //   const result = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: cardElement,
    //       billing_details: {
    //         name: 'John Doe', // Esto debería ser dinámico según el usuario
    //       },
    //     },
    //   });

    //   if (result.error) {
    //     setError(result.error.message);
    //     setSuccess(false);
    //   } else {
    //     if (result.paymentIntent.status === 'succeeded') {
    //       setError(null);
    //       setSuccess(true);
    //     }
    //   }
    //   setIsProcessing(false);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        if (!stripe || !elements) {
            setError("Stripe no está completamente cargado.");
            setIsProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Crear el PaymentIntent desde el backend
            const response = await fetch('https://localhost:5000/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: totalPrice * 100 }), // Total en centavos
            });

            const { clientSecret } = await response.json();

            // Confirmar el pago con el PaymentIntent
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'John Doe', // Cambia esto dinámicamente según el cliente
                    },
                },
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            if (result.paymentIntent.status === 'succeeded') {
                // Aquí se considera que el pago fue exitoso
                console.log('Pago exitoso:', result.paymentIntent);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <p>Total: ${totalPrice}</p>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe || isProcessing}>
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Payment Successful!</div>}
        </div>
    );
};

export default Checkout;
