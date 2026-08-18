import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/Toast";
import { AdminContext } from "./AdminContext";
import { signInAdmin } from "../../services/authService";
import { validateLoginForm } from "../../utils/validation";

const credentials = {
  email: "admin@southtrails.com",
  password: "admin123",
};

const operationalFeatures = [
  { code: "PKG", title: "Package Inventory", desc: "Create, edit, price, and publish South Trails packages." },
  { code: "BKG", title: "Booking Pipeline", desc: "Review reservations and move bookings through operations." },
  { code: "USR", title: "User Management", desc: "Track customer profiles, booking history, and activity." },
  { code: "ANL", title: "Analytics", desc: "Monitor revenue, package performance, and demand trends." },
];

const operationalKPIs = [
  { metric: "1,000+", category: "Travelers Routed" },
  { metric: "500+", category: "Completed Bookings" },
  { metric: "1", category: "Active Region" },
  { metric: "4.9", category: "Avg Rating" },
];

const AdminLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const fillDemoCredentials = () => {
    setEmail(credentials.email);
    setPassword(credentials.password);
    setErrorMessage("");
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const validationError = validateLoginForm({ email, password });
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await signInAdmin({ email, password });
      if (error) {
        setErrorMessage(error.message || "Invalid admin credentials.");
        showToast("Invalid admin credentials.", "error");
        return;
      }

      login({ ...(data?.user || {}), role: data?.role, token: data?.token });
      showToast("Welcome back to the admin workspace.", "success");
      navigate("/admin/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(380px, 0.85fr)", backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      <section style={{ background: "linear-gradient(135deg, #0d5c56 0%, #0f766e 52%, #115e59 100%)", padding: "48px 64px", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#ffffff" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.12)", display: "grid", placeItems: "center", fontWeight: 900 }}>ST</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>South Trails</h2>
          </div>
          <span style={{ display: "block", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", color: "#2dd4bf", backgroundColor: "rgba(45,212,191,0.12)", padding: "4px 10px", borderRadius: "4px", width: "fit-content" }}>
            Travel Management Console
          </span>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: "900", color: "#ffffff", margin: "28px 0 12px", lineHeight: "1.08" }}>
            Manage premium journeys across South India.
          </h2>
          <p style={{ margin: 0, fontSize: "15px", color: "#ccfbf1", maxWidth: "600px", lineHeight: "1.6" }}>
            A protected operations workspace for packages, bookings, customers, analytics, and travel pipeline control.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "18px", margin: "40px 0" }}>
          {operationalFeatures.map((feature, index) => (
            <div
              key={feature.title}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: hoveredCard === index ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "12px",
                padding: "20px",
                transform: hoveredCard === index ? "translateY(-2px)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ width: 36, height: 36, borderRadius: 8, display: "grid", placeItems: "center", background: "rgba(255,255,255,0.1)", color: "#ffffff", fontSize: 12, fontWeight: 900 }}>{feature.code}</span>
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "800", color: "#ffffff" }}>{feature.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: "12px", color: "#ccfbf1", lineHeight: "1.5" }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: "24px" }}>
          {operationalKPIs.map((kpi) => (
            <div key={kpi.category}>
              <span style={{ display: "block", fontSize: "20px", fontWeight: "900", color: "#ffffff" }}>{kpi.metric}</span>
              <span style={{ fontSize: "11px", color: "#2dd4bf", fontWeight: "700", textTransform: "uppercase" }}>{kpi.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 56px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#f0fdfa", padding: "6px 12px", borderRadius: "20px", border: "1px solid #ccfbf1" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0b6b43", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.05em" }}>Admin Gateway Active</span>
          </div>
        </div>

        <div style={{ maxWidth: "390px", width: "100%", margin: "0 auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "900", color: "#022c22" }}>South Trails Admin</h1>
            <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#35705c" }}>Secure access for South Trails operations.</p>
          </div>

          <div style={{ border: "1px solid #99f6e4", background: "#f0fdfa", borderRadius: 12, padding: 14, marginBottom: 18 }}>
            <strong style={{ display: "block", color: "#0f766e", marginBottom: 4 }}>Demo credentials</strong>
            <p style={{ margin: 0, color: "#164e36", fontSize: 13 }}>Email: {credentials.email}</p>
            <p style={{ margin: "2px 0 12px", color: "#164e36", fontSize: 13 }}>Password: {credentials.password}</p>
            <button className="button button-secondary" type="button" onClick={fillDemoCredentials}>
              Fill credentials
            </button>
          </div>

          {errorMessage && (
            <div style={{ padding: "12px 16px", backgroundColor: "#f0fdf4", borderLeft: "4px solid #064e3b", borderRadius: "6px", color: "#064e3b", fontSize: "13px", fontWeight: "500", marginBottom: "20px" }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignInSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", fontWeight: "800", color: "#164e36", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Corporate Email Address
              <input
                id="admin-email"
                type="email"
                placeholder="admin@southtrails.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrorMessage("");
                }}
                style={{ width: "100%", padding: "12px 14px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #afd6c3", fontSize: "14px", color: "#022c22", outline: "none" }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "12px", fontWeight: "800", color: "#164e36", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Secure Access Password
              <div style={{ position: "relative" }}>
                <input
                  id="admin-pass"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setErrorMessage("");
                  }}
                  style={{ width: "100%", padding: "12px 60px 12px 14px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #afd6c3", fontSize: "14px", color: "#022c22", outline: "none" }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "11px", border: "none", backgroundColor: "transparent", color: "#35705c", fontSize: "12px", fontWeight: "700", cursor: "pointer", padding: 0 }}>
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </label>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", marginTop: "4px", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2f6b52", cursor: "pointer", fontWeight: "500" }}>
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} style={{ width: "15px", height: "15px", accentColor: "#0f766e", cursor: "pointer" }} />
                Remember workspace token
              </label>
              <button type="button" onClick={() => showToast("Administrative access resets require contacting your security manager.", "info")} style={{ border: "none", backgroundColor: "transparent", color: "#0f766e", fontWeight: "700", cursor: "pointer", fontSize: "13px", padding: 0 }}>
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "none", backgroundColor: isSubmitting ? "#115e59" : "#0f766e", color: "#ffffff", fontWeight: "800", fontSize: "14px", cursor: isSubmitting ? "not-allowed" : "pointer", marginTop: "8px" }}>
              {isSubmitting ? "Verifying..." : "Sign Into Admin Workspace"}
            </button>
          </form>

          <div style={{ border: "1px solid #d8efe5", borderRadius: "8px", padding: "12px 14px", marginTop: "28px", backgroundColor: "#ffffff" }}>
            <span style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#164e36", textTransform: "uppercase" }}>Protected admin access</span>
            <span style={{ display: "block", fontSize: "11px", color: "#35705c", marginTop: "4px", lineHeight: "1.4" }}>
              Admin routes require a valid admin session before dashboard, package, booking, user, kanban, and analytics pages open.
            </span>
          </div>
        </div>

        <footer style={{ borderTop: "1px solid #f0fdf4", paddingTop: "16px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "11px", color: "#6f9986", fontWeight: "500", letterSpacing: "0.02em" }}>
            Copyright 2026 South Trails Ltd. All rights reserved.
          </p>
        </footer>
      </section>
    </main>
  );
};

export default AdminLogin;
