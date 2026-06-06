import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";

const Booking = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  
  // State variables from original implementation
  const [travelDate, setTravelDate] = useState("");
  const [people, setPeople] = useState("2");
  const [selectedPackage, setSelectedPackage] = useState("Ooty Family Escape");
  const [error, setError] = useState("");

  // Additional design system state variables
  const [contactNumber, setContactNumber] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  // Experience Packages Catalog Matrix Data
  const packagesCatalog = {
    "Ooty Family Escape": {
      pricePerPerson: 29998,
      state: "Tamil Nadu",
      duration: "4 Days / 3 Nights",
      img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=cover&w=800&q=80",
      description: "Experience pristine botanical sanctuaries, mist-covered mountain peaks, and heritage toy-train excursions across Nilgiri valleys."
    },
    "Kodaikanal Family Retreat": {
      pricePerPerson: 24999,
      state: "Tamil Nadu",
      duration: "5 Days / 4 Nights",
      img: "https://images.unsplash.com/photo-1626593510484-df0a19e1eef4?auto=format&fit=cover&w=800&q=80",
      description: "Wander through sublime pine forests, quiet volcanic crater lakes, and dramatic star-gazing pillars of the pristine Western Ghats."
    },
    "Yercaud Family Tour": {
      pricePerPerson: 19999,
      state: "Tamil Nadu",
      duration: "3 Days / 2 Nights",
      img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=cover&w=800&q=80",
      description: "Discover the serene jewel of the Shevaroy Hills—renowned for vast coffee estates, historical colonial architecture, and quiet lakes."
    }
  };

  const currentPackage = packagesCatalog[selectedPackage] || packagesCatalog["Ooty Family Escape"];
  const numericPeople = parseInt(people, 10) || 2;
  const grandTotalNumeric = currentPackage.pricePerPerson * numericPeople;
  const formattedGrandTotal = `₹${grandTotalNumeric.toLocaleString("en-IN")}`;

  const handleContinue = () => {
    if (!travelDate) {
      setError("Please select a travel date before continuing.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!isAuthenticated) {
      // Functional fallback logic requirement fulfilled visually below via inline premium card interaction
      setError("Authentication required. Please login or create an account to process this itinerary.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const storedBookings = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
    const nextBooking = {
      id: `BK-${Date.now()}`,
      packageName: selectedPackage,
      travelDate,
      travelers: people,
      status: "Pending",
      price: formattedGrandTotal,
      contactNumber,
      specialRequests
    };

    window.localStorage.setItem("southTrailsBookings", JSON.stringify([...storedBookings, nextBooking]));
    
    setSuccessToast(true);
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 5%", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", boxSizing: "border-box" }}>
      
      {/* Dynamic Success Toast Notification Banner */}
      {successToast && (
        <div style={{ position: "fixed", top: "24px", right: "24px", backgroundColor: "#0f766e", color: "#ffffff", padding: "16px 28px", borderRadius: "10px", boxShadow: "0 10px 25px -5px rgba(15, 118, 110, 0.3)", zIndex: 1100, display: "flex", flexDirection: "column", gap: "4px", animation: "slideIn 0.3s ease-out" }}>
          <span style={{ fontWeight: "700", fontSize: "15px" }}>✓ Booking Registered Successfully</span>
          <span style={{ fontSize: "13px", opacity: 0.9 }}>Routing itinerary to your profile ledger dashboards...</span>
        </div>
      )}

      {/* Structured Checkout Progress Indicator */}
      <div style={{ maxWidth: "1200px", margin: "0 auto 32px auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#14b8a6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</div>
          <span style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>Select Experience</span>
        </div>
        <div style={{ width: "48px", height: "2px", backgroundColor: "#14b8a6" }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#0f766e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</div>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#0f766e" }}>Confirm Details</span>
        </div>
        <div style={{ width: "48px", height: "2px", backgroundColor: "#e2e8f0" }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#e2e8f0", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</div>
          <span style={{ fontSize: "13px", fontWeight: "500", color: "#94a3b8" }}>Secure Checkout</span>
        </div>
      </div>

      {/* Error Announcement Block */}
      {error && (
        <div style={{ maxWidth: "1200px", margin: "0 auto 24px auto", padding: "16px 24px", backgroundColor: "#fef2f2", borderLeft: "4px solid #ef4444", borderRadius: "8px", color: "#991b1b", fontSize: "14px", fontWeight: "500", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
          {error}
        </div>
      )}

      {/* Main Structural Dual-Column Interface Layout */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "flex-start" }}>
        
        {/* Left Column: Premium Interactive Package Spotlight Summary Card */}
        <section style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)" }}>
            
            <div style={{ height: "260px", width: "100%", position: "relative", backgroundColor: "#cbd5e1" }}>
              <img src={currentPackage.img} alt={selectedPackage} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: "16px", left: "16px", backgroundColor: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(8px)", padding: "6px 14px", borderRadius: "8px", color: "#ffffff", fontSize: "12px", fontWeight: "600", letterSpacing: "0.03em" }}>
                📍 {currentPackage.state}
              </div>
            </div>

            <div style={{ padding: "32px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#14b8a6", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>Selected Expedition</span>
              <h2 style={{ margin: "0 0 12px 0", fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em" }}>{selectedPackage}</h2>
              <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>{currentPackage.description}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 0 0", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Duration Matrix</span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#334155" }}>{currentPackage.duration}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Base Rates</span>
                  <span style={{ fontSize: "18px", fontWeight: "800", color: "#0f766e" }}>₹{currentPackage.pricePerPerson.toLocaleString("en-IN")}<span style={{ fontSize: "12px", color: "#64748b", fontWeight: "500" }}> / pax</span></span>
                </div>
              </div>
            </div>

          </div>

          {/* Premium Corporate Trust Assurance Cluster */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", textAlign: "center" }}>
            <div>
              <span style={{ display: "block", fontSize: "18px", marginBottom: "4px" }}>🛡️</span>
              <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>Secure Booking</span>
              <span style={{ fontSize: "10px", color: "#64748b" }}>SSL Encrypted Layer</span>
            </div>
            <div style={{ borderLeft: "1px solid #f1f5f9", borderRight: "1px solid #f1f5f9" }}>
              <span style={{ display: "block", fontSize: "18px", marginBottom: "4px" }}>💎</span>
              <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>Trusted Partner</span>
              <span style={{ fontSize: "10px", color: "#64748b" }}>Verified Hospitality</span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: "18px", marginBottom: "4px" }}>🗺️</span>
              <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>South Specialist</span>
              <span style={{ fontSize: "10px", color: "#64748b" }}>Curated Local Guides</span>
            </div>
          </div>
        </section>

        {/* Right Column: Interactive Configuration Form & Pricing Engine Layout */}
        <section style={{ flex: "1.2 1 520px", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "40px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)" }}>
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.025em" }}>Confirm Travel Details</h1>
            <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#64748b" }}>Complete fields below to lock down active corporate allotments.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Select Corporate Travel Package</label>
              <select value={selectedPackage} onChange={(e) => { setSelectedPackage(e.target.value); setError(""); }} style={{ padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", backgroundColor: "#ffffff", outline: "none", fontWeight: "500" }}>
                <option value="Ooty Family Escape">Ooty Family Escape</option>
                <option value="Kodaikanal Family Retreat">Kodaikanal Family Retreat</option>
                <option value="Yercaud Family Tour">Yercaud Family Tour</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Target Travel Date</label>
                <input type="date" value={travelDate} onChange={(e) => { setTravelDate(e.target.value); setError(""); }} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none", backgroundColor: "#ffffff" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Total Ticketed Passengers</label>
                <select value={people} onChange={(e) => setPeople(e.target.value)} style={{ padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", backgroundColor: "#ffffff", outline: "none" }}>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5">5 Persons</option>
                  <option value="6">6 Persons</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Primary Contact Number <span style={{ color: "#94a3b8", fontWeight: "400" }}>(Optional)</span></label>
              <input type="tel" placeholder="e.g., +91 98765 43210" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Special Requests / Notes <span style={{ color: "#94a3b8", fontWeight: "400" }}>(Optional)</span></label>
              <textarea placeholder="Dietary profiles, wheelchair access parameters, or bed configuration preferences..." value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} rows="2" style={{ padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none", fontFamily: "inherit", resize: "none" }}></textarea>
            </div>

            {/* Dynamic Real-Time Live Summary Breakdown Ledger */}
            <div style={{ backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px", marginTop: "8px" }}>
              <h4 style={{ margin: "0 0 14px 0", fontSize: "14px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.02em" }}>Dynamic Statement Invoicing</h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", borderBottom: "1px solid #e2e8f0", paddingBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                  <span>Base Premium Allotment Rate</span>
                  <span>₹{currentPackage.pricePerPerson.toLocaleString("en-IN")} x {numericPeople}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                  <span>Local State Destination Taxes & Surcharges</span>
                  <span style={{ color: "#16a34a", fontWeight: "600" }}>Included</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px" }}>
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Estimated Aggregate Grand Total</span>
                <span style={{ fontSize: "22px", fontWeight: "800", color: "#0f766e" }}>{formattedGrandTotal}</span>
              </div>
            </div>

            {/* Interactive Authentication Check Module Block Component */}
            {!isAuthenticated ? (
              <div style={{ marginTop: "8px", padding: "20px", backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "13px", color: "#b45309", fontWeight: "500", lineHeight: "1.5" }}>
                  ⚠️ <strong>Authentication holding intercept triggered:</strong> To complete this secure booking and attach this custom itinerary layout to your customer profile workspace, register an account profile.
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="button" onClick={() => navigate("/login")} style={{ flex: 1, padding: "10px", borderRadius: "6px", backgroundColor: "#ffffff", border: "1px solid #d97706", color: "#b45309", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>Account Log In</button>
                  <button type="button" onClick={() => navigate("/signup", { state: { message: "Please create an account to finalize your custom package reservation ledger parameters." } })} style={{ flex: 1, padding: "10px", borderRadius: "6px", backgroundColor: "#d97706", border: "none", color: "#ffffff", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>Register Space</button>
                </div>
              </div>
            ) : (
              <button 
                type="button" 
                onClick={handleContinue}
                onMouseEnter={() => setHoveredBtn(true)}
                onMouseLeave={() => setHoveredBtn(false)}
                style={{ 
                  width: "100%", 
                  padding: "16px", 
                  borderRadius: "8px", 
                  backgroundColor: hoveredBtn ? "#0f766e" : "#14b8a6", 
                  color: "#ffffff", 
                  border: "none", 
                  fontWeight: "700", 
                  fontSize: "15px", 
                  cursor: "pointer", 
                  boxShadow: "0 4px 12px rgba(20, 184, 166, 0.2)", 
                  transition: "all 0.15s ease-in-out",
                  marginTop: "8px" 
                }}
              >
                Confirm Booking Allocation
              </button>
            )}

          </form>
        </section>

      </div>
    </main>
  );
};

export default Booking;