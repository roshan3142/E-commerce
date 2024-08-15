// src/pages/CheckoutPage.js
import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    couponCode: "",
  });
  const [errors, setErrors] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.zipCode) newErrors.zipCode = "ZIP code is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!form.cardName) newErrors.cardName = "Name on card is required";
    if (!form.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!form.cvv) newErrors.cvv = "CVV is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCouponApply = () => {
    if (form.couponCode === "DISCOUNT10") {
      setAppliedCoupon({ code: form.couponCode, discount: 10 });
      alert("Coupon applied successfully!"); // Simple alert instead of toast
    } else {
      setErrors({ ...errors, couponCode: "Invalid coupon code" });
      alert("Invalid coupon code");
    }
  };

  const calculateTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (appliedCoupon) {
      total -= (total * appliedCoupon.discount) / 100;
    }
    return total.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulating an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Order submitted", form);
        clearCart();
        alert("Your order has been placed!"); // Simple alert instead of toast
        navigate("/order-confirmation");
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("There was an error placing your order. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  const renderProgressBar = () => (
    <div className="progress-bar">
      <div className={`step ${step >= 1 ? "active" : ""}`}>Shipping</div>
      <div className={`step ${step >= 2 ? "active" : ""}`}>Payment</div>
      <div className={`step ${step >= 3 ? "active" : ""}`}>Review</div>
    </div>
  );

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {renderProgressBar()}
      <div className="checkout-container">
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <span>{item.name}</span>
              <span>
                {item.quantity} x ${item.price}
              </span>
            </div>
          ))}
          <div className="coupon-section">
            <input
              type="text"
              name="couponCode"
              value={form.couponCode}
              onChange={handleChange}
              placeholder="Coupon Code"
            />
            <button onClick={handleCouponApply} type="button">
              Apply
            </button>
            {errors.couponCode && <p className="error">{errors.couponCode}</p>}
            {appliedCoupon && (
              <p>Coupon applied: {appliedCoupon.discount}% off</p>
            )}
          </div>
          <div className="total">
            <strong>Total: ${calculateTotal()}</strong>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="checkout-form">
          {step === 1 && (
            <>
              <h2>Shipping Information</h2>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
              {errors.address && <p className="error">{errors.address}</p>}
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
              {errors.city && <p className="error">{errors.city}</p>}
              <input
                type="text"
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                placeholder="ZIP Code"
                required
              />
              {errors.zipCode && <p className="error">{errors.zipCode}</p>}
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
              {errors.country && <p className="error">{errors.country}</p>}
              <button type="button" onClick={() => setStep(2)}>
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2>Payment Information</h2>
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
                required
              />
              {errors.cardNumber && (
                <p className="error">{errors.cardNumber}</p>
              )}
              <input
                type="text"
                name="cardName"
                value={form.cardName}
                onChange={handleChange}
                placeholder="Name on Card"
                required
              />
              {errors.cardName && <p className="error">{errors.cardName}</p>}
              <input
                type="text"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                placeholder="Expiry Date (MM/YY)"
                required
              />
              {errors.expiryDate && (
                <p className="error">{errors.expiryDate}</p>
              )}
              <input
                type="text"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="CVV"
                required
              />
              {errors.cvv && <p className="error">{errors.cvv}</p>}
              <div className="payment-options">
                <button id="paypal-button" type="button">
                  Pay with PayPal
                </button>
                <button id="apple-pay-button" type="button">
                  Pay with Apple Pay
                </button>
              </div>
              <button type="button" onClick={() => setStep(3)}>
                Review Order
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <h2>Review Your Order</h2>
              <div className="order-review">
                <h3>Shipping Information</h3>
                <p>
                  {form.firstName} {form.lastName}
                  <br />
                  {form.address}, {form.city}, {form.zipCode}, {form.country}
                </p>
                <h3>Payment Information</h3>
                <p>
                  Card Number: **** **** **** {form.cardNumber.slice(-4)}
                  <br />
                  Name on Card: {form.cardName}
                  <br />
                  Expiry Date: {form.expiryDate}
                </p>
                <h3>Order Summary</h3>
                {cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x ${item.price}
                    </span>
                  </div>
                ))}
                <strong>Total: ${calculateTotal()}</strong>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Place Order
              </button>
              <button type="button" onClick={() => setStep(1)}>
                Edit Information
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
