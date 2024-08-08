import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem("admin")); // Check if admin is logged in

  const handleLogout = () => {
    localStorage.removeItem("admin"); // Clear admin authentication data
    navigate("/admin/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SALT.
      </Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/cart" className="navbar-link">
          Cart
        </Link>
        {isAdmin ? (
          <>
            <Link to="/admin" className="navbar-link">
              Admin Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="navbar-link logout-button"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/admin/login" className="navbar-link">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
