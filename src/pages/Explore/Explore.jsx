import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const moodCards = [
  { label: "🌿 Peace", title: "Quiet escapes", subtitle: "Slow backwater mornings" },
  { label: "🏔 Adventure", title: "Trail journeys", subtitle: "Forest treks and hill roads" },
  { label: "📸 Hidden Gems", title: "Secret corners", subtitle: "Untold local discoveries" },
  { label: "🍜 Food Trails", title: "Taste routes", subtitle: "Spice, street food and coastal cafés" },
  { label: "🚗 Road Trips", title: "Open drives", subtitle: "Coastal and countryside routes" },
  { label: "💕 Romantic Escapes", title: "Intimate stays", subtitle: "Sunset hideaways and quiet inns" },
];

const states = [
  { name: "Tamil Nadu", count: "30+ Destinations" },
  { name: "Kerala", count: "25+ Destinations" },
  { name: "Karnataka", count: "20+ Destinations" },
  { name: "Andhra Pradesh", count: "15+ Destinations" },
];

const destinations = [
  {
    title: "Kochi Spice Route",
    state: "Kerala",
    description: "Historic lanes and sunset harbors.",
    bestTime: "Oct – Mar",
    duration: "2 Days",
    specialty: "Backwaters & Seafood",
    badge: "🔥 Popular",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=cover&w=600&q=80"
  },
  {
    title: "Ooty Tea Drive",
    state: "Tamil Nadu",
    description: "Misty peaks and scenic curves.",
    bestTime: "Oct – Jun",
    duration: "3 Days",
    specialty: "Tea Gardens",
    badge: "⭐ Traveler Favorite",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=cover&w=600&q=80"
  },
  {
    title: "Coorg Coffee Trail",
    state: "Karnataka",
    description: "Plantations, waterfalls, calm.",
    bestTime: "Oct – Apr",
    duration: "3 Days",
    specialty: "Coffee Estates",
    badge: "🌿 Peaceful Escape",
    image: "https://images.unsplash.com/photo-1626593510484-df0a19e1eef4?auto=format&fit=cover&w=600&q=80"
  },
  {
    title: "Vizag Coastline",
    state: "Andhra Pradesh",
    description: "Golden sands and local seafood.",
    bestTime: "Nov – Feb",
    duration: "2 Days",
    specialty: "Seafood & Beaches",
    badge: "",
    image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=cover&w=600&q=80"
  },
  {
    title: "Hampi Sunrise",
    state: "Karnataka",
    description: "Ancient ruins with soft dawn light.",
    bestTime: "Oct – Mar",
    duration: "4 Days",
    specialty: "Temple Architecture",
    badge: "⭐ Traveler Favorite",
    image: "https://images.unsplash.com/photo-1600100397990-a4783a03eb65?auto=format&fit=cover&w=600&q=80"
  },
  {
    title: "Munnar Mists",
    state: "Kerala",
    description: "Tea slopes and quiet mornings.",
    bestTime: "Oct – Feb",
    duration: "3 Days",
    specialty: "Tea Gardens",
    badge: "🔥 Popular",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=cover&w=600&q=80"
  },
];

// Rich Premium Curated Packages Dataset
const curatedPackages = [
  {
    title: "Kerala Backwater Escape",
    state: "Kerala",
    description: "Settle into slower rhythms aboard an ultra-private, premium luxury thatched houseboat as it glides along quiet emerald canal webs.",
    duration: "3 Days",
    bestSeason: "Oct-Feb",
    price: "₹8,999",
    rating: 5,
    tag: "🔥 Trending",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=cover&w=800&q=80",
    highlights: ["Premium Heritage Stay", "Cochin Culinary Trail", "Backwater Countryside Boat Tour", "Private Airport Transfers"]
  },
  {
    title: "Nilgiri Misty Mountains Trail",
    state: "Tamil Nadu",
    description: "Trace historic colonial highland trails winding through aromatic, sprawling tea estates blanketed under soft morning cloud mist.",
    duration: "4 Days",
    bestSeason: "Sep-Mar",
    price: "₹12,499",
    rating: 5,
    tag: "💎 Premium",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=cover&w=800&q=80",
    highlights: ["Charming Tea Bungalow Retreat", "Handpicked Leaf Sourcing Workshop", "High-Peak Ridge Treks", "Dedicated Cross-Hill Private SUV"]
  },
  {
    title: "Imperial Ruins of Hampi",
    state: "Karnataka",
    description: "Step straight across historical centuries exploring golden boulder fields, forgotten royal pavilions, and incredible monolithic monuments.",
    duration: "3 Days",
    bestSeason: "Nov-Feb",
    price: "₹9,500",
    rating: 5,
    tag: "🏛 Heritage Trail",
    image: "https://images.unsplash.com/photo-1600100397990-a4783a03eb65?auto=format&fit=cover&w=800&q=80",
    highlights: ["Riverside Heritage Resort Luxury", "Exclusive Historical Narrative Guided Walks", "Tungabhadra Coracle Crossing", "Locally Crafted Inter-Site Travel Logs"]
  }
];

