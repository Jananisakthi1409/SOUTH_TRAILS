import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewSentiment } from "../../services/aiTourismService";
import { getReviews } from "../../services/reviewService";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [reviewData, sentimentResult] = await Promise.all([
        getReviews(),
        getReviewSentiment(),
      ]);
      setReviews(reviewData || []);
      setSentiment(sentimentResult.data || null);
      setLoading(false);
    };

    load();
  }, []);

  const sentimentByReviewId = useMemo(() => {
    const map = new Map();
    (sentiment?.signals || []).forEach((signal) => {
      map.set(signal.review_id || signal.reviewId, signal);
    });
    return map;
  }, [sentiment]);

  const summary = sentiment?.summary || {};
  const totalReviews = sentiment?.total_reviews || sentiment?.totalReviews || reviews.length;

  return (
    <div style={pageStyle}>
      <aside style={sidebarStyle}>
        <div>
          <div style={brandBlockStyle}>
            <h2 style={brandTitleStyle}>SOUTH TRAILS</h2>
            <p style={brandSubtitleStyle}>Review Intelligence</p>
          </div>

          <nav style={navStyle}>
            <Link to="/admin/dashboard" style={navLinkStyle}>Dashboard</Link>
            <Link to="/admin/packages" style={navLinkStyle}>Packages</Link>
            <Link to="/admin/customers" style={navLinkStyle}>Customers</Link>
            <Link to="/admin/bookings" style={navLinkStyle}>Bookings</Link>
            <Link to="/admin/users" style={navLinkStyle}>Users</Link>
            <Link to="/admin/ecosystem" style={navLinkStyle}>Ecosystem</Link>
            <Link to="/admin/reviews" style={{ ...navLinkStyle, backgroundColor: "#f0fdfa", color: "#0f766e", fontWeight: 700 }}>Reviews</Link>
            <Link to="/admin/analytics" style={navLinkStyle}>Analytics</Link>
            <Link to="/admin/kanban" style={navLinkStyle}>Kanban Board</Link>
          </nav>
        </div>
      </aside>

      <main style={mainStyle}>
        <div style={headerStyle}>
          <div>
            <h1 style={headingStyle}>Reviews & Sentiment</h1>
            <p style={copyStyle}>AI-assisted service quality monitoring from verified package reviews.</p>
          </div>
          <Link to="/admin/analytics" style={primaryButtonStyle}>Open Analytics</Link>
        </div>

        {loading ? (
          <section style={panelStyle}>Loading review intelligence...</section>
        ) : (
          <>
            <section style={kpiGridStyle}>
              <KpiCard label="Total Reviews" value={totalReviews} />
              <KpiCard label="Positive" value={summary.Positive || 0} />
              <KpiCard label="Neutral" value={summary.Neutral || 0} />
              <KpiCard label="Complaint Risk" value={summary.Negative || 0} tone="danger" />
            </section>

            <section style={panelStyle}>
              <div style={sectionHeaderStyle}>
                <div>
                  <h2 style={panelTitleStyle}>Review Queue</h2>
                  <p style={copyStyle}>Negative reviews are flagged for faster service recovery.</p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <p style={copyStyle}>No customer reviews yet.</p>
              ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                  {reviews.map((review) => {
                    const signal = sentimentByReviewId.get(review.id);
                    const reviewText = review.text || review.comment || review.review || "No written feedback.";
                    const risk = signal?.complaint_risk || signal?.complaintRisk || "Low";
                    const label = signal?.sentiment || "Neutral";
                    return (
                      <article key={review.id} style={reviewRowStyle}>
                        <div>
                          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
                            <strong style={{ color: "#022c22" }}>{review.packageName || review.package_id || review.packageId || "Package review"}</strong>
                            <span style={badgeStyle(label)}>{label}</span>
                            <span style={riskBadgeStyle(risk)}>{risk} risk</span>
                          </div>
                          <p style={{ ...copyStyle, marginTop: "0.65rem" }}>{reviewText}</p>
                          <p style={{ ...copyStyle, fontSize: "0.85rem" }}>
                            Rating: {review.rating || 0}/5 - Customer: {review.customer_id || review.customerId || "Verified traveler"}
                          </p>
                        </div>
                        <Link to={`/packages/${review.package_id || review.packageId}`} style={secondaryButtonStyle}>View Package</Link>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

const KpiCard = ({ label, value, tone = "default" }) => (
  <article style={panelStyle}>
    <span style={{ color: "#35705c", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase" }}>{label}</span>
    <p style={{ margin: "0.5rem 0 0", color: tone === "danger" ? "#064e3b" : "#0f766e", fontSize: "2rem", fontWeight: 900 }}>{value}</p>
  </article>
);

const pageStyle = {
  display: "flex",
  backgroundColor: "#ffffff",
  minHeight: "100vh",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const sidebarStyle = {
  width: "260px",
  backgroundColor: "#ffffff",
  borderRight: "1px solid #d8efe5",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  padding: "32px 24px",
  zIndex: 100,
};

const brandBlockStyle = {
  paddingBottom: "32px",
  borderBottom: "1px solid #f0fdf4",
};

const brandTitleStyle = {
  fontSize: "20px",
  fontWeight: 800,
  color: "#0f766e",
  margin: 0,
};

const brandSubtitleStyle = {
  fontSize: "12px",
  color: "#35705c",
  margin: "4px 0 0",
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const navStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginTop: "32px",
};

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#35705c",
  fontWeight: 600,
  fontSize: "14px",
};

const mainStyle = {
  marginLeft: "260px",
  flex: 1,
  padding: "40px 48px",
  boxSizing: "border-box",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "1rem",
  marginBottom: "32px",
};

const headingStyle = {
  margin: 0,
  fontSize: "28px",
  color: "#022c22",
};

const copyStyle = {
  margin: "0.4rem 0 0",
  color: "#35705c",
  lineHeight: 1.55,
};

const panelStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #d8efe5",
  borderRadius: "12px",
  padding: "22px",
  boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
};

const panelTitleStyle = {
  margin: 0,
  color: "#022c22",
  fontSize: "18px",
};

const kpiGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "18px",
  marginBottom: "28px",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "1rem",
  marginBottom: "1.2rem",
};

const reviewRowStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: "1rem",
  alignItems: "center",
  padding: "1rem",
  border: "1px solid #d8efe5",
  borderRadius: "10px",
  background: "#ffffff",
};

const primaryButtonStyle = {
  padding: "10px 16px",
  borderRadius: "8px",
  background: "#0f766e",
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: 800,
};

const secondaryButtonStyle = {
  padding: "9px 13px",
  borderRadius: "8px",
  border: "1px solid #afd6c3",
  color: "#164e36",
  textDecoration: "none",
  fontWeight: 800,
  whiteSpace: "nowrap",
};

const badgeStyle = (sentiment) => ({
  padding: "0.25rem 0.55rem",
  borderRadius: 999,
  background: sentiment === "Positive" ? "#dcfce7" : sentiment === "Negative" ? "#f0fdf4" : "#f0fdf4",
  color: sentiment === "Positive" ? "#15803d" : sentiment === "Negative" ? "#064e3b" : "#2f6b52",
  fontSize: "0.75rem",
  fontWeight: 900,
});

const riskBadgeStyle = (risk) => ({
  padding: "0.25rem 0.55rem",
  borderRadius: 999,
  background: risk === "High" ? "#f0fdf4" : "#ffffff",
  color: risk === "High" ? "#064e3b" : "#35705c",
  fontSize: "0.75rem",
  fontWeight: 900,
});

export default AdminReviews;
