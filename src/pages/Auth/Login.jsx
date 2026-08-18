// src/pages/Auth/Login.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import { createBooking } from "../../services/bookingService";
import { validateLoginForm } from "../../utils/validation";
import loginImage from "./loginimage.webp";

const BOOKING_STORAGE_KEY = "southTrailsBookings";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const info = location.state?.message || "";

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setError("");
  };

  const saveFallbackBooking = (selected) => {
    const stored = JSON.parse(window.localStorage.getItem(BOOKING_STORAGE_KEY) || "[]");
    window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify([...stored, selected]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateLoginForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    const result = await login(form);
    if (!result.success) {
      setError(result.error);
      return;
    }

    const selected = location.state?.selectedPackage;
    let successBooking = null;
    if (selected) {
      if (result.user?.id) {
        const payload = {
          customer_id: result.user.id,
          package_id: selected.packageId,
          package_snapshot: { id: selected.packageId, title: selected.packageName, state: "Tamil Nadu" },
          travel_date: selected.travelDate || null,
          travelers: selected.travelers || 1,
          status: selected.status || "Pending",
          total_amount: selected.totalAmount || Number(String(selected.price || "").replace(/[^0-9]/g, "")) || null,
          special_request: selected.specialRequests || selected.special_request || null,
        };

        try {
          const { data, error: bookingError } = await createBooking(payload);
          if (bookingError) throw bookingError;
          successBooking = data || selected;
        } catch (bookingError) {
          console.error("Booking fallback error:", bookingError);
          saveFallbackBooking(selected);
          successBooking = selected;
        }
      } else {
        saveFallbackBooking(selected);
        successBooking = selected;
      }
    }

    if (successBooking?.id) {
      navigate(`/booking-success/${successBooking.id}`, { state: { booking: successBooking } });
      return;
    }

    navigate("/profile");
  };

  return (
    <main className="auth-login-page">
      <div className="login-split">
        <aside className="login-side login-art">
          <div className="login-image-wrap">
            <img src={loginImage} alt="Tamil Nadu travel illustration" />
          </div>
        </aside>

        <section className="login-side login-form-side">
          <div className="login-card glass-card">
            <span className="login-badge">South Trails</span>
            <div className="login-intro">
              <h1>Begin Your Journey</h1>
              <p>Access curated experiences across Tamil Nadu.</p>
            </div>

            {info && <div className="auth-alert auth-alert-warning">{info}</div>}
            {error && <div className="auth-alert auth-alert-error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                Email Address
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="Enter your password"
                />
              </label>

              <div className="login-meta">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember Me
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button className="button button-primary" type="submit">
                Start Exploring
              </button>
              <button type="button" className="button button-secondary google-button">
                Continue with Google
              </button>
            </form>

            <p className="login-footer">
              New Traveler? <Link to="/signup">Create Account</Link>
            </p>

            <div className="login-tags">
              Chennai / Madurai / Ooty / Rameswaram / Kanyakumari
            </div>
            <p className="login-caption">
              Tamil Nadu packages | Trusted by travelers
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
