import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAnalyticsOverview } from "../../services/analyticsService";

const formatMoney = (amount) => `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      const { data } = await getAnalyticsOverview();
      setAnalytics(data);
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  const totals = analytics?.totals || {};
  const stateRows = Object.entries(analytics?.bookingsByState || {});
  const statusRows = Object.entries(analytics?.bookingsByStatus || {});
  const monthRows = Object.entries(analytics?.bookingsByMonth || {});
  const revenueRows = Object.entries(analytics?.revenueByState || {});
  const sentimentRows = Object.entries(analytics?.sentimentSummary || {});
  const aiInsights = analytics?.aiInsights || analytics?.ai_insights || [];
  const topPackages = analytics?.topPackages || [];
  const recentBookings = analytics?.recentBookings || [];

  const kpiData = [
    { title: "Revenue", value: formatMoney(totals.revenue) },
    { title: "Bookings", value: Number(totals.bookings || 0).toLocaleString("en-IN") },
    { title: "Customers", value: Number(totals.customers || 0).toLocaleString("en-IN") },
    { title: "Packages", value: Number(totals.packages || 0).toLocaleString("en-IN") },
    { title: "Reviews", value: Number(totals.reviews || 0).toLocaleString("en-IN") },
  ];

  return (
    <div style={{ display: "flex", backgroundColor: "#ffffff", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <aside style={{ width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #d8efe5", position: "fixed", top: 0, bottom: 0, left: 0, padding: "32px 24px", zIndex: 100 }}>
        <div style={{ paddingBottom: "32px", borderBottom: "1px solid #f0fdf4" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f766e", margin: 0 }}>SOUTH TRAILS</h2>
          <p style={{ fontSize: "12px", color: "#35705c", margin: "4px 0 0 0", fontWeight: "500", letterSpacing: "0.05em", textTransform: "uppercase" }}>Live Analytics</p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
          <Link to="/admin/dashboard" style={navLink}>Dashboard</Link>
          <Link to="/admin/packages" style={navLink}>Packages</Link>
          <Link to="/admin/customers" style={navLink}>Customers</Link>
          <Link to="/admin/bookings" style={navLink}>Bookings</Link>
          <Link to="/admin/users" style={navLink}>Users</Link>
          <Link to="/admin/ecosystem" style={navLink}>Ecosystem</Link>
          <Link to="/admin/reviews" style={navLink}>Reviews</Link>
          <Link to="/admin/analytics" style={{ ...navLink, backgroundColor: "#f0fdfa", color: "#0f766e", fontWeight: "700" }}>Analytics</Link>
          <Link to="/admin/kanban" style={navLink}>Kanban Board</Link>
        </nav>

        <button type="button" onClick={() => navigate("/admin/login")} style={{ ...outlineButton, marginTop: "32px", width: "100%" }}>
          Exit Workspace
        </button>
      </aside>

      <main style={{ marginLeft: "260px", flex: 1, padding: "40px 48px", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#022c22", margin: 0 }}>Business Analytics</h1>
            <p style={{ fontSize: "15px", color: "#35705c", margin: "6px 0 0 0" }}>Real-time metrics from Spring Boot bookings, customers, packages, and reviews.</p>
          </div>
          <button type="button" onClick={() => window.location.reload()} style={primaryButton}>Refresh</button>
        </div>

        {loading ? (
          <div style={panel}>Loading analytics...</div>
        ) : (
          <>
            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "18px", marginBottom: "28px" }}>
              {kpiData.map((kpi) => (
                <article key={kpi.title} style={panel}>
                  <span style={{ fontSize: "12px", color: "#35705c", fontWeight: "700", textTransform: "uppercase" }}>{kpi.title}</span>
                  <p style={{ margin: "10px 0 0", fontSize: "26px", fontWeight: "800", color: "#022c22" }}>{kpi.value}</p>
                </article>
              ))}
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", marginBottom: "28px" }}>
              <article style={panel}>
                <h2 style={panelTitle}>Bookings By State</h2>
                {stateRows.length ? stateRows.map(([state, count]) => (
                  <MetricRow key={state} label={state} value={`${count} bookings`} max={totals.bookings || 1} count={count} />
                )) : <EmptyState text="No state booking data yet." />}
              </article>

              <article style={panel}>
                <h2 style={panelTitle}>Booking Status</h2>
                {statusRows.length ? statusRows.map(([status, count]) => (
                  <MetricRow key={status} label={status} value={`${count}`} max={totals.bookings || 1} count={count} />
                )) : <EmptyState text="No booking status data yet." />}
              </article>
            </section>

            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "28px" }}>
              <article style={panel}>
                <h2 style={panelTitle}>Monthly Demand</h2>
                {monthRows.length ? monthRows.map(([month, count]) => (
                  <MetricRow key={month} label={month} value={`${count} bookings`} max={totals.bookings || 1} count={count} />
                )) : <EmptyState text="No monthly trend data yet." />}
              </article>

              <article style={panel}>
                <h2 style={panelTitle}>Revenue By State</h2>
                {revenueRows.length ? revenueRows.map(([state, amount]) => (
                  <MetricRow key={state} label={state} value={formatMoney(amount)} max={totals.revenue || 1} count={amount} />
                )) : <EmptyState text="No revenue trend data yet." />}
              </article>

              <article style={panel}>
                <h2 style={panelTitle}>Review Sentiment</h2>
                {sentimentRows.length ? sentimentRows.map(([sentiment, count]) => (
                  <MetricRow key={sentiment} label={sentiment} value={`${count}`} max={totals.reviews || 1} count={count} />
                )) : <EmptyState text="No sentiment data yet." />}
              </article>
            </section>

            {aiInsights.length > 0 && (
              <section style={{ ...panel, marginBottom: "28px" }}>
                <h2 style={panelTitle}>AI Business Insights</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                  {aiInsights.map((insight) => (
                    <div key={insight} style={{ padding: "14px", borderRadius: "10px", background: "#f0fdfa", color: "#0f766e", fontWeight: 700, lineHeight: 1.45 }}>
                      {insight}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <article style={panel}>
                <h2 style={panelTitle}>Top Packages</h2>
                {topPackages.length ? topPackages.map((pkg, index) => (
                  <div key={pkg.id} style={listRow}>
                    <span style={rank}>{index + 1}</span>
                    <div>
                      <strong style={{ color: "#022c22" }}>{pkg.title}</strong>
                      <p style={{ margin: "4px 0 0", color: "#35705c", fontSize: "13px" }}>{pkg.state} · {pkg.bookings} bookings</p>
                    </div>
                  </div>
                )) : <EmptyState text="No package ranking yet." />}
              </article>

              <article style={panel}>
                <h2 style={panelTitle}>Recent Bookings</h2>
                {recentBookings.length ? recentBookings.map((booking) => (
                  <div key={booking.id} style={listRow}>
                    <span style={rank}>{booking.status?.slice(0, 1) || "B"}</span>
                    <div>
                      <strong style={{ color: "#022c22" }}>{booking.id}</strong>
                      <p style={{ margin: "4px 0 0", color: "#35705c", fontSize: "13px" }}>
                        {booking.package_id || booking.packageId} · {formatMoney(booking.total_amount || booking.totalAmount)}
                      </p>
                    </div>
                  </div>
                )) : <EmptyState text="No recent bookings yet." />}
              </article>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

const MetricRow = ({ label, value, count, max }) => (
  <div style={{ marginBottom: "16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
      <strong style={{ color: "#022c22" }}>{label}</strong>
      <span style={{ color: "#35705c" }}>{value}</span>
    </div>
    <div style={{ height: "8px", background: "#f0fdf4", borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: `${Math.max(6, (Number(count) / Number(max || 1)) * 100)}%`, height: "100%", background: "#0b6b43" }} />
    </div>
  </div>
);

const EmptyState = ({ text }) => <p style={{ color: "#35705c", margin: 0 }}>{text}</p>;

const panel = {
  backgroundColor: "#ffffff",
  border: "1px solid #d8efe5",
  borderRadius: "12px",
  padding: "22px",
  boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
};

const panelTitle = {
  margin: "0 0 18px",
  fontSize: "18px",
  fontWeight: "800",
  color: "#022c22",
};

const navLink = {
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#35705c",
  fontWeight: "500",
  fontSize: "14px",
};

const primaryButton = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  background: "#0f766e",
  color: "#ffffff",
  fontWeight: "700",
  cursor: "pointer",
};

const outlineButton = {
  padding: "10px 18px",
  borderRadius: "8px",
  border: "1px solid #afd6c3",
  background: "#ffffff",
  color: "#164e36",
  fontWeight: "700",
  cursor: "pointer",
};

const listRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 0",
  borderBottom: "1px solid #f0fdf4",
};

const rank = {
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  display: "grid",
  placeItems: "center",
  background: "#f0fdfa",
  color: "#0f766e",
  fontWeight: "800",
};

export default AdminAnalytics;
