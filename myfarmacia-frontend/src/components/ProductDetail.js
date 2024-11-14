// src/pages/ProductDetail.js
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GlobalContext from '../context/GlobalState';

const ProductDetail = () => {
  const { id } = useParams();
  const { fetchProductById, selectedProduct } = useContext(GlobalContext);

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  if (!selectedProduct) return <p>Loading...</p>;

  return (
    <div>
      <h2>{selectedProduct.name}</h2>
      <p>Price: ${selectedProduct.price}</p>
      <p>Description: {selectedProduct.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
