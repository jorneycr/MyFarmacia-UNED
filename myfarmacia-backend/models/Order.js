const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ],
    transactionId: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ['completed', 'canceled'], default: 'completed' }
});

module.exports = mongoose.model('Order', orderSchema);
