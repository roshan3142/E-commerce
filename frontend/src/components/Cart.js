import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleQtyChange = (e, index) => {
    if (!e.target.value || e.target.value <= 0) return;
    updateQuantity(cart[index]._id, e.target.value); // Corrected to use item._id
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={item._id}>
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
              </div>
              <input
                type="number"
                value={item.quantity} // Display current quantity
                onChange={(e) => handleQtyChange(e, index)}
              />
              <button className="btn" onClick={() => removeFromCart(item._id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <p>
              Total: $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="btn" onClick={clearCart}>
              Clear Cart
            </button>{" "}
            {/* Button to clear cart */}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
