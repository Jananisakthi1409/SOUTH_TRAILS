import { Link } from "react-router-dom";
import "./AdvancedUI.css";

const PackageCompareTray = ({ packages = [], onClear }) => {
  if (packages.length < 2) return null;
  const visible = packages.slice(0, 3);

  return (
    <section className="compare-tray advanced-panel">
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", marginBottom: "0.8rem" }}>
        <div>
          <strong>Package Comparison</strong>
          <p style={{ margin: "0.2rem 0 0", color: "#64748b" }}>Compare price, duration, rating, and best-for signals.</p>
        </div>
        <button className="smart-filter-toggle" type="button" onClick={onClear}>Clear</button>
      </div>
      <div className="compare-grid">
        {visible.map((pkg) => (
          <article key={pkg.id} className="compare-item">
            <h4 style={{ margin: "0 0 0.5rem", color: "#0f172a" }}>{pkg.title}</h4>
            <p style={{ margin: 0 }}>Rs. {Number(pkg.price || 0).toLocaleString("en-IN")}</p>
            <p style={{ margin: "0.35rem 0" }}>{pkg.days}D / {pkg.nights}N · {pkg.rating}/5</p>
            <p style={{ margin: "0 0 0.7rem", color: "#64748b" }}>{pkg.category}</p>
            <Link to={`/package/${pkg.id}`}>Open details</Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PackageCompareTray;
