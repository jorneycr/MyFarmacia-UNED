import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import GlobalContext from '../context/GlobalState';
import './ProductList.css';
import ProductModal from './ProductModal';


const ProductList = () => {
    const { cart, products, fetchProductsData, addToCart } = useContext(GlobalContext);
    const [quantities, setQuantities] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);

    const isInCart = (productId) => cart.some(item => item.productId === productId);

    const handleQuantityChange = (productId, value) => {
        setQuantities({ ...quantities, [productId]: Number(value) });
    };

    const handleAddToCart = (product, quantity) => {
        addToCart(product, quantity);
        toast.success("Producto agregado al carrito");
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
        <h2>Lista de Productos</h2>

        <div className="product-list">
            {products.map((product) => (
                <div key={product._id} className="product-card">
                    {/* <img src={product.imageUrl} alt={product.name} /> */}
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <input
                        type="number"
                        min="1"
                        value={quantities[product._id] || 1}
                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                        disabled={isInCart(product._id)}
                        className="quantity-input"
                    />
                    <button
                        onClick={() => handleAddToCart(product, quantities[product._id] || 1)}
                        disabled={isInCart(product._id)}
                        className="add-to-cart-btn"
                    >
                        {isInCart(product._id) ? 'En Carrito' : 'Agregar al Carrito'}
                    </button>
                    <button
                        onClick={() => openModal(product)}
                        className="view-more-btn"
                    >
                        Ver Más
                    </button>
                </div>
            ))}
        </div>

        {isModalOpen && selectedProduct && (
            <ProductModal 
                product={selectedProduct} 
                closeModal={closeModal}
            />
        )}
    </>
    );
};

export default ProductList;
