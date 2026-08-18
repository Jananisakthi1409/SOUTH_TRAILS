import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAiRecommendations, getCustomerNotifications } from "../../services/aiTourismService";
import { getEcosystemCollection, getStartupFeatures } from "../../services/ecosystemService";
import { useAuthContext } from "../../features/auth/AuthContext";
import "../../components/advanced/AdvancedUI.css";

const configs = {
  recommendations: {
    eyebrow: "Smart Recommendation Engine",
    title: "Personalized package picks",
    copy: "Recommendations use package quality plus booking and wishlist signals when a customer is signed in.",
    empty: "No recommendations yet.",
  },
  notifications: {
    eyebrow: "Notification Center",
    title: "Booking, event, and recommendation alerts",
    copy: "A user-facing alert layer for booking updates, guide updates, event alerts, and recommendation nudges.",
    empty: "No notifications yet.",
  },
  guides: {
    endpoint: "guides",
    eyebrow: "Local Guide Marketplace",
    title: "Verified local guides",
    copy: "Guide discovery is generated from existing destination and package data, ready for verification workflows.",
    empty: "No guide profiles yet.",
  },
  homestays: {
    endpoint: "homestays",
    eyebrow: "Homestay Marketplace",
    title: "Community-driven stays",
    copy: "Rural stays and host-led experiences can be bundled with existing package routes.",
    empty: "No homestays yet.",
  },
  events: {
    endpoint: "events",
    eyebrow: "Local Events Discovery",
    title: "Festivals and seasonal attractions",
    copy: "Event discovery enriches state pages and package itineraries with seasonal reasons to travel.",
    empty: "No events yet.",
  },
  marketplace: {
    endpoint: "handicrafts",
    eyebrow: "Handicraft & Cultural Marketplace",
    title: "Artisans and cultural products",
    copy: "Traditional products and cultural stops support local commerce inside the tourism journey.",
    empty: "No cultural products yet.",
  },
  eco: {
    endpoint: "eco-scores",
    eyebrow: "Eco-Tourism Module",
    title: "Sustainability and community impact",
    copy: "Eco indicators make packages easier to compare on sustainability and local benefit.",
    empty: "No eco scores yet.",
  },
  "ar-vr": {
    endpoint: "ar-vr",
    eyebrow: "AR/VR Destination Preview",
    title: "360-degree preview readiness",
    copy: "Preview cards use existing media now and can later connect to true 360-degree assets.",
    empty: "No previews yet.",
  },
  startup: {
    eyebrow: "Startup-Scale Features",
    title: "Retention and growth systems",
    copy: "Loyalty, referrals, communities, wishlist, and social sharing are grouped for product expansion.",
    empty: "No startup feature data yet.",
  },
};

const EcosystemCollection = ({ type }) => {
  const { user } = useAuthContext() || {};
  const config = configs[type] || configs.guides;
  const [items, setItems] = useState([]);
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      let result;
      if (type === "recommendations") {
        result = await getAiRecommendations(user?.id);
        setItems(result.data?.recommendedPackages || []);
      } else if (type === "notifications") {
        result = await getCustomerNotifications(user?.id);
        setItems(result.data || []);
      } else if (type === "startup") {
        result = await getStartupFeatures();
        setStartupData(result.data || null);
        setItems([]);
      } else {
        result = await getEcosystemCollection(config.endpoint);
        setItems(result.data || []);
      }

      if (result?.error) setError(result.error.message || "Unable to load this module.");
      setLoading(false);
    };

    load();
  }, [config.endpoint, type, user?.id]);

  const stats = useMemo(() => {
    if (type === "startup" && startupData) return Object.keys(startupData).length;
    return items.length;
  }, [items.length, startupData, type]);

  return (
    <main className="advanced-page">
      <div className="advanced-page-inner">
        <section className="advanced-hero">
          <div className="advanced-panel advanced-hero-copy">
            <p className="eyebrow">{config.eyebrow}</p>
            <h1>{config.title}</h1>
            <p style={{ color: "#35705c", lineHeight: 1.65 }}>{config.copy}</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <Link className="button button-primary" to="/packages">Browse Packages</Link>
              <Link className="button button-secondary" to="/trip-builder">Build Trip</Link>
            </div>
          </div>
          <aside className="advanced-panel advanced-hero-copy">
            <p className="eyebrow">MVP Status</p>
            <h2>{stats} active signals</h2>
            <p style={{ color: "#35705c" }}>Built on the existing package catalog, ratings, wishlist, reviews, and booking flow.</p>
          </aside>
        </section>

        {error && (
          <div className="advanced-panel personal-card" style={{ marginBottom: "1rem", borderColor: "#d8efe5", color: "#064e3b" }}>
            {error}
          </div>
        )}

        {loading ? (
          <section className="advanced-grid">
            <article className="advanced-panel personal-card">Loading...</article>
          </section>
        ) : type === "startup" ? (
          <StartupGrid data={startupData} />
        ) : items.length ? (
          <section className="advanced-grid">
            {items.map((item) => (
              <EcosystemCard key={item.id || item.packageId || item.title} item={item} type={type} />
            ))}
          </section>
        ) : (
          <section className="advanced-grid">
            <article className="advanced-panel personal-card">
              <h3>{config.empty}</h3>
              <p>Seed packages or sign in to generate more ecosystem signals.</p>
            </article>
          </section>
        )}
      </div>
    </main>
  );
};

