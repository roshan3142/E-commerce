import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="product-item">
      <Link to={`/product/${product._id}`}>
        <h3>{product.name}</h3>
        <img src={product.imageUrl} alt={product.name} />
        <p>Price: ${product.price}</p>
      </Link>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
