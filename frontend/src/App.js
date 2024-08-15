import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import Cart from "./components/Cart";
import AdminEditProduct from "./pages/AdminEditProduct";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/edit-product/:id"
                element={<AdminEditProduct />}
              />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
