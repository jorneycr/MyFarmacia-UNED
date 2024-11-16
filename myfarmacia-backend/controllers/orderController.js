const Order = require('../models/Order');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    try {
        const products = req.body.products.map(item => ({
            productId: item.productId,  // Referencia al producto
            quantity: item.quantity      // Cantidad del producto en el carrito
        }));

        const order = new Order({
            userId: req.body.userId,             // ID del usuario (proporcionado por autenticación)
            products: products,              // Los productos con sus cantidades
            transactionId: req.body.transactionId,  // ID de transacción
            total: req.body.total,           // Total de la orden
        });

        await order.save();

        res.status(201).json(order);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        console.error({error: error.message});
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las órdenes de un usuario
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.body.user});
        res.status(200).json(orders);
    } catch (error) {
        console.error({error: error.message});
        res.status(500).json({ error: error.message });
    }
};

//Obtener por transacion del ID

//Eliminar por transacion del ID
