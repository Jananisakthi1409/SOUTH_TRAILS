import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    { label: "Packages", to: "/packages" },
    { label: "AI Planner", to: "/oracle" },
    { label: "Contact", to: "/contact" },
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
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled || !isHome
            ? "bg-[#07110f]/90 backdrop-blur-md shadow-md py-4 border-b border-white/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-black tracking-tight text-white focus-visible"
            aria-label="Tamil Trails Home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f0c94a] font-display text-sm text-[#07110f]">
              TT
            </span>
            <span className="hidden sm:inline font-display">Tamil Trails</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-semibold transition focus-visible ${
                    isActive ? "text-[#f0c94a]" : "text-white hover:text-[#f0c94a]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4" ref={menuRef}>
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus-visible"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                >
                  Account
                  <svg className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-[#0a1815] shadow-luxury"
                    >
                      <div className="flex flex-col py-2">
                        <Link
                          to="/profile"
                          className="px-4 py-2 text-sm text-white hover:bg-white/10 focus-visible"
                          onClick={() => setMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile/bookings"
                          className="px-4 py-2 text-sm text-white hover:bg-white/10 focus-visible"
                          onClick={() => setMenuOpen(false)}
                        >
                          My Bookings
                        </Link>
                        <div className="my-1 h-px bg-white/10" />
                        <button
                          type="button"
                          className="px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10 focus-visible"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex h-10 items-center justify-center rounded-md bg-[#2f7dd3] px-6 text-sm font-bold text-white transition hover:bg-[#3d8ee9] focus-visible"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="group relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden focus-visible"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[8px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-white transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[8px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-center bg-[#07110f]/95 p-8 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenus}
                  className="font-display text-3xl text-white transition hover:text-[#f0c94a]"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="my-6 h-px bg-white/10 mx-auto w-16" />
              
              {!isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[#2f7dd3] px-8 text-base font-bold text-white transition hover:bg-[#3d8ee9]"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenus}
                    className="text-white hover:text-[#f0c94a]"
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="text-lg text-white hover:text-[#f0c94a]"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/profile/bookings"
                    onClick={closeMenus}
                    className="text-lg text-white hover:text-[#f0c94a]"
                  >
                    My Bookings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-4 text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
