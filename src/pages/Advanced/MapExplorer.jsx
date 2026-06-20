import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPackages } from "../../services/packageService";
import "../../components/advanced/AdvancedUI.css";

const statePins = [
  { state: "Tamil Nadu", label: "Temples + Hills", top: "62%", left: "54%", route: "/states/tamil-nadu" },
  { state: "Kerala", label: "Backwaters", top: "74%", left: "37%", route: "/states/kerala" },
  { state: "Karnataka", label: "Coffee + Heritage", top: "45%", left: "34%", route: "/states/karnataka" },
  { state: "Andhra Pradesh", label: "Coast + Shrines", top: "32%", left: "62%", route: "/states/andhra-pradesh" },
];

const MapExplorer = () => {
  const [packages, setPackages] = useState([]);
  const [selectedState, setSelectedState] = useState("Kerala");

  useEffect(() => {
    getPackages().then((items) => setPackages(items || []));
  }, []);

  const selectedPackages = useMemo(
    () => packages.filter((pkg) => pkg.state === selectedState).slice(0, 6),
    [packages, selectedState]
  );

  const selectedPin = statePins.find((pin) => pin.state === selectedState) || statePins[0];

  return (
    <main className="advanced-page">
      <div className="advanced-page-inner">
        <section className="advanced-hero">
          <div className="advanced-hero-copy advanced-panel">
            <p className="eyebrow">Interactive Explorer</p>
            <h1>Explore South India by map, route, and package density</h1>
            <p>
              Click a state pin to preview packages, nearby experiences, route mood, and quick links.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <Link className="button button-primary" to="/trip-builder">Build Trip</Link>
              <Link className="button button-secondary" to="/packages">Browse Packages</Link>
            </div>
          </div>

          <aside className="advanced-panel" style={{ padding: "1.5rem" }}>
            <p className="eyebrow">{selectedState}</p>
            <h2 style={{ marginTop: 0 }}>{selectedPin.label}</h2>
            <p style={{ color: "#64748b" }}>
              {selectedPackages.length} matching packages available from the live package catalog.
            </p>
            <Link to={selectedPin.route}>Open state guide</Link>
          </aside>
        </section>

        <section className="advanced-hero">
          <div className="map-stage advanced-panel" aria-label="South India interactive map">
            <div className="map-route-line" />
            {statePins.map((pin) => (
              <button
                key={pin.state}
                type="button"
                className="map-pin"
                style={{ top: pin.top, left: pin.left }}
                onClick={() => setSelectedState(pin.state)}
                aria-pressed={selectedState === pin.state}
              >
                {pin.state}
              </button>
            ))}
          </div>

          <div className="advanced-panel" style={{ padding: "1.25rem" }}>
            <h2 style={{ marginTop: 0 }}>Packages Near {selectedState}</h2>
            <div className="itinerary-timeline">
              {selectedPackages.map((pkg) => (
                <article key={pkg.id} className="itinerary-day">
                  <p className="eyebrow" style={{ margin: 0 }}>{pkg.category}</p>
                  <h3 style={{ margin: "0.35rem 0" }}>{pkg.title}</h3>
                  <p style={{ margin: "0 0 0.7rem", color: "#64748b" }}>
                    {pkg.days}D / {pkg.nights}N - Rs. {Number(pkg.price || 0).toLocaleString("en-IN")}
                  </p>
                  <Link to={`/package/${pkg.id}`}>View package</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MapExplorer;
