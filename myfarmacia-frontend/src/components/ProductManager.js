import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalState";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import '../styles/ProductManager.css';

const ProductManager = () => {
  const { products, fetchProductsData } = useContext(GlobalContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProductsData(); // Cargar productos desde el contexto
  }, [fetchProductsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await createProduct(formData);
      }
      fetchProductsData(); // Recargar la lista de productos
      setFormData({ name: "", price: "", stock: "" });
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        fetchProductsData();
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", stock: "" });
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingProduct ? "Actualizar Producto" : "Agregar Producto"}
        </button>
        {editingProduct && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar
          </button>
        )}
      </form>

      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} - Stock: {product.stock}
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManager;
