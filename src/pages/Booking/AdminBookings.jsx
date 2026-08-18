import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/Toast";
import { deleteBooking, getBookings, updateBookingStatus } from "../../services/bookingService";

const fallbackBookings = [
  { id: "BK-8831", customerName: "Janani Iyer", package: "Kerala Explorer", travelDate: "2026-06-07", travelers: 2, amount: 59998, status: "Pending", registeredAt: "10 mins ago" },
  { id: "BK-8829", customerName: "Rahul Sharma", package: "Ooty Family Escape", travelDate: "2026-06-12", travelers: 4, amount: 119992, status: "Confirmed", registeredAt: "2 hours ago" },
  { id: "BK-8825", customerName: "Priya Nair", package: "Coorg Escape", travelDate: "2026-06-20", travelers: 3, amount: 74997, status: "Cancelled", registeredAt: "1 day ago" },
  { id: "BK-8791", customerName: "Arun Venkat", package: "Tirupati Tour", travelDate: "2026-05-28", travelers: 2, amount: 30000, status: "Completed", registeredAt: "1 week ago" },
  { id: "BK-8840", customerName: "Deepak Rao", package: "Backwater Experience", travelDate: "2026-07-01", travelers: 5, amount: 149995, status: "Pending", registeredAt: "Just now" },
  { id: "BK-8812", customerName: "Meera Krishnan", package: "Mysore Palace Heritage", travelDate: "2026-06-08", travelers: 2, amount: 45000, status: "Confirmed", registeredAt: "4 hours ago" }
];

