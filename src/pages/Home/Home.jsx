import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import heroVideo from "../../assets/videos/homeherosection.mp4";
import tamilnaduImg from "../../assets/images/tamilnadu.png";
import keralaImg from "../../assets/images/kerala.png";
import karnatakaImg from "../../assets/images/karnataka.png";
import andhraImg from "../../assets/images/andhra.png";

const stateCards = [
  {
    name: "Tamil Nadu",
    description: "Heritage temples, hill stations, and coastal luxury.",
    to: "/states/tamil-nadu",
    image: tamilnaduImg,
  },
  {
    name: "Kerala",
    description: "Backwaters, spice trails, and serene luxury escapes.",
    to: "/states/kerala",
    image: keralaImg,
  },
  {
    name: "Karnataka",
    description: "Coffee estates, heritage forts, and scenic adventures.",
    to: "/states/karnataka",
    image: karnatakaImg,
  },
  {
    name: "Andhra Pradesh",
    description: "Temple routes, coastal flavors, and premium local stays.",
    to: "/states/andhra-pradesh",
    image: andhraImg,
  },
];

const stats = [
  { label: "Destinations Managed", value: "120+" },
  { label: "Happy Travelers", value: "5000+" },
  { label: "Curated Packages", value: "200+" },
  { label: "Global Quality Awards", value: "15+" },
];

const whyItems = [
  { title: "Premium Curated Itineraries", desc: "Bespoke journey pacing designed by specialized local route architects." },
  { title: "Verified Luxury Guides", desc: "Certified, highly knowledgeable companions deep-rooted in native history." },
  { title: "Elite Hospitality Matrix", desc: "Hand-picked high-end boutique properties, villas, and premium transport logistics." },
  { title: "24/7 White-Glove Support", desc: "A proactive, dedicated concierge squad tracking your route live for instant help." },
];

const testimonials = [
  {
    quote: "A beautifully crafted South India journey with every single micro-detail completely taken care of.",
    author: "Priya S.",
    city: "Mumbai",
  },
  {
    quote: "From custom booking modifications to real-time travel support, the whole experience felt premium and effortless.",
    author: "Aarav K.",
    city: "Delhi",
  },
  {
    quote: "The itinerary introduced us to stunning hidden temples, private coffee estates, and world-class luxury stays.",
    author: "Nandini R.",
    city: "Bangalore",
  },
];

const trendingPackages = [
  { name: "Mysore Palace Experience", price: "₹8,999", rating: "4.9", days: "3 Days", tag: "💎 Heritage" },
  { name: "Backwater Houseboat Kerala", price: "₹12,999", rating: "5.0", days: "2 Days", tag: "🔥 Bestseller" },
  { name: "Coorg Coffee Trail", price: "₹9,499", rating: "4.8", days: "4 Days", tag: "🌿 Relaxing" },
  { name: "Tirupati Temple Tour", price: "₹7,999", rating: "4.9", days: "2 Days", tag: "🏛️ Spiritual" },
];

const travelCategories = [
  { icon: "🌿", label: "Peace & Calms", count: "45 Places" },
  { icon: "🏔️", label: "Adventure Trails", count: "32 Places" },
  { icon: "📸", label: "Hidden Gems", count: "28 Places" },
  { icon: "🍜", label: "Food & Spice Trails", count: "50 Places" },
  { icon: "🚗", label: "Scenic Road Trips", count: "18 Places" },
  { icon: "💕", label: "Romantic Escapes", count: "24 Places" }
];

