import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import { getCustomers, deleteCustomer } from "../../services/customerService";

const AdminCustomers = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [customers, setCustomers] = useState([
    { id: "C-001", name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", package: "Tirupati Tour", travelDate: "2026-07-15", travelers: 2, status: "Active" },
    { id: "C-002", name: "Jane Smith", email: "jane@example.com", phone: "+91 87654 32109", package: "Coorg Coffee", travelDate: "2026-07-20", travelers: 4, status: "Active" },
    { id: "C-003", name: "Mike Johnson", email: "mike@example.com", phone: "+91 76543 21098", package: "Backwater Experience", travelDate: "2026-08-01", travelers: 3, status: "Active" },
    { id: "C-004", name: "Sarah Williams", email: "sarah@example.com", phone: "+91 65432 10987", package: "Mysore Palace Heritage", travelDate: "2026-07-25", travelers: 2, status: "Active" },
    { id: "C-005", name: "Tom Brown", email: "tom@example.com", phone: "+91 54321 09876", package: "Araku Valley Getaway", travelDate: "2026-08-10", travelers: 5, status: "Active" }
  ]);

  // UI Interactive Hover States
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await getCustomers();
      if (data && data.length > 0) {
        setCustomers(data);
      }
    };
    loadCustomers();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/admin/login");
    }
  }, [shouldRedirect, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleDeleteCustomer = async (id) => {
    if (!confirm("Are you sure you want to delete this customer record?")) return;
    const { error } = await deleteCustomer(id);
    if (error && error.message !== "Supabase not configured") {
      alert(error.message || "Unable to delete customer");
      return;
    }
    setCustomers(customers.filter(c => c.id !== id));
  };

  // Helper to extract customer initials for profile placeholders
  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "CU";
  };

  // Safe Dynamic Badge Status Engine
  const getStatusStyle = (status = "Active") => {
    const norm = status.toLowerCase();
    if (norm === "active" || norm === "confirmed") {
      return { bg: "#e6f4ea", color: "#137333" };
    } else if (norm === "pending") {
      return { bg: "#fef7e0", color: "#b06000" };
    } else {
      return { bg: "#fce8e6", color: "#c5221f" };
    }
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      
      {/* Premium Sidebar Navigation */}
      <aside style={{ width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", position: "fixed", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px 24px", zIndex: 100 }}>
        <div>
          <div style={{ paddingBottom: "32px", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f766e", margin: 0, letterSpacing: "-0.025em" }}>SOUTH TRAILS</h2>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0 0", fontWeight: "500", letterSpacing: "0.05em", textTransform: "uppercase" }}>Premium Travel Admin</p>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Link to="/admin/dashboard" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Dashboard</Link>
            <Link to="/admin/packages" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Packages</Link>
            <Link to="/admin/customers" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", backgroundColor: "#f0fdfa", color: "#0f766e", fontWeight: "600", fontSize: "14px" }}>Customers</Link>
            <Link to="/admin/bookings" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Bookings</Link>
            <Link to="/admin/reviews" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Reviews</Link>
            <Link to="/admin/analytics" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Analytics</Link>
          </nav>
        </div>

        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
          <button 
            onClick={() => { logout(); navigate("/admin/login"); }}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#dc2626", fontWeight: "600", fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Context Panel */}
      <main style={{ marginLeft: "260px", flex: 1, padding: "40px 48px", minHeight: "100vh", boxSizing: "border-box" }}>
        
        {/* Module Title Matrix */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.025em" }}>Customer Management</h1>
          <p style={{ fontSize: "15px", color: "#64748b", margin: "6px 0 0 0" }}>Manage travelers, corporate files, bookings and premium customer relationship tracking.</p>
        </div>

        {/* Executive High-Impact Statistics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", borderLeft: "4px solid #14b8a6", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)" }}>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Customers</p>
            <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: "700", color: "#0f172a" }}>{customers.length}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", borderLeft: "4px solid #0f766e", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)" }}>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Active Bookings</p>
            <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: "700", color: "#0f172a" }}>{customers.filter(c => c.status === "Active").length}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", borderLeft: "4px solid #14b8a6", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)" }}>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Travelers</p>
            <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: "700", color: "#0f172a" }}>{customers.reduce((sum, c) => sum + c.travelers, 0)}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", borderLeft: "4px solid #0f766e", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)" }}>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Potential Pipeline Revenue</p>
            <p style={{ margin: "8px 0 0 0", fontSize: "28px", fontWeight: "700", color: "#0f766e" }}>₹{(customers.length * 15000).toLocaleString()}</p>
          </div>
        </div>

        {/* Global Search Interface Control */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "16px 24px", marginBottom: "32px", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.01)" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ position: "absolute", left: "16px", color: "#94a3b8", fontSize: "16px", pointerEvents: "none" }}>🔍</span>
            <input
              type="text"
              placeholder="Search modern CRM directory via passenger name, corporate email, or telephone routing sequence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", paddingLeft: "44px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none", transition: "border-color 0.15s ease" }}
            />
          </div>
        </div>

        {/* Enterprise Client Profiles Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px", marginBottom: "48px" }}>
          {filteredCustomers.map((customer) => {
            const badge = getStatusStyle(customer.status);
            return (
              <div
                key={customer.id}
                onMouseEnter={() => setHoveredCard(customer.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: hoveredCard === customer.id ? "0 10px 25px -5px rgba(15, 118, 110, 0.06)" : "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
                  transform: hoveredCard === customer.id ? "translateY(-2px)" : "none",
                  transition: "all 0.2s ease-in-out"
                }}
              >
                <div>
                  {/* Card Profile Context Layout */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "46px", height: "46px", borderRadius: "50%", backgroundColor: "#f0fdfa", border: "1px solid #ccfbf1", color: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700" }}>
                        {getInitials(customer.name)}
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>{customer.name}</h4>
                        <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", letterSpacing: "0.02em" }}>ID: {customer.id}</span>
                      </div>
                    </div>
                    <span style={{ backgroundColor: badge.bg, color: badge.color, padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                      {customer.status}
                    </span>
                  </div>

                  {/* Core Demographics Contact Block */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "18px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#475569" }}>
                      <span style={{ color: "#94a3b8" }}>✉️</span> {customer.email}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#475569" }}>
                      <span style={{ color: "#94a3b8" }}>📞</span> {customer.phone}
                    </div>
                  </div>

                  {/* Curated Expedition Booking Info Block */}
                  <div style={{ backgroundColor: "#f8fafc", borderRadius: "8px", padding: "14px", marginBottom: "20px" }}>
                    <span style={{ display: "block", fontSize: "10px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Active Itinerary</span>
                    <span style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#0f766e", marginBottom: "8px" }}>{customer.package}</span>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2e8f0", paddingTop: "8px" }}>
                      <div>
                        <span style={{ display: "block", fontSize: "9px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Departure</span>
                        <span style={{ fontSize: "12px", fontWeight: "500", color: "#334155" }}>{customer.travelDate}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ display: "block", fontSize: "9px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Party Size</span>
                        <span style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>{customer.travelers} Pax</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secure Operational Controls Segment */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => alert(`Accessing comprehensive ledger & historic log parameters for ${customer.name}`)}
                    onMouseEnter={() => setHoveredBtn(`history-${customer.id}`)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: hoveredBtn === `history-${customer.id}` ? "#f8fafc" : "#ffffff", color: "#334155", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s" }}
                  >
                    View History
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    onMouseEnter={() => setHoveredBtn(`delete-${customer.id}`)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{ padding: "10px 14px", borderRadius: "6px", border: "1px solid #fecaca", backgroundColor: hoveredBtn === `delete-${customer.id}` ? "#fef2f2" : "#ffffff", color: "#dc2626", fontSize: "13px", cursor: "pointer", transition: "all 0.15s" }}
                  >
                    🗑️
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic Empty State Configuration Fallback */}
        {filteredCustomers.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 24px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px dashed #cbd5e1", marginBottom: "48px" }}>
            <p style={{ margin: 0, fontSize: "15px", color: "#64748b", fontWeight: "500" }}>No customer profiles matches standard indices for "{searchTerm}".</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>Verify indexing strategy or reset lookup string query parameter parameters.</p>
          </div>
        )}

        {/* Customer Intelligence Section */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "32px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.01)" }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>Recent Travelers</h3>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#64748b" }}>Live status track of the latest travelers deploying on verified South Indian custom expedition blocks.</p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {customers.slice(0, 5).map((c, index) => (
              <div key={`insight-${index}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "8px", backgroundColor: "#f8fafc", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>#{index + 1}</span>
                  <div>
                    <span style={{ fontWeight: "600", color: "#0f172a", fontSize: "14px" }}>{c.name}</span>
                    <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "12px" }}>Scheduled for: {c.package}</span>
                  </div>
                </div>
                <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>Departure date: {c.travelDate}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminCustomers;