import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../features/auth/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { label: "Destinations", to: "/explore" },
    { label: "Experiences", to: "/trip-builder" },
    { label: "Packages", to: "/packages" },
    { label: "Gallery", to: "/map" },
    { label: "Oracle AI", to: "/oracle" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenus();
  };

  return (
    <header className={`site-header site-header--luxury${isHome ? " site-header--home" : ""}${isScrolled ? " site-header--scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="brand">
          South Trails
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
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
                Account
              </button>
              {menuOpen && (
                <div className="profile-menu">
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link to="/profile/bookings" onClick={() => setMenuOpen(false)}>
                    My Bookings
                  </Link>
                  <button type="button" className="menu-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            type="button"
            className="nav-menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`mobile-nav-drawer${mobileOpen ? " mobile-nav-drawer--open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={closeMenus}>{item.label}</Link>
          ))}
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={closeMenus}>Login</Link>
              <Link to="/signup" onClick={closeMenus}>Signup</Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={closeMenus}>My Profile</Link>
              <Link to="/profile/bookings" onClick={closeMenus}>My Bookings</Link>
              <button type="button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
