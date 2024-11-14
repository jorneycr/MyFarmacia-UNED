// src/pages/ProductList.js
import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalState';

const ProductList = () => {
  const { products, fetchProductsData, addToCart } = useContext(GlobalContext);

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
