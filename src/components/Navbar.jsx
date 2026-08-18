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
        className={`fixed left-0 right-0 top-0 z-50 border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-black tracking-tight text-[#166534] focus-visible"
            aria-label="South Trails Home"
            onClick={closeMenus}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#15803d] text-sm font-black text-white shadow-sm">
              ST
            </span>
            <span className="hidden sm:inline">South Trails</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = item.to === "/explore"
                ? ["/explore", "/destinations", "/experiences"].some((path) => location.pathname.startsWith(path))
                : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition focus-visible ${
                    isActive ? "bg-[#f0fdf4] text-[#15803d]" : "text-[#1f2937] hover:bg-[#f8fafc] hover:text-[#15803d]"
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
                  className="flex items-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-semibold text-[#166534] transition hover:border-[#bbf7d0] hover:bg-[#f0fdf4] focus-visible"
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
                      className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-lg"
                    >
                      <div className="flex flex-col py-2">
                        <Link
                          to="/profile"
                          className="px-4 py-2 text-sm font-medium text-[#1f2937] hover:bg-[#f0fdf4] focus-visible"
                          onClick={() => setMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile/bookings"
                          className="px-4 py-2 text-sm font-medium text-[#1f2937] hover:bg-[#f0fdf4] focus-visible"
                          onClick={() => setMenuOpen(false)}
                        >
                          My Bookings
                        </Link>
                        <div className="my-1 h-px bg-[#e5e7eb]" />
                        <button
                          type="button"
                          className="px-4 py-2 text-left text-sm font-semibold text-[#166534] hover:bg-[#f0fdf4] focus-visible"
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
                className="hidden h-10 items-center justify-center rounded-md bg-[#15803d] px-5 text-sm font-bold text-white transition hover:bg-[#166534] focus-visible md:inline-flex"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="group relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-md border border-[#e5e7eb] bg-white md:hidden focus-visible"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={`h-[2px] w-5 bg-[#166534] transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[8px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-[#166534] transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-[#166534] transition-transform duration-300 ${
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
            className="fixed inset-0 z-50 flex flex-col justify-center bg-white p-8 text-[#1f2937] shadow-xl md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenus}
                  className="text-2xl font-black text-[#1f2937] transition hover:text-[#15803d]"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="mx-auto my-4 h-px w-16 bg-[#e5e7eb]" />
              
              {!isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="inline-flex h-12 items-center justify-center rounded-md bg-[#15803d] px-8 text-base font-bold text-white transition hover:bg-[#166534]"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenus}
                    className="font-semibold text-[#166534] hover:text-[#15803d]"
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="text-lg font-semibold text-[#1f2937] hover:text-[#15803d]"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/profile/bookings"
                    onClick={closeMenus}
                    className="text-lg font-semibold text-[#1f2937] hover:text-[#15803d]"
                  >
                    My Bookings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-4 font-semibold text-[#166534]"
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
