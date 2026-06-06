// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../features/auth/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link to="/" className="brand">
          South Trails
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          {/* <Link to="/explore">Explore</Link> */}
          <Link to="/packages">Packages</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="nav-actions" ref={menuRef}>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="button button-secondary">
                Login
              </Link>
              <Link to="/signup" className="button button-primary">
                Signup
              </Link>
            </>
          ) : (
            <div className="profile-menu-wrapper">
              <button
                type="button"
                className="button button-secondary profile-badge"
                onClick={() => setMenuOpen((open) => !open)}
              >
                👤
              </button>
              {menuOpen && (
                <div className="profile-menu">
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    My Bookings
                  </Link>
                  <button type="button" className="menu-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
