import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPackages } from "../../services/packageService";
import "../../components/advanced/AdvancedUI.css";

const destinationPins = [
  { destination: "Chennai", label: "Heritage Coast", top: "46%", left: "67%", route: "/destinations/chennai" },
  { destination: "Madurai", label: "Temple City", top: "72%", left: "48%", route: "/destinations/madurai" },
  { destination: "Thanjavur", label: "Chola Heritage", top: "61%", left: "58%", route: "/destinations/thanjavur" },
  { destination: "Ooty", label: "Nilgiri Hills", top: "50%", left: "28%", route: "/destinations/ooty" },
  { destination: "Kodaikanal", label: "Misty Hills", top: "68%", left: "36%", route: "/destinations/kodaikanal" },
  { destination: "Rameswaram", label: "Spiritual Coast", top: "81%", left: "64%", route: "/destinations/rameswaram" },
  { destination: "Kanyakumari", label: "Southern Coast", top: "91%", left: "44%", route: "/destinations/kanyakumari" },
  { destination: "Coimbatore", label: "Western Gateway", top: "56%", left: "25%", route: "/destinations/coimbatore" },
];

const MapExplorer = () => {
  const [packages, setPackages] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("Madurai");

  useEffect(() => {
    getPackages({ state: "Tamil Nadu" }).then((items) => setPackages(items || []));
  }, []);

  const selectedPackages = useMemo(
    () => packages.filter((pkg) => pkg.destination === selectedDestination).slice(0, 6),
    [packages, selectedDestination]
  );

  const selectedPin = destinationPins.find((pin) => pin.destination === selectedDestination) || destinationPins[0];

  return (
    <main className="advanced-page">
      <div className="advanced-page-inner">
        <section className="advanced-hero">
          <div className="advanced-hero-copy advanced-panel">
            <p className="eyebrow">Tamil Nadu Interactive Map</p>
            <h1>Explore Tamil Nadu by circuit, destination, and package density</h1>
            <p>
              Click a destination pin to preview Tamil Nadu packages, route mood,
              nearby experiences, and destination guides.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <Link className="button button-primary" to="/trip-builder">Build Trip</Link>
              <Link className="button button-secondary" to="/packages">Browse Packages</Link>
            </div>
          </div>

          <aside className="advanced-panel" style={{ padding: "1.5rem" }}>
            <p className="eyebrow">{selectedDestination}</p>
            <h2 style={{ marginTop: 0 }}>{selectedPin.label}</h2>
            <p style={{ color: "#35705c" }}>
              {selectedPackages.length} matching Tamil Nadu packages available from the catalog.
            </p>
            <Link to={selectedPin.route}>Open destination guide</Link>
          </aside>
        </section>

        <section className="advanced-hero">
          <div className="map-stage advanced-panel tamil-map-stage" aria-label="Tamil Nadu interactive map">
            <div className="map-route-line" />
            {destinationPins.map((pin) => (
              <button
                key={pin.destination}
                type="button"
                className="map-pin"
                style={{ top: pin.top, left: pin.left }}
                onClick={() => setSelectedDestination(pin.destination)}
                aria-pressed={selectedDestination === pin.destination}
              >
                {pin.destination}
              </button>
            ))}
          </div>

          <div className="advanced-panel" style={{ padding: "1.25rem" }}>
            <h2 style={{ marginTop: 0 }}>Packages Near {selectedDestination}</h2>
            <div className="itinerary-timeline">
              {selectedPackages.length ? selectedPackages.map((pkg) => (
                <article key={pkg.id} className="itinerary-day">
                  <p className="eyebrow" style={{ margin: 0 }}>{pkg.category}</p>
                  <h3 style={{ margin: "0.35rem 0" }}>{pkg.title}</h3>
                  <p style={{ margin: "0 0 0.7rem", color: "#35705c" }}>
                    {pkg.days}D / {pkg.nights}N - Rs. {Number(pkg.price || 0).toLocaleString("en-IN")}
                  </p>
                  <Link to={`/package/${pkg.id}`}>View package</Link>
                </article>
              )) : (
                <article className="itinerary-day">
                  <h3>No direct package yet</h3>
                  <p style={{ color: "#35705c" }}>Use the AI planner to build a custom Tamil Nadu route around this destination.</p>
                </article>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MapExplorer;
