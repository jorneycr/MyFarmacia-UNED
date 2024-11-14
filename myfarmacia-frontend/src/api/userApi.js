// src/api/userApi.js
import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('https://localhost:5000/api/users/register', userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('https://localhost:5000/api/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
