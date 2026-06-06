// src/pages/Auth/Login.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import loginImage from "./loginimage.png";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(form);
    if (!result.success) {
      setError(result.error);
      return;
    }
    const selected = location.state?.selectedPackage;
    if (selected) {
      const stored = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
      window.localStorage.setItem("southTrailsBookings", JSON.stringify([...stored, selected]));
    }
    navigate("/profile");
  };

  return (
    <main className="auth-login-page">
      <div className="login-split">
        <aside className="login-side login-art">
          <div className="login-image-wrap">
            <img src={loginImage} alt="South India travel map illustration" />
          </div>
        </aside>

        <section className="login-side login-form-side">
          <div className="login-card glass-card">
            <span className="login-badge">South Trails</span>
            <div className="login-intro">
              <h1>Begin Your Journey</h1>
              <p>Access curated experiences across South India.</p>
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
              Tamil Nadu • Kerala • Karnataka • Andhra Pradesh
            </div>
            <p className="login-caption">
              500+ Curated Packages | Trusted by Travelers
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
