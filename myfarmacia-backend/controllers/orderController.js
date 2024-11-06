const Order = require('../models/Order');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    try {
        const order = new Order({
            userId: req.user.id,
            products: req.body.products,
            total: req.body.total,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las órdenes de un usuario
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