const EcosystemCard = ({ item, type }) => {
  const title =
    item.title ||
    item.name ||
    item.product ||
    item.destination ||
    item.type ||
    "South Trails ecosystem item";
  const packageId = item.packageId || item.package_id;
  const media = item.media || [];

  return (
    <article className="advanced-panel personal-card">
      <p className="eyebrow">{item.state || item.category || item.type || type}</p>
      <h3>{title}</h3>
      <p>{item.location || item.baseLocation || item.destination || item.origin || item.message || item.impact || item.experience || "Connected to South Trails package data."}</p>
      <Meta item={item} />
      {media.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginTop: "1rem" }}>
          {media.slice(0, 3).map((src) => (
            <img key={src} src={src} alt={title} style={{ width: "100%", aspectRatio: "1.2", objectFit: "cover", borderRadius: "8px" }} />
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1rem" }}>
        {packageId && <Link to={`/package/${packageId}`}>View linked package</Link>}
        {type === "guides" && <Link to="/contact">Request guide</Link>}
        {type === "homestays" && <Link to="/contact">Request stay</Link>}
      </div>
    </article>
  );
};

const Meta = ({ item }) => {
  const rows = [
    item.speciality && `Speciality: ${item.speciality}`,
    item.host && `Host: ${item.host}`,
    item.artisan && `Artisan: ${item.artisan}`,
    item.season && `Season: ${item.season}`,
    item.rating && `Rating: ${item.rating}`,
    item.pricePerDay && `Guide/day: Rs. ${Number(item.pricePerDay).toLocaleString("en-IN")}`,
    item.pricePerNight && `Stay/night: Rs. ${Number(item.pricePerNight).toLocaleString("en-IN")}`,
    item.price && `Price: Rs. ${Number(item.price).toLocaleString("en-IN")}`,
    item.overall && `Eco score: ${item.overall}/100`,
    item.communityImpactScore && `Community impact: ${item.communityImpactScore}/100`,
  ].filter(Boolean);

  if (!rows.length) return null;

  return (
    <div style={{ display: "grid", gap: "0.35rem", marginTop: "0.9rem" }}>
      {rows.map((row) => (
        <span key={row} style={{ color: "#164e36", fontWeight: 700, fontSize: "0.9rem" }}>{row}</span>
      ))}
    </div>
  );
};

const StartupGrid = ({ data }) => {
  if (!data) {
    return (
      <section className="advanced-grid">
        <article className="advanced-panel personal-card">
          <h3>Startup features are ready for backend expansion.</h3>
        </article>
      </section>
    );
  }

  return (
    <section className="advanced-grid">
      {Object.entries(data).map(([key, value]) => (
        <article key={key} className="advanced-panel personal-card">
          <p className="eyebrow">{key}</p>
          <h3>{value.status || "Ready"}</h3>
          {Object.entries(value).map(([field, fieldValue]) => (
            field !== "status" && (
              <p key={field}>
                <strong>{field}: </strong>
                {Array.isArray(fieldValue) ? fieldValue.join(", ") : String(fieldValue)}
              </p>
            )
          ))}
        </article>
      ))}
    </section>
  );
};

export default EcosystemCollection;
