const express = require('express');
const { addProducts, createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/addProducts', addProducts);
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
