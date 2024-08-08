import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../services/productService";
import { CartContext } from "../context/CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    setIsAdmin(!!admin);

    getAllProducts()
      .then((data) => {
        const uniqueCategories = [
          "All",
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      });
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    // Refresh the product list after deletion
    setProducts(products.filter((product) => product._id !== id));
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="category-list">
        {categories.map((category) => (
          <button
            className={`btn ${
              selectedCategory === category ? "btn-active" : ""
            }`}
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-item" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <h3>{product.name}</h3>
                <img src={product.imageUrl} alt={product.name} />
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
              </Link>
              <div className="product-actions">
                {isAdmin && (
                  <>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
                <button
                  className="btn-add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
