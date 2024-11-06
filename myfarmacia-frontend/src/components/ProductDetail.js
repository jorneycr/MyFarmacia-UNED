// src/components/ProductDetail.js

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import GlobalContext from '../context/GlobalState';

const ProductDetail = () => {
    const { id } = useParams();
    const { products, addToCart } = useContext(GlobalContext);
    const product = products.find(product => product._id === id);

    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductDetail;
