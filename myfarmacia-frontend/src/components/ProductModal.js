import React from 'react';
import '../styles/ProductModal.css';

const ProductModal = ({ product, closeModal }) => {

    // Función para cerrar el modal si el usuario hace clic fuera de él
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) { // Verifica si el clic fue en la zona de fondo (overlay)
            closeModal();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>X</button>
                <h3>{product.name}</h3>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
                <p><strong>Disponibilidad:</strong> {product.available ? 'Disponible' : 'Agotado'}</p>
                <p><strong>Categoría:</strong> {product.category}</p>
            </div>
        </div>
    );
};

export default ProductModal;
