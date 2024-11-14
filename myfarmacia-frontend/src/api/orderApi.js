// src/api/orderApi.js
import axios from 'axios';

const API_URL = 'https://localhost:5000/api/orders';

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};
