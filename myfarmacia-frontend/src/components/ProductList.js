// src/components/ProductList.js

import React, { useContext, useEffect } from 'react';
import GlobalContext from '../context/GlobalState';

const ProductList = () => {
    const { products, fetchProducts, addToCart } = useContext(GlobalContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            {products.map(product => (
                <div key={product._id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
