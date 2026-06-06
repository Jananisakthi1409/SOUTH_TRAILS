import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminAnalytics = () => {
  const navigate = useNavigate();

  // Review Parsing and Business Metrics State Engine
  const [reviews, setReviews] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredTab, setHoveredTab] = useState(null);

  useEffect(() => {
    const localReviews = localStorage.getItem("southTrailsReviews");
    if (localReviews) {
      try {
        setReviews(JSON.parse(localReviews));
      } catch (e) {
        console.error("Error parsing structural review metrics:", e);
      }
    } else {
      // Mock production data fallback to guarantee visual optimization if empty
      const defaultReviews = [
        { id: "REV-01", rating: 5, package: "Kerala Explorer", date: "2026-06-05" },
        { id: "REV-02", rating: 5, package: "Ooty Family Escape", date: "2026-06-04" },
        { id: "REV-03", rating: 4, package: "Coorg Escape", date: "2026-06-02" },
        { id: "REV-04", rating: 5, package: "Mysore Palace Heritage", date: "2026-05-28" },
        { id: "REV-05", rating: 3, package: "Tirupati Tour", date: "2026-05-25" },
      ];
      setReviews(defaultReviews);
      localStorage.setItem("southTrailsReviews", JSON.stringify(defaultReviews));
    }
  }, []);

  // Review Calculations Engine
  const totalReviewsCount = reviews.length;
  const avgRating = totalReviewsCount > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1) 
    : "0.0";
  const countStars = (rating) => reviews.filter((r) => r.rating === rating).length;

  // Fixed Structural Mock Core BI Data Sets
  const kpiData = [
    { title: "Total Revenue", value: "₹24,89,500", growth: "+14.2%", trend: "up", label: "vs last month" },
    { title: "Total Bookings", value: "1,482", growth: "+8.6%", trend: "up", label: "vs last month" },
    { title: "Total Customers", value: "3,240", growth: "+22.1%", trend: "up", label: "vs last quarter" },
    { title: "Total Reviews", value: totalReviewsCount.toString(), growth: "+4.3%", trend: "up", label: "organic growth" },
    { title: "Avg Booking Value", value: "₹68,450", growth: "-1.8%", trend: "down", label: "vs last month" },
  ];

  const statePerformers = [
    { name: "Kerala", bookings: 642, revenue: "₹11,55,600", popularity: 88 },
    { name: "Tamil Nadu", bookings: 412, revenue: "₹6,98,400", popularity: 74 },
    { name: "Karnataka", bookings: 298, revenue: "₹4,12,000", popularity: 58 },
    { name: "Andhra Pradesh", bookings: 130, revenue: "₹2,23,500", popularity: 32 },
  ];

  const topPackages = [
    { name: "Kerala Explorer", bookings: 342, revenue: "₹6,15,600", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=cover&w=120&q=80" },
    { name: "Ooty Family Escape", bookings: 289, revenue: "₹5,18,400", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=cover&w=120&q=80" },
    { name: "Coorg Escape", bookings: 210, revenue: "₹3,98,000", img: "https://images.unsplash.com/photo-1626593510484-df0a19e1eef4?auto=format&fit=cover&w=120&q=80" },
    { name: "Mysore Palace Heritage", bookings: 145, revenue: "₹2,85,000", img: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=cover&w=120&q=80" },
    { name: "Araku Valley Getaway", bookings: 98, revenue: "₹1,85,000", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=cover&w=120&q=80" },
  ];

  return (
    <div style={{ display: "flex", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      {/* Premium Hub Sidebar Navigation Component */}
      <aside style={{ width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", position: "fixed", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px 24px", zIndex: 100 }}>
        <div>
          <div style={{ paddingBottom: "32px", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f766e", margin: 0, letterSpacing: "-0.025em" }}>SOUTH TRAILS</h2>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0 0", fontWeight: "500", letterSpacing: "0.05em", textTransform: "uppercase" }}>Corporate Intelligence Deck</p>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Link to="/admin/dashboard" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Dashboard</Link>
            <Link to="/admin/packages" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Packages</Link>
            <Link to="/admin/customers" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Customers</Link>
            <Link to="/admin/bookings" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Bookings</Link>
            <Link to="/admin/analytics" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", backgroundColor: "#f0fdfa", color: "#0f766e", fontWeight: "600", fontSize: "14px" }}>Analytics</Link>
          </nav>
        </div>

        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
          <button 
            onClick={() => navigate("/admin/login")}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#dc2626", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}
          >
            Exit Workspace
          </button>
        </div>
      </aside>

      {/* Main Structural BI Canvas Dashboard View */}
      <main style={{ marginLeft: "260px", flex: 1, padding: "40px 48px", boxSizing: "border-box" }}>
        
        {/* Module Master Header Deck & Performance Score Cluster */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px", marginBottom: "36px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.025em" }}>Business Analytics</h1>
            <p style={{ fontSize: "15px", color: "#64748b", margin: "6px 0 0 0" }}>Monitor bookings, localized operational revenue streams, client cohorts and distribution analytics.</p>
          </div>

          {/* Business System Health Progress Card Widget */}
          <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", minWidth: "260px", boxShadow: "0 1px 3px rgba(0,0,0,0.01)" }}>
            <div style={{ position: "relative", width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #14b8a6" }}>
              <span style={{ fontSize: "14px", fontWeight: "800", color: "#0f766e" }}>88%</span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Business Health Score</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>Excellent Performance</span>
            </div>
          </div>
        </div>

        {/* Overview Scalable Macro-KPI Performance Matrix Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "36px" }}>
          {kpiData.map((kpi, i) => (
            <div 
              key={i}
              onMouseEnter={() => setHoveredCard(`kpi-${i}`)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                padding: "24px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.01)",
                transform: hoveredCard === `kpi-${i}` ? "translateY(-2px)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.02em" }}>{kpi.title}</span>
              <p style={{ margin: "12px 0 6px 0", fontSize: "26px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em" }}>{kpi.value}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px", fontWeight: "700", color: kpi.trend === "up" ? "#16a34a" : "#dc2626" }}>
                  {kpi.trend === "up" ? "▲" : "▼"} {kpi.growth}
                </span>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>{kpi.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Financial Framework & Territorial Segment Allocations Grid Column System */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "32px", marginBottom: "36px", flexWrap: "wrap" }}>
          
          {/* Revenue Analytics Overview Component Card */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.01)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>Revenue Overview Matrix</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>Consolidated chronological ledger deployment parameters.</p>
              </div>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#0f766e", backgroundColor: "#f0fdfa", padding: "4px 12px", borderRadius: "6px" }}>Top Month: May 2026</span>
            </div>

            {/* Inflow Ledger Financial Timeline Matrix */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "20px", backgroundColor: "#f8fafc", borderRadius: "10px", marginBottom: "32px" }}>
              <div>
                <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Today's Cleared Inflow</span>
                <p style={{ margin: "4px 0 0 0", fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>₹59,998</p>
              </div>
              <div style={{ borderLeft: "1px solid #e2e8f0", paddingLeft: "16px" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>This Current Month</span>
                <p style={{ margin: "4px 0 0 0", fontSize: "20px", fontWeight: "700", color: "#0f172a" }}>₹3,84,500</p>
              </div>
              <div style={{ borderLeft: "1px solid #e2e8f0", paddingLeft: "16px" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Year-To-Date Aggregate</span>
                <p style={{ margin: "4px 0 0 0", fontSize: "20px", fontWeight: "700", color: "#0f766e" }}>₹24,89,500</p>
              </div>
            </div>

            {/* Geographical Regional Performance Breakdown Indexes */}
            <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.03em" }}>Top Performing States Rankings</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {statePerformers.map((state, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#94a3b8", width: "16px" }}>{index + 1}.</span>
                      <span style={{ color: "#0f172a" }}>{state.name} State Pack Allotments</span>
                    </div>
                    <div style={{ color: "#475569" }}>
                      <span>{state.bookings} Bookings</span>
                      <span style={{ margin: "0 12px", color: "#cbd5e1" }}>|</span>
                      <span style={{ color: "#0f172a", fontWeight: "700" }}>{state.revenue}</span>
                    </div>
                  </div>
                  {/* Performance Progress Standard Visualizer Bar */}
                  <div style={{ width: "100%", height: "6px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ width: `${state.popularity}%`, height: "100%", backgroundColor: "#14b8a6", borderRadius: "9999px" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Core Section Layout Widgets: Macro Trends & Review Analytics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            {/* Travel Operational Vectors Tendencies Card */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.01)" }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Expedition Travel Vectors Trends</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Peak Seasonal Booking Deployment</span>
                  <strong style={{ color: "#0f172a" }}>May / June Corridor</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Highly Preferred Tour Envelope</span>
                  <strong style={{ color: "#0f172a" }}>5 Days / 4 Nights Block</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid #f1f5f9", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Primary Inflow Epicenter</span>
                  <strong style={{ color: "#14b8a6" }}>Kerala Backwater Systems</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Latent Under-performing Vector</span>
                  <strong style={{ color: "#64748b" }}>Andhra Corporate Corridors</strong>
                </div>
              </div>
            </div>

            {/* Advanced Quantitative Customer Feedback Review Sentiment Matrix Card */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.01)" }}>
              <div style={{ display: "flex", justifyContext: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Sentiment Audit Review Matrix</h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px", padding: "14px", backgroundColor: "#f0fdfa", borderRadius: "8px" }}>
                <p style={{ margin: 0, fontSize: "36px", fontWeight: "800", color: "#0f766e" }}>{avgRating}</p>
                <div>
                  <div style={{ color: "#d97706", fontSize: "14px", fontWeight: "700" }}>★★★★★</div>
                  <span style={{ fontSize: "12px", color: "#475569" }}>Aggregate Sentiment out of {totalReviewsCount} Records</span>
                </div>
              </div>

              {/* Graphical Feedback Progression Indexes Bars Stack */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[5, 4, 3].map((star) => {
                  const count = countStars(star);
                  const percentage = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
                  return (
                    <div key={star} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px" }}>
                      <span style={{ width: "40px", color: "#475569", fontWeight: "600" }}>{star} Star</span>
                      <div style={{ flex: 1, height: "6px", backgroundColor: "#f1f5f9", borderRadius: "9999px", overflow: "hidden" }}>
                        <div style={{ width: `${percentage}%`, height: "100%", backgroundColor: "#0f766e" }}></div>
                      </div>
                      <span style={{ width: "24px", color: "#94a3b8", textAlign: "right" }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Most Booked Curated Expedition Itinerary Blocks Allocation Registry Layout */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "32px", marginBottom: "36px", boxShadow: "0 1px 3px rgba(0,0,0,0.01)" }}>
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>Volume Distribution: Top 5 Curated Itineraries</h3>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>Live manifest volume density indexes sorted by cross-billed financial metrics generation parameters.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {topPackages.map((pack, i) => (
              <div 
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  backgroundColor: hoveredRow === i ? "#f8fafc" : "#ffffff",
                  border: "1px solid #f1f5f9",
                  transition: "background 0.15s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <img src={pack.img} alt={pack.name} style={{ width: "48px", height: "36px", borderRadius: "4px", objectFit: "cover" }} />
                  <div>
                    <span style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>{pack.name}</span>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>Rank #{i + 1} System Deployment Allotment</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "48px", textAlign: "right" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", textTransform: "uppercase" }}>Bookings Register</span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>{pack.bookings} Units</span>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", textTransform: "uppercase" }}>Aggregate Volume Yield</span>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f766e" }}>{pack.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Cohort Parameters & Operational System Activity Dual Framework Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px" }}>
          
          {/* Customer Cohorts Analytical Framework Profile Matrix Card */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.01)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Traveller Profile Dynamics</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>Acquisition Mix Breakdown</span>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>New Profiles vs Re-enlisted Members</span>
                </div>
                <div style={{ fontSize: "13px", textAlign: "right" }}>
                  <span style={{ color: "#0f766e", fontWeight: "700" }}>74% New</span>
                  <span style={{ margin: "0 6px", color: "#cbd5e1" }}>/</span>
                  <span style={{ color: "#64748b", fontWeight: "600" }}>26% Return</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <span style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>Mean Operational Manifest Load</span>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>Average passengers counted per itinerary.</span>
                </div>
                <strong style={{ fontSize: "16px", color: "#334155" }}>3.4 Pax</strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", marginTop: "4px" }}>
                <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.03em" }}>High-Value Strategic Client Record</span>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a" }}>M/S Shreya Srivastav Corp Ledger</span>
                <span style={{ fontSize: "12px", color: "#64748b" }}>4 Active Bookings Registered Over 12 Months Matrix</span>
              </div>
            </div>
          </div>

          {/* Real-time System Infrastructure Log Events Dispatch Timeline Component */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.01)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>System Logs Operational Broadcast</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
              <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
                <span style={{ color: "#14b8a6" }}>📦</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>Manifest Generation Allocation Entry:</strong> Janani Iyer appended ledger matrix configuration for package <span style={{ color: "#0f766e", fontWeight: "600" }}>Kerala Explorer</span>.
                  <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>10 minutes ago</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
                <span style={{ color: "#0f766e" }}>★</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>Organic Review Metric Intake Added:</strong> 5-Star appraisal recorded dynamically mapping to sequence node record <span style={{ color: "#0f766e", fontWeight: "600" }}>Ooty Family Escape</span>.
                  <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>2 hours ago</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
                <span style={{ color: "#14b8a6" }}>🔧</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>Database Schema Object Update:</strong> Package matrix payload item <span style={{ color: "#475569" }}>"Kodaikanal Family Retreat"</span> adjusted via administrative deployment access token keys.
                  <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>Yesterday</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
                <span style={{ color: "#0f766e" }}>👤</span>
                <div>
                  <strong style={{ color: "#0f172a" }}>Security Registration Event:</strong> New passenger authentication ledger sequence established for corporate client file account allocation mapping profiles.
                  <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>2 days ago</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Real-time Actionable Executive Dynamic Insight Cards Segment */}
        <div style={{ marginTop: "36px", backgroundColor: "#f0fdfa", border: "1px solid #ccfbf1", borderRadius: "12px", padding: "24px" }}>
          <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "700", color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.05em" }}>⚡ Automated Executive Strategic Insights</h4>
          <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px", color: "#115e59", lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "6px" }}>
            <li><strong>Territorial Lead Margin:</strong> Kerala state destination targets generated the highest volumetric financial yield indexes this quarter segment loop.</li>
            <li><strong>Velocity Hotspot Alert:</strong> The <span style={{ textDecoration: "underline" }}>Coorg Escape</span> itinerary cluster retains an accelerated programmatic tracking baseline configuration index relative to standard seasonal projections.</li>
            <li><strong>Reputational Baseline Score:</strong> Core aggregate user satisfaction values stand validated at <strong style={{ color: "#0f766e" }}>{avgRating}/5.0</strong>, tracking perfectly against high-tier consumer travel industry criteria thresholds.</li>
          </ul>
        </div>

      </main>
    </div>
  );
};

export default AdminAnalytics;