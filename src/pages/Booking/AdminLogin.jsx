import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Core Authentication States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Micro-interaction Interactive UI Hover Triggers
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isForgotHovered, setIsForgotHovered] = useState(false);

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both secure administrative identifiers.");
      return;
    }

    setIsSubmitting(true);

    // Structural latency simulation ensuring visual premium interface timing
    setTimeout(() => {
      setIsSubmitting(false);
      // Operational payload bypass routing to target admin deck console context
      navigate("/admin/dashboard");
    }, 1400);
  };

  // Branding Core Metadata Matrices arrays
  const operationalFeatures = [
    { title: "Itinerary Inventory", desc: "Configure curated South India luxury packages dynamic matrices.", icon: "🗺️" },
    { title: "Client Master Ledger", desc: "Oversee account credentials, activity portfolios and profiles.", icon: "👥" },
    { title: "Booking Pipeline Control", desc: "Audit live passenger manifest statuses and verify invoices.", icon: "💳" },
    { title: "Business BI Intelligence", desc: "Monitor localized revenue yields, trends and KPIs graphs.", icon: "📊" }
  ];

  const operationalKPIs = [
    { metric: "1,000+", category: "Travelers Routed" },
    { metric: "500+", category: "Completed Bookings" },
    { metric: "4 States", category: "Active Destinations" },
    { metric: "4.9 ★", category: "Client Satisfaction" }
  ];

  return (
    <main style={{ minHeight: "100vh", display: "flex", backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", margin: 0, padding: 0, boxSizing: "border-box" }}>
      
      {/* LEFT COMPONENT COLUMN: PREMIUM LUXURY OPERATIONS BRAND CANVAS PANEL (60% Dynamic Layout Scale) */}
      <section style={{ flex: "1.5 1 60%;", background: "linear-gradient(135deg, #0d5c56 0%, #0f766e 50%, #115e59 100%)", padding: "48px 64px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", color: "#ffffff" }}>
        
        {/* Ambient Radial Luxury Glow Backdrop Layer Matrix */}
        <div style={{ position: "absolute", top: "-20%", right: "-20%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

        {/* Global Operations App Corporate Identity Header Block */}
        <div style={{ zIndex: 10, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span style={{ fontSize: "22px", letterSpacing: "0.05em", color: "#ccfbf1" }}>🧭</span>
            <h2 style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0, color: "#ffffff" }}>South Trails</h2>
          </div>
          <span style={{ display: "block", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", color: "#2dd4bf", backgroundColor: "rgba(45,212,191,0.12)", padding: "4px 10px", borderRadius: "4px", width: "fit-content" }}>
            Travel Management Console
          </span>
          <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em", margin: "28px 0 12px 0", lineHeight: "1.2" }}>
            Orchestrate Premium Journeys <br />Across South India.
          </h1>
          <p style={{ margin: 0, fontSize: "15px", color: "#ccfbf1", opacity: 0.85, maxWidth: "520px", lineHeight: "1.5" }}>
            Secure centralized enterprise dashboard interface access. Monitor live client cohorts tracking, approve travel manifests, update inventory metrics datasets, and audit regional performance markers effortlessly.
          </p>
        </div>

        {/* Operational Scope Feature Grid Cards Block (Glassmorphism Framework Architecture) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px", margin: "40px 0", zIndex: 10, position: "relative" }}>
          {operationalFeatures.map((feat, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: hoveredCard === index ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "20px",
                transform: hoveredCard === index ? "translateY(-2px)" : "none",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "18px", backgroundColor: "rgba(255,255,255,0.08)", padding: "6px", borderRadius: "6px", display: "inline-flex" }}>{feat.icon}</span>
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#ffffff", letterSpacing: "-0.01em" }}>{feat.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: "12px", color: "#ccfbf1", opacity: 0.8, lineHeight: "1.5" }}>{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Real-time Institutional Key Performance Indicators (KPI) Footer Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "24px", zIndex: 10, position: "relative" }}>
          {operationalKPIs.map((kpi, index) => (
            <div key={index}>
              <span style={{ display: "block", fontSize: "20px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>{kpi.metric}</span>
              <span style={{ fontSize: "11px", color: "#2dd4bf", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.03em" }}>{kpi.category}</span>
            </div>
          ))}
        </div>

      </section>

      {/* RIGHT COMPONENT COLUMN: SECURE INTERACTIVE LOGIN CREDENTIALS FORM PORTAL (40% Dynamic Layout Scale) */}
      <section style={{ flex: "1 1 40%", backgroundColor: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "48px 56px", boxSizing: "border-box" }}>
        
        {/* Dynamic Structural Operational Status Alignment Node Element */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#f0fdfa", padding: "6px 12px", borderRadius: "20px", border: "1px solid #ccfbf1" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#14b8a6", display: "inline-block" }} />
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.05em" }}>Node Network Gateway: Active</span>
          </div>
        </div>

        {/* Main Cryptographic Sign-In Form Frame Block */}
        <div style={{ maxWidth: "380px", width: "100%", margin: "0 auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.03em" }}>South Trails Admin</h1>
            <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#64748b" }}>Secure Corporate Architecture Management Portal</p>
          </div>

          {/* Internal Trigger Fallback Error Diagnostics Block */}
          {errorMessage && (
            <div style={{ padding: "12px 16px", backgroundColor: "#fef2f2", borderLeft: "4px solid #ef4444", borderRadius: "6px", color: "#991b1b", fontSize: "13px", fontWeight: "500", marginBottom: "20px" }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignInSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Username Electronic Mail Address Label Parameter Node */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="admin-email" style={{ fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Corporate Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "11px", fontSize: "14px", color: "#94a3b8" }}>✉️</span>
                <input
                  id="admin-email"
                  type="email"
                  placeholder="name@southtrails.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMessage(""); }}
                  style={{ width: "100%", padding: "10px 14px 10px 38px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none", backgroundColor: "#ffffff" }}
                />
              </div>
            </div>

            {/* Cryptographic Entry Password Field Stack Label Parameter Node */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="admin-pass" style={{ fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Secure Access Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "11px", fontSize: "14px", color: "#94a3b8" }}>🔑</span>
                <input
                  id="admin-pass"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMessage(""); }}
                  style={{ width: "100%", padding: "10px 42px 10px 38px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none", backgroundColor: "#ffffff" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "10px", border: "none", backgroundColor: "transparent", color: "#64748b", fontSize: "12px", fontWeight: "600", cursor: "pointer", padding: 0 }}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Contextual Remember-Me Framework Toggle Controls Layer Row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", marginTop: "4px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569", cursor: "pointer", fontWeight: "500" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: "15px", height: "15px", accentColor: "#0f766e", cursor: "pointer" }}
                />
                Remember workspace token
              </label>
              <button
                type="button"
                onClick={() => alert("Administrative access resets require contacting your localized organizational security operations manager.")}
                onMouseEnter={() => setIsForgotHovered(true)}
                onMouseLeave={() => setIsForgotHovered(false)}
                style={{ border: "none", backgroundColor: "transparent", color: isForgotHovered ? "#0d5c56" : "#0f766e", fontWeight: "600", cursor: "pointer", fontSize: "13px", padding: 0, textDecoration: isForgotHovered ? "underline" : "none" }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Core Sign-In Operation Form Transmission Command Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: isSubmitting ? "#115e59" : isBtnHovered ? "#0d5c56" : "#0f766e",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "14px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: isBtnHovered ? "0 4px 12px rgba(15, 118, 110, 0.25)" : "0 2px 4px rgba(0,0,0,0.02)",
                transition: "all 0.15s ease-in-out",
                marginTop: "8px"
              }}
            >
              {isSubmitting ? "Verifying Token Records..." : "Sign Into Admin Workspace"}
            </button>

          </form>

          {/* Secure Administrative Structural Infrastructure Reassurance Information Unit */}
          <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 14px", marginTop: "28px", backgroundColor: "#f8fafc", display: "flex", gap: "10px" }}>
            <span style={{ fontSize: "14px" }}>🛡️</span>
            <div>
              <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#334155", textTransform: "uppercase" }}>Encrypted Layer Protection</span>
              <span style={{ display: "block", fontSize: "11px", color: "#64748b", marginTop: "2px", lineHeight: "1.3" }}>
                Session authorizations utilize role-based credentials variables mapping blocks. All activities are parsed via corporate security registers logs.
              </span>
            </div>
          </div>
        </div>

        {/* Form Column Module Layout Standard Footer Unit */}
        <footer style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", fontWeight: "500", letterSpacing: "0.02em" }}>
            &copy; 2026 South Trails Ltd. All rights reserved. <br />
            <span style={{ color: "#cbd5e1" }}>Enterprise Systems Core Infrastructure Console</span>
          </p>
        </footer>

      </section>

    </main>
  );
};

export default AdminLogin;