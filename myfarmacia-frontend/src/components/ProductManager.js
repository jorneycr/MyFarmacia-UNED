import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalState";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import "../styles/ProductManager.css";

const ProductManager = () => {
  const { products, fetchProductsData } = useContext(GlobalContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    fetchProductsData();
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
      fetchProductsData();
      setFormData({ name: "", price: "", category: "", description: "", stock: "" });
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
      category: product.category,
      description: product.description,
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
    setFormData({ name: "", price: "", category: "", description: "", stock: "" });
  };

  return (
    <div className="product-manager">
      <h1 className="product-manager__title">Gestión de Productos</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="product-form__group">
          <label htmlFor="name" className="product-form__label">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            className="product-form__input"
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="price" className="product-form__label">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            className="product-form__input"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="category" className="product-form__label">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            className="product-form__input"
            placeholder="Categoría"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="description" className="product-form__label">Descripción</label>
          <textarea
            id="description"
            name="description"
            className="product-form__textarea"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="product-form__group">
          <label htmlFor="stock" className="product-form__label">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="product-form__input"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="product-form__actions">
          <button type="submit" className="product-form__button">
            {editingProduct ? "Actualizar Producto" : "Agregar Producto"}
          </button>
          {editingProduct && (
            <button
              type="button"
              className="product-form__button product-form__button--cancel"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className="product-list__title">Lista de Productos</h2>
      <ul className="product-manager-list">
        {products.map((product) => (
          <li className="product-list__item" key={product._id}>
            <div className="product-list__info">
              <span className="product-list__name">{product.name} - </span>
              <span className="product-list__price">${product.price} - </span>
              <span className="product-list__category">{product.category} - </span>
              <span className="product-list__description">{product.description} - </span>
              <span className="product-list__stock">Stock: {product.stock}</span>
            </div>
            <div className="product-list__actions">
              <button
                className="product-list__button product-list__button--edit"
                onClick={() => handleEdit(product)}
              >
                Editar
              </button>
              <button
                className="product-list__button product-list__button--delete"
                onClick={() => handleDelete(product._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManager;