const featureBlocks = [
  { icon: "🗺️", title: "Expertly Designed Routes", desc: "Crafted by regional specialists to balance iconic sites with crowd-free lanes." },
  { icon: "🎨", title: "Local Experiences", desc: "Immersive culinary masterclasses, folk artisan sessions, and secret local trails." },
  { icon: "🛡️", title: "Verified Stays", desc: "Rigorous standards tracking design elegance, safety, comfort, and local charm." },
  { icon: "🏷️", title: "Best Price Packages", desc: "Direct regional logistics networks enabling luxury itineraries without marked-up costs." }
];

const Explore = () => {
  const navigate = useNavigate();
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const handleSurpriseMe = () => {
    if (destinations.length === 0) return;
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const randomDest = destinations[randomIndex];
    const slug = randomDest.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    navigate(`/places/${slug}`);
  };

  return (
    <main className="app-shell explore-page" style={{ backgroundColor: "#ffffff" }}>
      
      {/* Enhanced Explore Header Section */}
      <section className="section explore-header" style={{ position: "relative", paddingBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div className="section-heading" style={{ flex: "1", minWidth: "280px" }}>
            <p className="eyebrow" style={{ color: "#0f766e", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Explore</p>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#1e293b", margin: "0.5rem 0" }}>Discover South India with a clear route</h2>
            <p className="section-copy" style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "600px" }}>
              Find your next destination by mood, by state, or through our curated escapes.
            </p>
          </div>
          
          <button
            onClick={handleSurpriseMe}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#f0fdfa",
              color: "#0f766e",
              border: "1px solid #ccfbf1",
              padding: "0.625rem 1.25rem",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              marginTop: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#ccfbf1";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f0fdfa";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            🎲 Surprise Me
          </button>
        </div>

        {/* Clean, Premium Header Stats Row Component */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1.25rem",
          marginTop: "2.5rem",
          borderTop: "1px solid #f1f5f9",
          paddingTop: "2rem"
        }}>
          {[
            { value: "500+", label: "Packages Available" },
            { value: "100+", label: "Destinations Managed" },
            { value: "4 States", label: "Covered Regionally" },
            { value: "4.9 ★", label: "Traveler Satisfaction" }
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: "#fafafa", padding: "1rem 1.25rem", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
              <span style={{ display: "block", fontSize: "1.5rem", fontWeight: "800", color: "#0f766e" }}>{stat.value}</span>
              <span style={{ display: "block", fontSize: "0.85rem", color: "#64748b", fontWeight: "500", marginTop: "0.25rem" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Explore by Mood Section */}
      <section className="section explore-mood-section">
        <div className="section-heading">
          <p className="eyebrow" style={{ color: "#0f766e" }}>Explore by Mood</p>
          <h2 style={{ color: "#1e293b" }}>Choose your travel feeling</h2>
        </div>
        <div className="mood-grid explore-mood-grid">
          {moodCards.map((card) => {
            const slug = card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <Link key={card.label} to={`/moods/${slug}`} className="mood-link" style={{ textDecoration: "none" }}>
                <motion.article
                  className="mood-card mood-card-small"
                  whileHover={{ 
                    y: -6,
                    boxShadow: "0 10px 25px -5px rgba(15, 118, 110, 0.1), 0 8px 10px -6px rgba(15, 118, 110, 0.1)",
                    borderColor: "#0f766e"
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
                    backgroundColor: "#ffffff",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease"
                  }}
                >
                  <div className="mood-card-icon" style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{card.label}</div>
                  <h3 style={{ margin: "0 0 0.25rem 0", color: "#0f172a", fontSize: "1.1rem" }}>{card.title}</h3>
                  <p style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>{card.subtitle}</p>
                </motion.article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Elegant Layout Section Divider */}
      <hr style={{ border: 0, borderTop: "1px solid #f1f5f9", margin: "3rem 0" }} />

      {/* Enhanced Explore by State Section */}
      <section className="section explore-state-section">
        <div className="section-heading">
          <p className="eyebrow" style={{ color: "#0f766e" }}>Explore by State</p>
          <h2 style={{ color: "#1e293b" }}>Focus on the four key states</h2>
        </div>
        <div className="state-row" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {states.map((state) => {
            const slug = state.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <Link key={state.name} to={`/states/${slug}`} className="state-pill-link" style={{ textDecoration: "none", flex: "1 1 calc(25% - 1rem)", minWidth: "160px" }}>
                <motion.button 
                  className="state-pill" 
                  whileHover={{ scale: 1.02, borderColor: "#0f766e", backgroundColor: "#f0fdfa" }} 
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "1rem",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.25s ease"
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: "700", color: "#0f172a" }}>{state.name}</span>
                  <span style={{ fontSize: "0.8rem", color: "#0f766e", fontWeight: "500" }}>{state.count}</span>
                </motion.button>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Elegant Layout Section Divider */}
      <hr style={{ border: 0, borderTop: "1px solid #f1f5f9", margin: "4rem 0" }} />

      {/* ============================================================================== */}
      {/* NEWLY ENHANCED HIGH-PREMIUM CURATED ESCAPES SHOWCASE SECTION INLINE REPLACEMENT */}
      {/* ============================================================================== */}
      <section className="curated-escapes-premium-showcase" style={{ position: "relative", padding: "2rem 0" }}>
        
        {/* Statistics Metric Strip Above Section Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          backgroundColor: "#f0fdfa",
          border: "1px solid #ccfbf1",
          borderRadius: "16px",
          padding: "1.5rem 2.5rem",
          marginBottom: "3.5rem"
        }}>
          {[
            { metric: "500+", context: "Happy Travelers" },
            { metric: "50+", context: "Curated Packages" },
            { metric: "4", context: "South Indian States" },
            { metric: "4.9 ★", context: "Average Rating" }
          ].map((stat, sIdx) => (
            <div key={sIdx} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "1.75rem", fontWeight: "900", color: "#0f766e", lineHeight: 1 }}>{stat.metric}</span>
              <span style={{ fontSize: "0.85rem", color: "#115e59", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.02em" }}>{stat.context}</span>
            </div>
          ))}
        </div>

        {/* Section Header Blocks */}
        <div style={{ marginBottom: "3rem" }}>
          <p className="eyebrow" style={{ color: "#0f766e", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Curated Escapes</p>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a", margin: "0.5rem 0 1rem 0", letterSpacing: "-0.02em" }}>Handpicked South India Experiences</h2>
          <p style={{ color: "#475569", fontSize: "1.1rem", maxWidth: "720px", lineHeight: "1.6" }}>
            Carefully crafted journeys that showcase the best of South India, from misty hills and heritage towns to coastal adventures and hidden gems.
          </p>
        </div>

        {/* Premium Rich Travel Display Cards Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem", marginBottom: "4.5rem" }}>
          {curatedPackages.map((pkg, pIdx) => {
            const isHovered = hoveredPackage === pIdx;
            const packageSlug = pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

            return (
              <Link 
                key={pIdx} 
                to={`/packages/${packageSlug}`}
                style={{ textDecoration: "none" }}
                onMouseEnter={() => setHoveredPackage(pIdx)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <motion.article
                  animate={{ y: isHovered ? -12 : 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    boxShadow: isHovered 
                      ? "0 25px 50px -12px rgba(15, 118, 110, 0.15), 0 0 0 1px rgba(15, 118, 110, 0.1)" 
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)",
                    transition: "box-shadow 0.35s ease"
                  }}
                >
                  {/* Large High Res Media Card Section Container */}
                  <div style={{ height: "250px", overflow: "hidden", position: "relative" }}>
                    <motion.img 
                      src={pkg.image}
                      alt={pkg.title}
                      animate={{ scale: isHovered ? 1.08 : 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />

                    {/* State Badge node element aligned to Upper-Right corners */}
                    <span style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(6px)",
                      color: "#0f172a",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                    }}>
                      {pkg.state}
                    </span>

                    {/* Premium Context Identity Tag label node elements pinned to Upper-Left */}
                    <span style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      backgroundColor: "#0f766e",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      boxShadow: "0 4px 10px rgba(15, 118, 110, 0.3)"
                    }}>
                      {pkg.tag}
                    </span>

                    {/* Contextual Premium Gradient Mask Layer overlay rendering seamlessly on user focus */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(11, 63, 59, 0.9) 0%, rgba(15, 118, 110, 0.4) 60%, transparent 100%)",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            paddingBottom: "2rem"
                          }}
                        >
                          <span style={{
                            color: "#ffffff",
                            fontSize: "1rem",
                            fontWeight: "700",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem"
                          }}>
                            View Journey <span style={{ transition: "transform 0.2s", transform: "translateX(4px)" }}>→</span>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Core Content Body Card Space Wrapper */}
                  <div style={{ padding: "1.7rem", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    
                    <div>
                      {/* Meta Chronology Log & Rating Metrics Block element section */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <span style={{ color: "#0f766e", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase" }}>
                          📅 {pkg.duration} &bull; Best {pkg.bestSeason}
                        </span>
                        <div style={{ display: "flex", gap: "1px", color: "#f59e0b", fontSize: "0.9rem" }}>
                          {Array.from({ length: pkg.rating }).map((_, rI) => (
                            <span key={rI}>⭐</span>
                          ))}
                        </div>
                      </div>

                      {/* Title Segment & Narrative Space descriptions block */}
                      <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.4rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.01em" }}>
                        {pkg.title}
                      </h3>
                      <p style={{ margin: "0 0 1.5rem 0", color: "#64748b", fontSize: "0.925rem", lineHeight: "1.6" }}>
                        {pkg.description}
                      </p>

                      {/* Local Structural Highlights & Services Manifest Grid Node Element */}
                      <div style={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #f1f5f9",
                        borderRadius: "12px",
                        padding: "1rem",
                        marginBottom: "1.5rem"
                      }}>
                        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", color: "#475569", letterSpacing: "0.04em" }}>
                          Journey Highlights Included
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 0.75rem" }}>
                          {pkg.highlights.map((highlight, hKey) => (
                            <div key={hKey} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#334155" }}>
                              <span style={{ color: "#0f766e", fontWeight: "700" }}>✔</span>
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Operational Structural Financial Matrix Layout section strip */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      borderTop: "1px solid #f1f5f9",
                      paddingTop: "1.25rem",
                      marginTop: "auto"
                    }}>
                      <span style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: "500" }}>Starting Package Rate</span>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "#0f766e" }}>{pkg.price}</span>
                        <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>per person</span>
                      </div>
                    </div>

                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>

        {/* Why Choose Curated Escapes Brand Feature Value Blocks Sub-Grid Module layout section */}
        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "4rem", marginBottom: "4.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h3 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Why Journey via Curated Escapes?</h3>
            <p style={{ color: "#64748b", fontSize: "0.95rem", margin: "0.25rem 0 0 0" }}>Uncompromising quality architectures embedded straight into every step of your southern travels.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
            {featureBlocks.map((fBlock, fIdx) => (
              <div key={fIdx} style={{ backgroundColor: "#ffffff", border: "1px solid #f1f5f9", padding: "1.5rem", borderRadius: "12px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", marginBottom: "1rem" }}>
                  {fBlock.icon}
                </div>
                <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>{fBlock.title}</h4>
                <p style={{ margin: 0, color: "#64748b", fontSize: "0.875rem", lineHeight: "1.5" }}>{fBlock.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integrated Visual Marketing Action Travel Inspiration Strip Panel Component banner */}
        <div style={{
          background: "linear-gradient(135deg, #115e59 0%, #0f766e 100%)",
          borderRadius: "20px",
          padding: "3.5rem",
          textAlign: "center",
          color: "#ffffff",
          boxShadow: "0 20px 40px -15px rgba(15, 118, 110, 0.25)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Subtle Abstract Geometry Element */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.08, background: "radial-gradient(circle at 20% 50%, #ffffff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 50%)", pointerEvents: "none" }} />
          
          <div style={{ position: "relative", zIndex: 1, maxWidth: "650px", margin: "0 auto" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", color: "#2dd4bf", display: "block", marginBottom: "0.5rem" }}>Need inspiration?</span>
            <h3 style={{ fontSize: "2rem", fontWeight: "800", margin: "0 0 1rem 0", letterSpacing: "-0.01em" }}>Discover Endless Trajectories</h3>
            <p style={{ color: "#ccfbf1", fontSize: "1.05rem", lineHeight: "1.6", margin: "0 0 2rem 0", opacity: 0.95 }}>
              Discover hidden beaches, hill stations, heritage towns and food trails across South India.
            </p>
            <button
              onClick={() => navigate("/packages")}
              style={{
                backgroundColor: "#ffffff",
                color: "#0f766e",
                border: "none",
                padding: "0.85rem 2.25rem",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e2e8f0";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Explore More Packages
            </button>
          </div>
        </div>

      </section>
      {/* ============================================================================== */}
      {/* END OF CURATED ESCAPES PREMIUM SHOWCASE INSERTION                              */}
      {/* ============================================================================== */}

      {/* Elegant Layout Section Divider */}
      <hr style={{ border: 0, borderTop: "1px solid #f1f5f9", margin: "3rem 0" }} />

      {/* Enhanced Destination Grid Layout Module */}
      <section className="section destination-grid-section">
        <div className="section-heading">
          <p className="eyebrow" style={{ color: "#0f766e" }}>Destination Grid</p>
          <h2 style={{ color: "#1e293b" }}>Discover more places worth visiting</h2>
        </div>
        <div className="destination-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.75rem" }}>
          {destinations.map((destination) => {
            const slug = destination.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <Link key={destination.title} to={`/places/${slug}`} className="destination-link" style={{ textDecoration: "none" }}>
                <motion.article 
                  className="destination-card" 
                  whileHover={{ 
                    y: -8,
                    scale: 1.01,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }} 
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01)",
                    position: "relative"
                  }}
                >
                  {/* Contextual Visual Destination Image Element */}
                  <div style={{ width: "100%", height: "180px", overflow: "hidden", position: "relative", backgroundColor: "#f1f5f9" }}>
                    <img 
                      src={destination.image} 
                      alt={destination.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    
                    {/* Optional Status Dynamic Badge Node Indicator */}
                    {destination.badge && (
                      <span style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(4px)",
                        color: "#0f172a",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                      }}>
                        {destination.badge}
                      </span>
                    )}
                  </div>

                  {/* Operational Destination Information Analytics Body container */}
                  <div style={{ padding: "1.25rem", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700", color: "#0f172a" }}>{destination.title}</h3>
                        <span style={{ fontSize: "0.8rem", color: "#0f766e", fontWeight: "600", textTransform: "uppercase" }}>{destination.state}</span>
                      </div>
                      
                      <p style={{ margin: "0.5rem 0 1rem 0", color: "#64748b", fontSize: "0.9rem", lineHeight: "1.5" }}>{destination.description}</p>
                    </div>

                    <div>
                      {/* Local Structural Highlights & Specialties Metadata tag */}
                      <div style={{ marginBottom: "1rem", fontSize: "0.8rem", color: "#475569" }}>
                        <span style={{ fontWeight: "600", color: "#0f766e" }}>Famous For:</span> {destination.specialty}
                      </div>

                      {/* Extended Environmental Chronological Log vectors row */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        borderTop: "1px solid #f1f5f9",
                        paddingTop: "0.85rem",
                        fontSize: "0.8rem",
                        color: "#64748b",
                        fontWeight: "500"
                      }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                          ☀ {destination.bestTime}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                          📅 {destination.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Corporate Visual Branding Travel Quote Component Footer Strip */}
      <footer style={{ marginTop: "5rem", padding: "3rem 1.5rem", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
        <p style={{ 
          margin: 0, 
          fontStyle: "italic", 
          fontSize: "1.15rem", 
          color: "#475569", 
          fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif",
          letterSpacing: "0.01em"
        }}>
          "Travel is the only thing you buy that makes you richer."
        </p>
        <div style={{ width: "24px", height: "2px", backgroundColor: "#0f766e", margin: "1rem auto 0 auto", borderRadius: "2px" }} />
      </footer>

    </main>
  );
};

export default Explore;