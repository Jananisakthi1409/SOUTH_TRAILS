// src/pages/Packages/TamilNaduPackageDetails.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import { motion } from "framer-motion";
import tamilNaduPackages from "./tamilNaduPackageData";
import "./TamilNaduPackageDetails.css";

// Import all destination images dynamically
const imageModules = import.meta.glob("../state/tamilnadu/**/*.{png,jpg,jpeg}", { eager: true });

// Map images by destination folder
const destinationImages = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .reduce((map, [path, moduleValue]) => {
    const normalized = path.replace(/\\/g, "/");
    const match = normalized.match(/tamilnadu\/([^/]+)\/[^/]+\.(png|jpe?g)$/i);
    if (!match) return map;

    const folder = match[1];
    const src = moduleValue.default || moduleValue;
    map[folder] = [...(map[folder] || []), src];
    return map;
  }, {});

const TamilNaduPackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const pkg = tamilNaduPackages.find((p) => p.id === packageId);

  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const { isAuthenticated } = useAuthContext();
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState(2);

  if (!pkg) {
    return (
      <div className="package-not-found">
        <h1>Package Not Found</h1>
        <button onClick={() => navigate("/tamil-nadu-packages")}>Back to Packages</button>
      </div>
    );
  }

  const galleryImages = destinationImages[pkg.imageFolder] || [];

  return (
    <div className="tnpd-page">
      {/* Hero Gallery */}
      <section className="tnpd-hero-gallery">
        <div className="main-image">
          {galleryImages.length > 0 ? (
            <img src={galleryImages[selectedGalleryImage]} alt={pkg.title} />
          ) : (
            <div className="no-image-placeholder">No images available</div>
          )}
        </div>

        {galleryImages.length > 1 && (
          <div className="gallery-thumbnails">
            {galleryImages.slice(0, 6).map((img, idx) => (
              <button
                key={idx}
                className={`thumbnail ${idx === selectedGalleryImage ? "active" : ""}`}
                onClick={() => setSelectedGalleryImage(idx)}
              >
                <img src={img} alt={`View ${idx + 1}`} />
              </button>
            ))}
            {galleryImages.length > 6 && (
              <button className="thumbnail more">+{galleryImages.length - 6}</button>
            )}
          </div>
        )}
      </section>

      <div className="tnpd-container">
        <div className="tnpd-content">
          {/* Package Overview */}
          <section className="tnpd-overview">
            <div className="overview-header">
              <div>
                <p className="destination-label">{pkg.destination}</p>
                <h1>{pkg.title}</h1>
                <div className="rating-line">
                  <span className="rating">{pkg.rating} ★</span>
                  <span className="category-badge">{pkg.category}</span>
                </div>
              </div>
              <div className="price-card">
                <p className="price-label">From</p>
                <p className="price-value">₹{pkg.price.toLocaleString()}</p>
                <p className="price-note">per person</p>
              </div>
            </div>

            <p className="package-description">{pkg.description}</p>

            <div className="quick-info">
              <div className="info-item">
                <span className="info-label">Duration</span>
                <span className="info-value">{pkg.days} Days / {pkg.nights} Nights</span>
              </div>
              <div className="info-item">
                <span className="info-label">Best For</span>
                <span className="info-value">{pkg.category}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Rating</span>
                <span className="info-value">{pkg.rating}/5.0</span>
              </div>
            </div>
          </section>

          {/* Places Covered */}
          <section className="tnpd-section">
            <h2>Places Covered</h2>
            <div className="places-grid">
              {pkg.places.map((place, idx) => (
                <motion.div
                  key={idx}
                  className="place-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="place-number">{idx + 1}</div>
                  <p>{place}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What's Included */}
          <section className="tnpd-section">
            <h2>What's Included</h2>
            <div className="included-list">
              {pkg.included.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="included-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span className="checkmark">✓</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Highlights */}
          <section className="tnpd-section">
            <h2>Highlights</h2>
            <div className="highlights-grid">
              {pkg.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  className="highlight-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="highlight-icon">✨</div>
                  <p>{highlight}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Booking Sidebar */}
        <aside className="tnpd-sidebar">
          <div className="booking-card">
            <h3>Book Your Package</h3>

            <div className="booking-form">
              <div className="form-group">
                <label>Number of Travelers</label>
                <input
                  type="number"
                  placeholder="e.g., 2"
                  min="1"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Travel Date</label>
                <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="+91 XXXXXXXXXX" />
              </div>

              <div className="payment-section">
                <label>Payment Method</label>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Online Payment</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="arrival"
                      checked={paymentMethod === "arrival"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Cash On Arrival</span>
                  </label>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="breakdown-item">
                  <span>Package Price (per person)</span>
                  <span>₹{pkg.price.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                  <span>Number of Persons</span>
                  <span>2</span>
                </div>
                <div className="breakdown-total">
                  <span>Total</span>
                  <span>₹{(pkg.price * 2).toLocaleString()}</span>
                </div>
              </div>

              <button
                className="book-btn"
                onClick={() => {
                  const selected = {
                    id: `BK-${Date.now()}`,
                    packageId: pkg.id,
                    packageName: pkg.title,
                    state: pkg.destination,
                    price: `₹${pkg.price}`,
                    packageImage: galleryImages[0] || "",
                    travelDate: travelDate || "",
                    travelers: Number(travelers) || 1,
                    status: "Pending",
                  };

                  if (!isAuthenticated) {
                    navigate("/signup", { state: { message: "Please create an account or login to continue booking.", selectedPackage: selected } });
                    return;
                  }
                  const stored = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
                  window.localStorage.setItem("southTrailsBookings", JSON.stringify([...stored, selected]));
                  navigate("/profile");
                }}
              >
                Proceed to Booking
              </button>
              <button className="back-btn" onClick={() => navigate("/tamil-nadu-packages")}>
                Back to Packages
              </button>
            </div>

            <div className="booking-info">
              <p>✓ Free Cancellation up to 7 days before travel</p>
              <p>✓ 24/7 Customer Support</p>
              <p>✓ Best Price Guarantee</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TamilNaduPackageDetails;
