
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import { getPackages } from "../../services/packageService";
import { getCustomers } from "../../services/customerService";
import { getBookings } from "../../services/bookingService";
import { getReviews } from "../../services/reviewService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AdminContext);
  const [stats, setStats] = useState([
    { label: "Total Packages", value: "0" },
    { label: "Total Customers", value: "0" },
    { label: "Total Bookings", value: "0" },
    { label: "Total Revenue", value: "₹0" }
  ]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [hoveredKpi, setHoveredKpi] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);

  // Dynamic Greeting Based on Time of Day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning Admin";
    if (hour < 18) return "Good Afternoon Admin";
    return "Good Evening Admin";
  };

  useEffect(() => {
    const loadDashboardMetrics = async () => {
      try {
        const [packages, customers, bookings] = await Promise.all([
          getPackages(),
          getCustomers(),
          getBookings()
        ]);

        const totalRevenue = bookings.reduce(
          (sum, booking) => sum + Number(booking.totalAmount || booking.total_amount || booking.amount || 0),
          0
        );

        setStats([
          { label: "Total Packages", value: packages.length.toString() },
          { label: "Total Customers", value: customers.length.toString() },
          { label: "Total Bookings", value: bookings.length.toString() },
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}` }
        ]);

        setRecentBookings(bookings.slice(0, 5).map((booking) => ({
          id: booking.id,
          customer: booking.customer?.name || booking.customer_name || booking.name || "Guest",
          package: booking.packageName || booking.package_snapshot?.title || booking.packages?.title || booking.package || "Package Deal",
          status: booking.status || "Pending",
          date: booking.createdAt || booking.created_at
            ? new Date(booking.createdAt || booking.created_at).toISOString().split("T")[0]
            : booking.date || "-"
        })));
      } catch (error) {
        console.error("Error loading dashboard metrics:", error);
      }

      try {
        const reviewsData = await getReviews();
        if (reviewsData && reviewsData.length) {
          setReviews(reviewsData.slice(0, 3));
        } else {
          setReviews([
            { userName: "Aravind Swamy", packageName: "Kerala Backwaters Premium Escape", rating: 5, review: "An exceptional and seamless luxury travel experience. Highly recommended!" },
            { userName: "Meera Nair", packageName: "Ooty Misty Hills Getaway", rating: 4, review: "Beautiful resort properties and great hospitality throughout the trails." }
          ]);
        }
      } catch (e) {
        console.error("Error loading reviews:", e);
        setReviews([
          { userName: "Aravind Swamy", packageName: "Kerala Backwaters Premium Escape", rating: 5, review: "An exceptional and seamless luxury travel experience. Highly recommended!" },
          { userName: "Meera Nair", packageName: "Ooty Misty Hills Getaway", rating: 4, review: "Beautiful resort properties and great hospitality throughout the trails." }
        ]);
      }
    };

    loadDashboardMetrics();
  }, []);

  // Mock Timeline Data
  const activityTimeline = [
    { id: 1, text: "New booking created by Rohan Sharma", time: "2 mins ago" },
    { id: 2, text: "Customer Dr. Priya Pillai registered", time: "1 hour ago" },
    { id: 3, text: "Review submitted for Hampi Heritage Trail", time: "3 hours ago" },
    { id: 4, text: "Package 'Wayanad Wilderness' updated by system", time: "Yesterday" }
  ];

  // Helper for Status Badges
  const getStatusBadgeStyle = (status) => {
    const formattedStatus = status.toLowerCase();
    if (formattedStatus === "confirmed" || formattedStatus === "green") {
      return { backgroundColor: "#dcfce7", color: "#15803d" };
    }
    if (formattedStatus === "cancelled" || formattedStatus === "red") {
      return { backgroundColor: "#fee2e2", color: "#dc2626" };
    }
    return { backgroundColor: "#fef3c7", color: "#b45309" }; // Amber/Pending
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      
      {/* Fixed Sidebar */}
      <aside style={{ width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", position: "fixed", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px 24px", zIndex: 100 }}>
        <div>
          <div style={{ paddingBottom: "32px", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f766e", margin: 0, letterSpacing: "-0.025em" }}>SOUTH TRAILS</h2>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0 0", fontWeight: "500", letterSpacing: "0.05em", textTransform: "uppercase" }}>Premium Travel Admin</p>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Link to="/admin/dashboard" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", backgroundColor: "#f0fdfa", color: "#0f766e", fontWeight: "600", fontSize: "14px" }}>Dashboard</Link>
            <Link to="/admin/packages" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Packages</Link>
            <Link to="/admin/customers" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Customers</Link>
            <Link to="/admin/bookings" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Bookings</Link>
            <Link to="/admin/kanban" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Kanban Board</Link>
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

      {/* Main Content Area */}
      <main style={{ marginLeft: "260px", flex: 1, padding: "40px 48px", minHeight: "100vh", boxSizing: "border-box" }}>
        
        {/* Section 1: Welcome Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.025em" }}>{getGreeting()}</h1>
          <p style={{ fontSize: "15px", color: "#64748b", margin: "6px 0 0 0" }}>Manage South Trails from one place.</p>
        </div>

        {/* Section 2: KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredKpi(index)}
              onMouseLeave={() => setHoveredKpi(null)}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e2e8f0",
                borderLeft: `4px solid #14b8a6`,
                boxShadow: hoveredKpi === index ? "0 10px 15px -3px rgba(20, 184, 166, 0.1), 0 4px 6px -4px rgba(20, 184, 166, 0.1)" : "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                transform: hoveredKpi === index ? "translateY(-2px)" : "none",
                transition: "all 0.2s ease-in-out"
              }}
            >
              <p style={{ fontSize: "14px", fontWeight: "500", color: "#64748b", margin: "0 0 8px 0" }}>{stat.label}</p>
              <h3 style={{ fontSize: "26px", fontWeight: "700", color: "#0f766e", margin: 0 }}>{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Dual Column Layout for Secondary Content */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px", marginBottom: "40px", alignItems: "start" }}>
          
          {/* Left Column: Recent Bookings Table */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", margin: 0 }}>Recent Bookings</h3>
              <Link to="/admin/bookings" style={{ color: "#14b8a6", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>View All</Link>
            </div>
            
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <th style={{ padding: "12px 16px", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Customer</th>
                    <th style={{ padding: "12px 16px", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Package</th>
                    <th style={{ padding: "12px 16px", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                    <th style={{ padding: "12px 16px", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length > 0 ? (
                    recentBookings.map((booking) => (
                      <tr key={booking.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "16px", fontSize: "14px", color: "#0f172a", fontWeight: "500" }}>{booking.customer}</td>
                        <td style={{ padding: "16px", fontSize: "14px", color: "#475569" }}>{booking.package}</td>
                        <td style={{ padding: "16px" }}>
                          <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600", ...getStatusBadgeStyle(booking.status) }}>
                            {booking.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px", fontSize: "14px", color: "#64748b" }}>{booking.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: "24px", textAlignment: "center", color: "#64748b", fontSize: "14px" }}>No recent bookings found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Recent Activity Timeline */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", margin: "0 0 24px 0" }}>Recent Activity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
              {activityTimeline.map((item, index) => (
                <div key={item.id} style={{ display: "flex", gap: "16px", position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#14b8a6", border: "2px solid #ffffff", boxShadow: "0 0 0 2px #14b8a6", zIndex: 2 }} />
                    {index !== activityTimeline.length - 1 && (
                      <div style={{ width: "2px", flexGrow: 1, backgroundColor: "#e2e8f0", marginTop: "4px", marginBottom: "-12px" }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: "4px" }}>
                    <p style={{ fontSize: "14px", color: "#334155", margin: 0, fontWeight: "500" }}>{item.text}</p>
                    <span style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginTop: "2px" }}>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Latest Reviews Section */}
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", margin: "0 0 20px 0" }}>Latest Customer Reviews</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {reviews.map((rev, idx) => (
              <div key={idx} style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", margin: 0 }}>{rev.userName || rev.name || "Anonymous"}</h4>
                    <p style={{ fontSize: "13px", color: "#14b8a6", margin: "2px 0 0 0", fontWeight: "500" }}>{rev.packageName || rev.package}</p>
                  </div>
                  <div style={{ display: "flex", gap: "2px", backgroundColor: "#f0fdfa", padding: "4px 8px", borderRadius: "6px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#0f766e" }}>{rev.rating || rev.stars || 5}</span>
                    <span style={{ color: "#0f766e", fontSize: "12px" }}>★</span>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "#475569", margin: 0, lineHeight: "1.5", fontStyle: "italic" }}>
                  "{rev.review || rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Quick Actions */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", margin: "0 0 20px 0" }}>Quick Actions</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {[
              { label: "Add New Package", path: "/admin/packages/new" },
              { label: "Manage Packages", path: "/admin/packages" },
              { label: "View Customers", path: "/admin/customers" },
              { label: "View Bookings", path: "/admin/bookings" },
              { label: "Booking Kanban", path: "/admin/kanban" },
              { label: "View Reviews", path: "/admin/reviews" }
            ].map((action, idx) => (
              <Link
                key={idx}
                to={action.path}
                onMouseEnter={() => setHoveredAction(idx)}
                onMouseLeave={() => setHoveredAction(null)}
                style={{
                  display: "block",
                  backgroundColor: "#ffffff",
                  border: hoveredAction === idx ? "1px solid #14b8a6" : "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  textDecoration: "none",
                  boxShadow: hoveredAction === idx ? "0 4px 12px rgba(20, 184, 166, 0.08)" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  transform: hoveredAction === idx ? "translateY(-1px)" : "none",
                  transition: "all 0.2s ease-in-out"
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: "600", color: hoveredAction === idx ? "#0f766e" : "#334155" }}>
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
