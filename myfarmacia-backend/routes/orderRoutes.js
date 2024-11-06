const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();
const auth = require('../middleware/auth');  // Middleware para verificar autenticación

router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);

module.exports = router;
