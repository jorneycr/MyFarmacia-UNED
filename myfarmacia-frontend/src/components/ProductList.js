import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalState';

const ProductList = () => {
    const { cart, products, fetchProductsData, addToCart } = useContext(GlobalContext);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);

    const isInCart = (productId) => cart.some(item => item.productId === productId);

    const handleQuantityChange = (productId, value) => {
        setQuantities({ ...quantities, [productId]: Number(value) });
    };

    return (
        <div>
            <h2>Product List</h2>
            {products.map((product) => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <input
                        type="number"
                        min="1"
                        value={quantities[product._id] || 1}
                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                        disabled={isInCart(product._id)}
                    />
                    <button
                        onClick={() => addToCart(product, quantities[product._id] || 1)}
                        disabled={isInCart(product._id)}
                    >
                        {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
