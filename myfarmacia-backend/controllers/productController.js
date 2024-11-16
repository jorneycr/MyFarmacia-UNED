const Product = require('../models/Product');
const dataProducts = require('../data/initialProducts.js');

exports.addProducts = async (req, res) => {
  try {
    for (const product of dataProducts) {
      const newProduct = new Product(product);

      try {
        await newProduct.save();
      } catch (error) {
        console.error(`Error al agregar el producto: ${newProduct.name}`, error.message);
      }
    }

    return res.status(200).json({ mensaje: 'Todos los productos han sido importados exitosamente.' });
  } catch (error) {
    console.error('Error al importar los productos:', error.message);
    return res.status(500).json({ error: 'Ocurrió un error al importar los productos.' });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error({error: error.message});
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error({error: error.message});
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        console.error({error: error.message});
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product);
    } catch (error) {
        console.error({error: error.message});
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        console.error({error: error.message});
        res.status(500).json({ error: error.message });
    }
};
