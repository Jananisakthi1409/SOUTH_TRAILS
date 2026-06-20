// src/pages/Auth/Signup.jsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import { createBooking } from "../../services/bookingService";
import { validateSignupForm } from "../../utils/validation";
import loginImage from "./loginimage.webp";

const generatePassId = () => {
  return `ST-${Math.floor(100000 + Math.random() * 900000)}`;
};

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuthContext();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [stage, setStage] = useState("form");
  const [count, setCount] = useState(3);
  const [passId, setPassId] = useState("");
  const [error, setError] = useState("");
  const [successBooking, setSuccessBooking] = useState(null);

  const handleChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const isReady = form.fullName.trim() && form.phone.trim();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateSignupForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    const result = await signup({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    });
    if (!result.success) {
      setError(result.error);
      return;
    }

    const selected = location.state?.selectedPackage;
    if (selected) {
      if (result.user?.id) {
        const payload = {
          customer_id: result.user.id,
          package_id: selected.packageId,
          package_snapshot: { id: selected.packageId, title: selected.packageName },
          travel_date: selected.travelDate || null,
          travelers: selected.travelers || 1,
          status: selected.status || "Pending",
          total_amount: selected.totalAmount || Number(String(selected.price || "").replace(/[^0-9]/g, "")) || null,
          special_request: selected.specialRequests || selected.special_request || null,
        };

        try {
          const { data, error } = await createBooking(payload);
          if (error) {
            throw error;
          }
          setSuccessBooking(data || selected);
        } catch (error) {
          console.error("Booking fallback error:", error);
          const stored = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
          window.localStorage.setItem("southTrailsBookings", JSON.stringify([...stored, selected]));
          setSuccessBooking(selected);
        }
      } else {
        const stored = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
        window.localStorage.setItem("southTrailsBookings", JSON.stringify([...stored, selected]));
        setSuccessBooking(selected);
      }
    }
    setPassId(generatePassId());
    setCount(3);
    setStage("creating");
    window.setTimeout(() => setStage("boarding"), 1200);
  };

  useEffect(() => {
    if (stage !== "boarding") return;
    const interval = window.setInterval(() => {
      setCount((value) => {
        if (value <= 1) {
          clearInterval(interval);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage === "boarding" && count === 0) {
      if (successBooking?.id) {
        navigate(`/booking-success/${successBooking.id}`, {
          state: { booking: successBooking },
        });
        return;
      }
      navigate("/profile");
    }
  }, [count, navigate, stage, successBooking]);

  const info = location.state?.message || "";

  return (
    <main className="auth-login-page auth-signup-page">
      <div className="login-split signup-split">
        <aside className="login-side login-art">
          <div className="login-image-wrap">
            <img src={loginImage} alt="South India travel map illustration" />
          </div>
        </aside>

        <section className="login-side signup-section">
          <div className="signup-stack">
            <div className="pass-card">
              <div className="pass-card-header">
                <span className="pass-brand">SOUTH TRAILS</span>
                <h2>TRAVEL PASS</h2>
              </div>
              <div className="pass-row">
                <span>Traveler:</span>
                <strong>{form.fullName.trim() || "Future Explorer"}</strong>
              </div>
              <div className="pass-row">
                <span>Phone:</span>
                <strong>{form.phone.trim() || "Not Added"}</strong>
              </div>
              <div className={`pass-row pass-status-row ${isReady ? "ready" : "preparing"}`}>
                <span>Status:</span>
                <strong>{isReady ? "✓ Ready To Explore" : "Preparing Journey"}</strong>
              </div>
              <div className="pass-row">
                <span>Pass ID:</span>
                <strong>{passId || "ST-XXXXXX"}</strong>
              </div>
              <div className="pass-row">
                <span>Destination:</span>
                <strong>South India</strong>
              </div>
              <div className="pass-tags">
                <span>🏛 Tamil Nadu</span>
                <span>🌴 Kerala</span>
                <span>🏰 Karnataka</span>
                <span>⛰ Andhra Pradesh</span>
              </div>
            </div>

            <div className="signup-card">
              {stage === "form" && (
                <>
                  <span className="signup-badge">South Trails</span>
                  <div className="signup-copy">
                    <h1>Get Your Travel Pass</h1>
                    <p>Join thousands of travelers exploring South India's most beautiful destinations.</p>
                  </div>

                  {info && <div className="auth-alert auth-alert-warning">{info}</div>}
                  {error && <div className="auth-alert auth-alert-error">{error}</div>}

                  <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="floating-field">
                      <span className="input-icon">👤</span>
                      <input
                        id="fullName"
                        type="text"
                        value={form.fullName}
                        onChange={handleChange("fullName")}
                        placeholder=" "
                        autoComplete="name"
                      />
                      <label htmlFor="fullName">Full Name</label>
                    </div>

                    <div className="floating-field">
                      <span className="input-icon">📱</span>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        placeholder=" "
                        autoComplete="tel"
                      />
                      <label htmlFor="phone">Phone Number</label>
                    </div>

                    <div className="floating-field">
                      <span className="input-icon">📧</span>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        placeholder=" "
                        autoComplete="email"
                      />
                      <label htmlFor="email">Email Address</label>
                    </div>

                    <div className="floating-field textarea-field">
                      <span className="input-icon">📍</span>
                      <textarea
                        id="address"
                        value={form.address}
                        onChange={handleChange("address")}
                        placeholder=" "
                        rows={2}
                      />
                      <label htmlFor="address">Address</label>
                    </div>

                    <div className="floating-field">
                      <span className="input-icon">🔒</span>
                      <input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange("password")}
                        placeholder=" "
                        autoComplete="new-password"
                      />
                      <label htmlFor="password">Password</label>
                    </div>

                    <div className="floating-field">
                      <span className="input-icon">🔒</span>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        placeholder=" "
                        autoComplete="new-password"
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>

                    <label className="checkbox-label">
                      <input type="checkbox" checked={form.agree} onChange={handleChange("agree")} />
                      I agree to Terms & Conditions
                    </label>

                    <button className="button button-primary action-button" type="submit">
                      ✈ Get My Travel Pass
                    </button>

                    <div className="secondary-text">
                      Already have a Travel Pass? <Link to="/login">Login</Link>
                    </div>
                  </form>
                </>
              )}

              {stage === "creating" && (
                <div className="signup-loading">
                  <p>Creating Travel Pass...</p>
                  <div className="loading-bars">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {stage === "boarding" && (
                <div className="success-card">
                  <span className="success-label">Welcome Aboard!</span>
                  <div className="boarding-pass">
                    <div className="boarding-header">SOUTH TRAILS</div>
                    <div className="boarding-title">BOARDING PASS</div>
                    <div className="boarding-row">
                      <span>Traveler:</span>
                      <strong>{form.fullName || "Future Explorer"}</strong>
                    </div>
                    <div className="boarding-row">
                      <span>Pass ID:</span>
                      <strong>{passId}</strong>
                    </div>
                    <div className="boarding-row">
                      <span>Destination:</span>
                      <strong>South India</strong>
                    </div>
                    <div className="boarding-row">
                      <span>Status:</span>
                      <strong>READY TO EXPLORE</strong>
                    </div>
                    <div className="boarding-footer">Redirecting in {count}...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
