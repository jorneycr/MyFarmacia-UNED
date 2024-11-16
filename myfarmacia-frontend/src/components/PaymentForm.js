// src/components/PaymentForm.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';

// Cargar la clave pública de Stripe
const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE);

const PaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default PaymentForm;
