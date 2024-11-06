const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema);
