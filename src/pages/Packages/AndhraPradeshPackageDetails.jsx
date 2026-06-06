// src/pages/Packages/AndhraPradeshPackageDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import { motion } from "framer-motion";
import { getPackageById } from "../../services/packageService";
import "./AndhraPradeshPackageDetails.css";

// Import all destination images dynamically
const imageModules = import.meta.glob("../state/andhra/**/*.{png,jpg,jpeg}", { eager: true });

// Map images by destination folder
const destinationImages = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .reduce((map, [path, moduleValue]) => {
    const normalized = path.replace(/\\/g, "/");
    const match = normalized.match(/andhra\/([^/]+)\/[^/]+\.(png|jpe?g)$/i);
    if (!match) return map;

    const folder = match[1];
    const src = moduleValue.default || moduleValue;
    map[folder] = [...(map[folder] || []), src];
    return map;
  }, {});

const AndhraPradeshPackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackage = async () => {
      setLoading(true);
      const loadedPkg = await getPackageById(packageId);
      setPkg(loadedPkg);
      setLoading(false);
    };
    loadPackage();
  }, [packageId]);

  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showSuccess, setShowSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const { isAuthenticated } = useAuthContext();
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState(2);

  if (loading) {
    return <div className="package-loading">Loading package...</div>;
  }

  if (!pkg) {
    return (
      <div className="package-not-found">
        <h1>Package Not Found</h1>
        <button onClick={() => navigate("/andhra-pradesh-packages")}>Back to Packages</button>
      </div>
    );
  }

  const handleProceedToBooking = () => {
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
      navigate("/signup", {
        state: {
          message: "Please create an account or login to continue booking.",
          selectedPackage: selected,
        },
      });
      return;
    }

    const stored = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
    window.localStorage.setItem("southTrailsBookings", JSON.stringify([...stored, selected]));
    navigate("/profile");
  };

  const handleOkSuccess = () => {
    setShowSuccess(false);
    navigate("/");
  };

  if (!pkg) {
    return (
      <div className="package-not-found">
        <h1>Package Not Found</h1>
        <button onClick={() => navigate("/andhra-packages")}>Back to Packages</button>
      </div>
    );
  }

  const galleryImages = destinationImages[pkg.imageFolder] || [];

  return (
    <div className="aapd-page">
      {/* Hero Gallery */}
      <section className="aapd-hero-gallery">
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

      <div className="aapd-container">
        <div className="aapd-content">
          {/* Package Overview */}
          <section className="aapd-overview">
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
          <section className="aapd-section">
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
          <section className="aapd-section">
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
          <section className="aapd-section">
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
        <aside className="aapd-sidebar">
          <div className="booking-card">
            <h3>Book Your Package</h3>

            <div className="booking-form">
              <div className="form-group">
                <label>Number of Travelers</label>
                <input type="number" placeholder="e.g., 2" min="1" defaultValue="2" />
              </div>

              <div className="form-group">
                <label>Travel Date</label>
                <input type="date" />
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

              <button className="book-btn" onClick={handleProceedToBooking}>Proceed to Booking</button>
              <button className="back-btn" onClick={() => navigate("/andhra-packages")}>
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

      {/* Success Modal */}
      {showSuccess && (
        <div className="aapd-modal-overlay">
          <motion.div
            className="aapd-success-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="success-header">
              <div className="success-icon">🎉</div>
              <h2>Request Submitted Successfully!</h2>
              <p className="success-subtitle">Thank you for choosing South India Travels.</p>
            </div>

            <div className="success-message">
              <p>Your travel request has been received and assigned to one of our travel experts.</p>
              <div className="reference-box">
                <span className="ref-label">Reference ID:</span>
                <span className="ref-value">{referenceId}</span>
              </div>
            </div>

            <div className="success-assurance">
              <h3>What Happens Next?</h3>
              <ul className="assurance-list">
                <li><span className="check">✓</span> Our travel expert will review your requirements.</li>
                <li><span className="check">✓</span> You will receive a call within 24 hours.</li>
                <li><span className="check">✓</span> A customized itinerary will be prepared.</li>
                <li><span className="check">✓</span> Hotel and transport options will be shared.</li>
                <li><span className="check">✓</span> Final trip confirmation will be done after your approval.</li>
              </ul>
            </div>

            <button className="aapd-ok-btn" onClick={handleOkSuccess}>OK</button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AndhraPradeshPackageDetails;