const inspirationItems = [
  { title: "Misty Mornings in Munnar", type: "Hill Station", readTime: "4 min read", bg: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=cover&w=600&q=80" },
  { title: "Architecture Masterclass of Hampi", type: "Heritage Guide", readTime: "7 min read", bg: "https://images.unsplash.com/photo-1600100397990-a4783a03eb65?auto=format&fit=cover&w=600&q=80" },
  { title: "Unwinding on Varkala Cliffside", type: "Coastal Luxury", readTime: "5 min read", bg: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=cover&w=600&q=80" }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Interactive Simulation states for the customized Oracle AI component module
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Dynamic evaluation of custom user-generated feedback from localStorage matrix array
  const localReviews = JSON.parse(localStorage.getItem("southTrailsReviews") || "[]");
  const consolidatedReviews = [...testimonials, ...localReviews.map(r => ({
    quote: r.text || r.comment || "Incredible personalized travel support throughout the South India tour.",
    author: r.name || "Verified Guest",
    city: r.location || "India"
  }))];

  const handleAiConsultation = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setTimeout(() => {
      const answers = [
        "Based on your profile, I recommend a 4-Day Slow Heritage trail through Tamil Nadu (Madurai & Chettinad) staying in ancestral boutique villas, combined with private culinary sessions.",
        "Perfect match found: The Coorg-Kabab Trail. Enjoy 3 Days nestled in a premium coffee estate bungalow accompanied by a private guided spice-plantation walkthrough.",
        "Your ideal getaway points to a luxurious private houseboat escape across the Alleppey Backwaters in Kerala, coupled with wellness Ayurveda therapy blocks at Kovalam."
      ];
      setAiOutput(answers[Math.floor(Math.random() * answers.length)]);
      setIsAiLoading(false);
    }, 900);
  };

  return (
    <>
      <main className="app-shell landing-page" style={{ backgroundColor: "#ffffff", overflowX: "hidden" }}>
        
        {/* ========================================== */}
        {/* 1. HERO VIDEO SECTION                      */}
        {/* ========================================== */}
        <section className="section landing-hero landing-hero-video" style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <video className="hero-video" src={heroVideo} autoPlay muted loop playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} />
          <div className="hero-overlay landing-hero-overlay" style={{ position: "absolute", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(2px)", zIndex: 2 }} />
          
          <div className="hero-text" style={{ position: "relative", zIndex: 3, textAlign: "center", maxWidth: "850px", padding: "0 1.5rem", color: "#ffffff" }}>
            <p className="eyebrow accent-light" style={{ color: "#2dd4bf", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1rem" }}>South Trails</p>
            <h1 style={{ fontSize: "3.5rem", fontWeight: "900", lineHeight: "1.15", letterSpacing: "-0.03em", marginBottom: "1.5rem", color: "#ffffff" }}>Discover South India Like Never Before</h1>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#f1f5f9", marginBottom: "2.5rem", fontWeight: "400" }}>
              Luxury travel across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana and Puducherry with curated routes, authentic heritage stays, and premium service infrastructure.
            </p>
            
            {/* Integrated, clean responsive Search Overlay inside the Hero content layout context */}
            {/* <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "rgba(255, 255, 255, 0.15)", padding: "0.5rem", borderRadius: "12px", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", gap: "0.5rem" }}> */}
              {/* <input
                type="text"
                placeholder="Search destinations, luxury experiences, packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, border: "none", padding: "0.75rem 1.25rem", borderRadius: "8px", fontSize: "0.95rem", outline: "none", backgroundColor: "#ffffff" }}
              /> */}
              <Link to="/" style={{ backgroundColor: "#0f766e", color: "#ffffff", textDecoration: "none", padding: "0.75rem 1.5rem", borderRadius: "8px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "0.25rem", transition: "background 0.2s" }}>
                <span>🔍</span> Explore
              </Link>
            {/* </div> */}
          </div>
        </section>

        {/* ========================================== */}
        {/* 2. TRUST BAR SECTION                      */}
        {/* ========================================== */}
        <section className="section stats-section" style={{ padding: "2.5rem 1.5rem", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <div className="stats-container" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card" style={{ textAlign: "center", padding: "1rem" }}>
                <p className="stat-value" style={{ fontSize: "2.5rem", fontWeight: "900", color: "#0f766e", margin: 0 }}>{stat.value}</p>
                <p className="stat-label" style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "0.25rem" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* 3. EXPLORE STATES SECTION                  */}
        {/* ========================================== */}
        <section  className="section popular-destinations" style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-heading" style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "#0f766e", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Popular States</p>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#0f172a", marginTop: "0.5rem" }}>Choose from premium South India gateways</h2>
          </div>
          
          <div className="state-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {stateCards.map((state) => (
              <Link key={state.name} to={state.to} className="state-card-link" style={{ textDecoration: "none" }}>
                <article className="state-home-card glass-card" style={{ backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)", height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.3s, box-shadow 0.3s" }}>
                  <div className="state-card-media" style={{ height: "220px", position: "relative", overflow: "hidden" }}>
                    <div className="state-card-image" style={{ backgroundImage: `url(${state.image})`, width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="state-card-badge" style={{ position: "absolute", bottom: "12px", right: "12px", backgroundColor: "rgba(15, 118, 110, 0.95)", color: "#ffffff", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "700", backdropFilter: "blur(4px)" }}>Explore now</div>
                  </div>
                  <div className="state-card-body" style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.5rem 0" }}>{state.name}</h3>
                      <p style={{ fontSize: "0.925rem", color: "#475569", lineHeight: "1.5", margin: 0 }}>{state.description}</p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* 4. CURATED ESCAPES SECTION                 */}
        {/* ========================================== */}
        <section className="section trending-packages-section" style={{ padding: "5rem 1.5rem", backgroundColor: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
          <div className="max-width-wrapper" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="section-heading" style={{ marginBottom: "3rem" }}>
              <p className="eyebrow" style={{ color: "#0f766e", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Trending Now</p>
              <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#0f172a", marginTop: "0.5rem" }}>Most popular packages this season</h2>
            </div>
            
            <div className="trending-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "2rem" }}>
              {trendingPackages.map((pkg) => (
                <article key={pkg.name} className="trending-card glass-card" style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#0f766e", backgroundColor: "#f0fdfa", padding: "4px 10px", borderRadius: "6px" }}>{pkg.tag}</span>
                      <span className="rating" style={{ fontSize: "0.9rem", fontWeight: "700", color: "#f59e0b" }}>⭐ {pkg.rating}</span>
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.25rem 0", lineHeight: "1.3" }}>{pkg.name}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 1.5rem 0" }}>⚡ Private Guided &bull; {pkg.days}</p>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px solid #f1f5f9", paddingTop: "1rem", marginTop: "1rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Package Rate</span>
                      <strong className="trending-price" style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f766e" }}>{pkg.price}</strong>
                    </div>
                    <Link to="/packages" className="trending-btn" style={{ display: "block", textAlign: "center", textDecoration: "none", backgroundColor: "#0f766e", color: "#ffffff", padding: "0.65rem", borderRadius: "8px", fontWeight: "700", fontSize: "0.9rem", marginTop: "1rem", transition: "opacity 0.2s" }}>View Details →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 5. TRAVEL CATEGORIES SECTION               */}
        {/* ========================================== */}
        <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p style={{ color: "#0f766e", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Filter by Feeling</p>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#0f172a", marginTop: "0.5rem" }}>Inspiration mapped straight to your mood</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
            {travelCategories.map((cat, idx) => (
              <Link key={idx} to="/explore" style={{ textDecoration: "none" }}>
                <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "1.5rem", textAlign: "center", transition: "all 0.2s" }}
                     onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0f766e"; e.currentTarget.style.backgroundColor = "#f0fdfa"; }}
                     onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.backgroundColor = "#ffffff"; }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>{cat.icon}</span>
                  <h4 style={{ margin: "0 0 0.25rem 0", fontSize: "1rem", fontWeight: "700", color: "#0f172a" }}>{cat.label}</h4>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* 6. ORACLE AI SECTION                       */}
        {/* ========================================== */}
        <section style={{ padding: "4.5rem 1.5rem", backgroundColor: "#0f172a", color: "#ffffff", position: "relative" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span style={{ backgroundColor: "#1e293b", color: "#2dd4bf", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI Route Generator</span>
              <h3 style={{ fontSize: "2rem", fontWeight: "800", margin: "0.5rem 0 0.75rem 0" }}>Consult with Oracle AI</h3>
              <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0 }}>Describe your ultimate trip context (e.g., "3 days of quiet beaches and seafood in Kerala") to auto-generate routes.</p>
            </div>

            <form onSubmit={handleAiConsultation} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", backgroundColor: "#1e293b", padding: "0.75rem", borderRadius: "14px", border: "1px solid #334155" }}>
              <input 
                type="text" 
                placeholder="Where do you want to travel, and what is your current travel mood?" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                style={{ flex: 1, minWidth: "260px", border: "none", padding: "0.85rem 1rem", borderRadius: "8px", backgroundColor: "#0f172a", color: "#ffffff", outline: "none", fontSize: "0.95rem" }}
              />
              <button 
                type="submit" 
                disabled={isAiLoading}
                style={{ backgroundColor: "#0f766e", color: "#ffffff", border: "none", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: "700", fontSize: "0.95rem", cursor: "pointer", minWidth: "140px" }}
              >
                {isAiLoading ? "Analyzing..." : "Ask Oracle"}
              </button>
            </form>

            {aiOutput && (
              <div style={{ marginTop: "2rem", backgroundColor: "rgba(15, 118, 110, 0.15)", border: "1px solid #115e59", padding: "1.5rem", borderRadius: "12px", color: "#ccfbf1", lineHeight: "1.6", fontSize: "0.95rem" }}>
                <strong style={{ display: "block", color: "#2dd4bf", marginBottom: "0.4rem" }}>✨ Recommended Oracle Strategy:</strong>
                {aiOutput}
              </div>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* 7. TRAVELER REVIEWS SECTION                */}
        {/* ========================================== */}
        <section className="section testimonials" style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="section-heading" style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "#0f766e", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Traveler Stories</p>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#0f172a", marginTop: "0.5rem" }}>Real stories from real travelers</h2>
          </div>
          
          <div className="testimonial-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {consolidatedReviews.map((item, idx) => (
              <article key={idx} className="testimonial-card glass-card" style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "1.75rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div className="testimonial-avatar" style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "#f0fdfa", color: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "1.1rem" }}>
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <strong className="testimonial-author" style={{ display: "block", fontSize: "0.95rem", color: "#0f172a" }}>{item.author}</strong>
                      <span className="testimonial-city" style={{ fontSize: "0.8rem", color: "#64748b" }}>{item.city}</span>
                    </div>
                  </div>
                  <p className="testimonial-quote" style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#475569", italic: "true", margin: 0 }}>
                    "{item.quote}"
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* 8. WHY CHOOSE US SECTION                   */}
        {/* ========================================== */}
        <section className="section why-choose-us section-surface" style={{ padding: "5rem 1.5rem", backgroundColor: "#f8fafc", borderTop: "1px solid #f1f5f9" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="section-heading" style={{ marginBottom: "3.5rem", textAlign: "center" }}>
              <p className="eyebrow" style={{ color: "#0f766e", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Why Choose Us</p>
              <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#0f172a", marginTop: "0.5rem" }}>Designed for travelers who want premium experiences</h2>
            </div>
            
            <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
              {whyItems.map((item, idx) => (
                <article key={idx} className="feature-card glass-card" style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", padding: "1.75rem", borderRadius: "14px", boxShadow: "0 4px 6px rgba(0,0,0,0.01)" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#f0fdfa", color: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>✓</div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", margin: "0 0 0.5rem 0" }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b", lineHeight: "1.5" }}>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 9. TRAVEL INSPIRATION SECTION              */}
        {/* ========================================== */}
        <section style={{ padding: "5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ color: "#0f766e", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Get Inspired</p>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#0f172a", marginTop: "0.5rem" }}>Insights from our regional field curators</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {inspirationItems.map((blog, bIdx) => (
              <div key={bIdx} style={{ backgroundColor: "#ffffff", borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <div style={{ height: "180px", backgroundImage: `url(${blog.bg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ padding: "1.25rem" }}>
                  <span style={{ color: "#0f766e", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase" }}>{blog.type}</span>
                  <h4 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", margin: "0.4rem 0 0.75rem 0" }}>{blog.title}</h4>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>⏱️ {blog.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* 10. FINAL CTA SECTION                      */}
        {/* ========================================== */}
        <section style={{ padding: "4.5rem 2rem", background: "linear-gradient(135deg, #115e59 0%, #0f766e 100%)", textAlign: "center", color: "#ffffff" }}>
          <div style={{ maxWidth: "650px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: "900", marginBottom: "1rem", letterSpacing: "-0.02em" }}>Ready to Plan Your Escape?</h2>
            <p style={{ color: "#ccfbf1", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              Connect with our dedicated destination owners for premium travel consulting and private customizable logistics mappings.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/packages" style={{ backgroundColor: "#ffffff", color: "#0f766e", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: "700", textDecoration: "none", fontSize: "0.95rem" }}>
                Explore All Packages
              </Link>
              <Link to="/contact" style={{ backgroundColor: "transparent", color: "#ffffff", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: "700", textDecoration: "none", fontSize: "0.95rem", border: "1px solid #ffffff" }}>
                Talk to an Expert
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Home;