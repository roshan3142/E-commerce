import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>In Stock: {product.stock}</p>
      <img src={product.imageUrl} alt={product.name} />
    </div>
  );
}

export default ProductDetail;