const AdminBookings = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Unified State Engine for Booking Workspace
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Dynamic Hover System States
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredPill, setHoveredPill] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    let active = true;

    const loadBookings = async () => {
      setLoadingBookings(true);
      const data = await getBookings();
      if (!active) return;
      const mapped = data.map((booking) => {
        const request = (() => {
          try {
            return booking.specialRequest ? JSON.parse(booking.specialRequest) : {};
          } catch {
            return {};
          }
        })();
        return {
          id: booking.id,
          customerName: booking.customer?.name || booking.customers?.name || request.travelerName || booking.customerName || "Guest Traveler",
          package: booking.packageName || booking.package_snapshot?.title || booking.packageSnapshot?.title || booking.package?.title || "Travel Package",
          travelDate: booking.travelDate || booking.travel_date || "Flexible",
          travelers: Number(booking.travelers || 1),
          amount: Number(booking.totalAmount || booking.total_amount || 0),
          status: booking.status || "Pending",
          registeredAt: booking.createdAt ? new Date(booking.createdAt).toLocaleDateString("en-IN") : "Just now",
        };
      });
      setBookings(mapped.length ? mapped : fallbackBookings);
      setLoadingBookings(false);
    };

    loadBookings();
    return () => {
      active = false;
    };
  }, []);

  // Operational State Matrix Actions
  const handleUpdateStatus = async (id, nextStatus) => {
    const previous = bookings;
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: nextStatus } : b));
    const result = await updateBookingStatus(id, nextStatus);
    if (result?.error) {
      setBookings(previous);
      showToast("Unable to update booking status.", "error");
    }
  };

  const handleDeleteBooking = (id) => {
    setPendingDeleteId(id);
  };

  const confirmDeleteBooking = () => {
    const id = pendingDeleteId;
    if (!id) return;
    setPendingDeleteId(null);
    const previous = bookings;
    setBookings(prev => prev.filter(b => b.id !== id));
    deleteBooking(id).then((result) => {
      if (result?.error) {
        setBookings(previous);
        showToast("Unable to delete booking.", "error");
        return;
      }
      showToast(`Booking ${id} deleted.`, "success");
    });
  };

  // Metric Computations Engine
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === "Pending").length;
  const confirmedCount = bookings.filter(b => b.status === "Confirmed").length;
  const completedCount = bookings.filter(b => b.status === "Completed").length;
  const totalRevenue = bookings.filter(b => b.status !== "Cancelled").reduce((sum, b) => sum + b.amount, 0);

  // Search & Filtration Processor
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Initials Extractor for Modern Avatars
  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "BK";
  };

  // Status Style Evaluation Mapping
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return { bg: "#f0fdf4", color: "#064e3b", border: "#d8efe5" };
      case "Confirmed": return { bg: "#f0fdf4", color: "#16a34a", border: "#dcfce7" };
      case "Completed": return { bg: "#f0fdf4", color: "#0b6b43", border: "#d8efe5" };
      case "Cancelled": return { bg: "#f0fdf4", color: "#064e3b", border: "#f0fdf4" };
      default: return { bg: "#ffffff", color: "#35705c", border: "#afd6c3" };
    }
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#ffffff", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      {/* Premium Hub Sidebar Navigation Component */}
      <aside style={{ width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #d8efe5", position: "fixed", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px 24px", zIndex: 100 }}>
        <div>
          <div style={{ paddingBottom: "32px", borderBottom: "1px solid #f0fdf4" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f766e", margin: 0, letterSpacing: "-0.025em" }}>SOUTH TRAILS</h2>
            <p style={{ fontSize: "12px", color: "#35705c", margin: "4px 0 0 0", fontWeight: "500", letterSpacing: "0.05em", textTransform: "uppercase" }}>Booking Admin Deck</p>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Link to="/admin/dashboard" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#35705c", fontWeight: "500", fontSize: "14px" }}>Dashboard</Link>
            <Link to="/admin/packages" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#35705c", fontWeight: "500", fontSize: "14px" }}>Packages</Link>
            <Link to="/admin/customers" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#35705c", fontWeight: "500", fontSize: "14px" }}>Customers</Link>
            <Link to="/admin/bookings" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", backgroundColor: "#f0fdfa", color: "#0f766e", fontWeight: "600", fontSize: "14px" }}>Bookings</Link>
            <Link to="/admin/users" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#35705c", fontWeight: "500", fontSize: "14px" }}>Users</Link>
            <Link to="/admin/ecosystem" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#35705c", fontWeight: "500", fontSize: "14px" }}>Ecosystem</Link>
            <Link to="/admin/reviews" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#35705c", fontWeight: "500", fontSize: "14px" }}>Reviews</Link>
            <Link to="/admin/analytics" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#35705c", fontWeight: "500", fontSize: "14px" }}>Analytics</Link>
            <Link to="/admin/kanban" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#35705c", fontWeight: "500", fontSize: "14px" }}>Kanban Board</Link>
          </nav>
        </div>

        <div style={{ borderTop: "1px solid #f0fdf4", paddingTop: "24px" }}>
          <button 
            onClick={() => navigate("/admin/login")}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "8px", border: "1px solid #d8efe5", backgroundColor: "#ffffff", color: "#064e3b", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}
          >
            Exit Workspace
          </button>
        </div>
      </aside>

      {/* Primary Dashboard Management Canvas Workspace */}
      <main style={{ marginLeft: "260px", flex: 1, padding: "40px 48px", boxSizing: "border-box", overflowX: "hidden" }}>
        
        {/* Module Title Deck */}
        {pendingDeleteId && (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", backgroundColor: "rgba(15, 23, 42, 0.36)", padding: "1rem" }}>
            <div style={{ width: "min(420px, 100%)", backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 24px 80px rgba(15,23,42,0.24)" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#022c22" }}>Delete booking?</h3>
              <p style={{ margin: "0 0 20px 0", color: "#35705c", lineHeight: 1.5 }}>This removes booking register entry {pendingDeleteId}.</p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={() => setPendingDeleteId(null)} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #afd6c3", background: "#ffffff", color: "#164e36", fontWeight: 600 }}>Cancel</button>
                <button type="button" onClick={confirmDeleteBooking} style={{ padding: "10px 16px", borderRadius: "8px", border: "none", background: "#064e3b", color: "#ffffff", fontWeight: 700 }}>Delete</button>
              </div>
            </div>
          </div>
        )}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#022c22", margin: 0, letterSpacing: "-0.025em" }}>Booking Control Center</h1>
          <p style={{ fontSize: "15px", color: "#35705c", margin: "6px 0 0 0" }}>Track, allocate, approve and audit operational passenger booking registers.</p>
        </div>

        {/* Scalable Executive High-Impact KPI Performance Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "32px" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#35705c", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Bookings</span>
            <p style={{ margin: "10px 0 0 0", fontSize: "26px", fontWeight: "800", color: "#022c22" }}>{totalBookingsCount}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "20px", borderLeft: "3px solid #0f766e", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pending Approval</span>
            <p style={{ margin: "10px 0 0 0", fontSize: "26px", fontWeight: "800", color: "#022c22" }}>{pendingCount}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "20px", borderLeft: "3px solid #16a34a", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Confirmed Trips</span>
            <p style={{ margin: "10px 0 0 0", fontSize: "26px", fontWeight: "800", color: "#022c22" }}>{confirmedCount}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "20px", borderLeft: "3px solid #064e3b", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#064e3b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Cancelled Trips</span>
            <p style={{ margin: "10px 0 0 0", fontSize: "26px", fontWeight: "800", color: "#022c22" }}>{bookings.filter(b => b.status === "Cancelled").length}</p>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "20px", borderLeft: "3px solid #0f766e", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pipeline Revenue</span>
            <p style={{ margin: "10px 0 0 0", fontSize: "24px", fontWeight: "800", color: "#0f766e" }}>₹{totalRevenue.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Structured Workflow Pipeline Progression Indicator Map */}
        <section style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "20px 24px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#0f766e" }}></div>
            <div>
              <span style={{ fontSize: "12px", color: "#35705c", fontWeight: "500", textTransform: "uppercase" }}>Queue Intake</span>
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#022c22" }}>{pendingCount} Pending Approval</h4>
            </div>
          </div>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#d8efe5", minWidth: "20px" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#16a34a" }}></div>
            <div>
              <span style={{ fontSize: "12px", color: "#35705c", fontWeight: "500", textTransform: "uppercase" }}>Allocation Block</span>
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#022c22" }}>{confirmedCount} Confirmed Rosters</h4>
            </div>
          </div>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#d8efe5", minWidth: "20px" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#0b6b43" }}></div>
            <div>
              <span style={{ fontSize: "12px", color: "#35705c", fontWeight: "500", textTransform: "uppercase" }}>Deployment Ledger</span>
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#022c22" }}>{completedCount} Completed Trips</h4>
            </div>
          </div>
        </section>

        {/* Global Filter Matrix and Real-time Live Search Strip */}
        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          
          {/* Status Segment Filtering Cluster */}
          <div style={{ display: "flex", backgroundColor: "#d8efe5", padding: "4px", borderRadius: "8px", gap: "2px" }}>
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                onMouseEnter={() => setHoveredPill(status)}
                onMouseLeave={() => setHoveredPill(null)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: statusFilter === status ? "#ffffff" : hoveredPill === status ? "rgba(255,255,255,0.4)" : "transparent",
                  color: statusFilter === status ? "#0f766e" : "#2f6b52",
                  fontWeight: statusFilter === status ? "700" : "600",
                  fontSize: "13px",
                  cursor: "pointer",
                  boxShadow: statusFilter === status ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Targeted Query Stream Processing Input */}
          <div style={{ position: "relative", width: "100%", maxWidth: "360px" }}>
            <span style={{ position: "absolute", left: "14px", top: "11px", color: "#6f9986", fontSize: "14px" }}>🔍</span>
            <input
              type="text"
              placeholder="Search via client, package name or manifest ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 38px",
                borderRadius: "8px",
                border: "1px solid #afd6c3",
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
        </section>

        {/* Main Work Split Grid Canvas: Dual Architectural Column Layout */}
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>
          
          {/* Core Left Column Block: Reactive Dynamic Booking Registry Card Feed */}
          <div style={{ flex: "2 1 600px", display: "flex", flexDirection: "column", gap: "18px" }}>
            {loadingBookings && (
              <div style={{ textAlign: "center", padding: "32px 24px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", color: "#35705c", fontWeight: "600" }}>
                Loading booking manifests...
              </div>
            )}
            
            {!loadingBookings && filteredBookings.map((booking) => {
              const statusTheme = getStatusStyle(booking.status);
              return (
                <div
                  key={booking.id}
                  onMouseEnter={() => setHoveredCard(booking.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #d8efe5",
                    padding: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                    boxShadow: hoveredCard === booking.id ? "0 4px 20px -2px rgba(15, 118, 110, 0.05)" : "0 1px 2px rgba(0,0,0,0.01)",
                    transform: hoveredCard === booking.id ? "translateY(-1px)" : "none",
                    transition: "all 0.2s ease-in-out"
                  }}
                >
                  
                  {/* Informational Identity Alignment Parameter */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: "1 1 240px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#f0fdfa", color: "#0f766e", border: "1px solid #ccfbf1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>
                      {getInitials(booking.customerName)}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#022c22" }}>{booking.customerName}</h4>
                        <span style={{ fontSize: "11px", color: "#6f9986", fontWeight: "600", backgroundColor: "#f0fdf4", padding: "2px 6px", borderRadius: "4px" }}>{booking.id}</span>
                      </div>
                      <p style={{ margin: "4px 0 0 0", fontSize: "14px", fontWeight: "600", color: "#0f766e" }}>{booking.package}</p>
                    </div>
                  </div>

                  {/* Context Metrics Schedule Metadata Layer */}
                  <div style={{ display: "flex", gap: "24px", flex: "1 1 200px" }}>
                    <div>
                      <span style={{ display: "block", fontSize: "10px", color: "#6f9986", fontWeight: "600", textTransform: "uppercase" }}>Departure Date</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#164e36" }}>{booking.travelDate}</span>
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "10px", color: "#6f9986", fontWeight: "600", textTransform: "uppercase" }}>Party Manifest</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#164e36" }}>{booking.travelers} Travelers</span>
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "10px", color: "#6f9986", fontWeight: "600", textTransform: "uppercase" }}>Gross Billing</span>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#022c22" }}>₹{booking.amount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Reactive Structural Interactive Control Deck */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "flex-end", flex: "1 1 220px" }}>
                    
                    {/* Integrated Dynamic Contextual Badging Element */}
                    <span style={{ backgroundColor: statusTheme.bg, color: statusTheme.color, border: `1px solid ${statusTheme.border}`, padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                      {booking.status}
                    </span>

                    {/* Operational Micro-Command Button State Split Actions */}
                    <div style={{ display: "flex", gap: "6px" }}>
                      {booking.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(booking.id, "Confirmed")}
                            onMouseEnter={() => setHoveredBtn(`apr-${booking.id}`)}
                            onMouseLeave={() => setHoveredBtn(null)}
                            style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: hoveredBtn === `apr-${booking.id}` ? "#115e59" : "#0f766e", color: "#ffffff", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "background 0.15s" }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(booking.id, "Cancelled")}
                            onMouseEnter={() => setHoveredBtn(`rej-${booking.id}`)}
                            onMouseLeave={() => setHoveredBtn(null)}
                            style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #d8efe5", backgroundColor: hoveredBtn === `rej-${booking.id}` ? "#f0fdf4" : "#ffffff", color: "#064e3b", fontSize: "12px", fontWeight: "500", cursor: "pointer", transition: "all 0.15s" }}
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {booking.status === "Confirmed" && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, "Completed")}
                          onMouseEnter={() => setHoveredBtn(`cmp-${booking.id}`)}
                          onMouseLeave={() => setHoveredBtn(null)}
                          style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #afd6c3", backgroundColor: hoveredBtn === `cmp-${booking.id}` ? "#f0fdf4" : "#ffffff", color: "#0b6b43", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s" }}
                        >
                          Complete Tour
                        </button>
                      )}

                      {booking.status === "Cancelled" && (
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          onMouseEnter={() => setHoveredBtn(`del-${booking.id}`)}
                          onMouseLeave={() => setHoveredBtn(null)}
                          style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #f0fdf4", backgroundColor: hoveredBtn === `del-${booking.id}` ? "#f0fdf4" : "#ffffff", color: "#064e3b", fontSize: "12px", cursor: "pointer", transition: "all 0.15s" }}
                        >
                          Purge File
                        </button>
                      )}

                      <button
                        onClick={() => showToast(`Opening booking details for ${booking.id}.`, "info")}
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #afd6c3", backgroundColor: "#ffffff", color: "#2f6b52", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
                      >
                        Details
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}

            {/* Comprehensive Edge-Case Empty State Interface Matrix Fallback */}
            {!loadingBookings && filteredBookings.length === 0 && (
              <div style={{ textAlign: "center", padding: "56px 24px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px dashed #afd6c3" }}>
                <p style={{ margin: 0, fontSize: "14px", color: "#35705c", fontWeight: "600" }}>No manifest allocations matched current criteria filter matrices.</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6f9986" }}>Try adjusting filter segments or broadening structural search terms strings.</p>
              </div>
            )}

          </div>

          {/* Right Column Core Section: Analytics, Operations Feeds, Calendars */}
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Context Module Mini-Analytics Component Card */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.01)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "700", color: "#022c22" }}>Revenue Breakdown Summary</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#35705c" }}>Today's Cleared Inflow</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#022c22" }}>₹59,998</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#35705c" }}>Monthly Forecast Pipeline</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#022c22" }}>₹14,85,000</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #f0fdf4" }}>
                  <span style={{ fontSize: "13px", color: "#35705c" }}>Avg Ticket Allocation</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f766e" }}>₹71,200</span>
                </div>
              </div>
            </div>

            {/* Travel Dispatch Operational Calendar Timeline Cluster */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.01)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "700", color: "#022c22" }}>Upcoming Departures Timeline</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ borderLeft: "2px solid #0b6b43", paddingLeft: "14px", position: "relative" }}>
                  <span style={{ display: "block", fontSize: "11px", color: "#0b6b43", fontWeight: "700", textTransform: "uppercase" }}>Tomorrow Departure</span>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#022c22", display: "block", margin: "2px 0" }}>Kerala Explorer</span>
                  <span style={{ fontSize: "12px", color: "#35705c" }}>2 Travelers Managed via Janani Iyer</span>
                </div>
                <div style={{ borderLeft: "2px solid #35705c", paddingLeft: "14px", position: "relative" }}>
                  <span style={{ display: "block", fontSize: "11px", color: "#35705c", fontWeight: "700", textTransform: "uppercase" }}>This Upcoming Week</span>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#022c22", display: "block", margin: "2px 0" }}>Ooty Family Escape</span>
                  <span style={{ fontSize: "12px", color: "#35705c" }}>4 Travelers Managed via Rahul Sharma</span>
                </div>
              </div>
            </div>

            {/* Modern Auditing System Live Real-time Activity Feed Module */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d8efe5", padding: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.01)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "700", color: "#022c22" }}>Live Register Operations Feed</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "13px", color: "#164e36", paddingBottom: "10px", borderBottom: "1px solid #f0fdf4" }}>
                  🟢 <strong style={{ color: "#022c22" }}>Janani Iyer</strong> configured ticket allocation <span style={{ color: "#0f766e", fontWeight: "600" }}>Kerala Explorer</span>.
                </div>
                <div style={{ fontSize: "13px", color: "#164e36", paddingBottom: "10px", borderBottom: "1px solid #f0fdf4" }}>
                  ✓ <strong style={{ color: "#022c22" }}>Rahul Sharma</strong> booking clearance updated to confirmed status.
                </div>
                <div style={{ fontSize: "13px", color: "#164e36" }}>
                  ❌ <strong style={{ color: "#022c22" }}>Priya Nair</strong> requested itinerary cancellation trigger flags.
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminBookings;
