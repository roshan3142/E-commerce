import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the order here
    alert("Order placed successfully!");
    clearCart(); // Clear cart after order
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              <span>{item.name}</span>
              <span>
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          <h3>Total: ${calculateTotal()}</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h2>Shipping Information</h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          required
        />
        <input
          type="text"
          name="zip"
          value={form.zip}
          onChange={handleChange}
          placeholder="ZIP Code"
          required
        />
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
