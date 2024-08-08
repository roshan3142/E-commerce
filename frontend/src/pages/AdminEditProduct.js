import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productService";

function AdminEditProduct() {
  const { id } = useParams(); // Get product ID from URL
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    stock: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        setForm(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product details.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, form);
      navigate("/admin"); // Redirect to admin page after successful update
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-edit-product">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Product Price"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Image URL
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Product Image URL"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Category
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Product Category"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Stock
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Product Stock"
              required
            />
          </label>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default AdminEditProduct;
