// src/pages/Packages/KeraPackages.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { filterOptions } from "./keraPackageData";
import { getPackages } from "../../services/packageService";
import "./KeraPackages.css";

// Import all destination images dynamically
const imageModules = import.meta.glob("../state/kerala/**/*.{png,jpg,jpeg}", { eager: true });

// Map images by destination folder
const destinationImages = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .reduce((map, [path, moduleValue]) => {
    const normalized = path.replace(/\\/g, "/");
    const match = normalized.match(/kerala\/([^/]+)\/[^/]+\.(png|jpe?g)$/i);
    if (!match) return map;

    const folder = match[1];
    const src = moduleValue.default || moduleValue;
    map[folder] = [...(map[folder] || []), src];
    return map;
  }, {});

const KeraPackages = () => {
  const [keraPackages, setKeraPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Load packages from service
  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      const packages = await getPackages({ state: "Kerala" });
      setKeraPackages(packages);
      setLoading(false);
    };
    loadPackages();
  }, []);

  // Hero image slideshow
  const heroImages = Object.values(destinationImages).flat().slice(0, 5);
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Filter packages
  const filteredPackages = keraPackages.filter((pkg) => {
    const categoryMatch = selectedCategory === "All" || pkg.category === selectedCategory;
    let budgetMatch = true;
    if (selectedBudget === "Under ₹8000") budgetMatch = pkg.price < 8000;
    else if (selectedBudget === "₹8000–₹12000") budgetMatch = pkg.price >= 8000 && pkg.price <= 12000;
    else if (selectedBudget === "Above ₹12000") budgetMatch = pkg.price > 12000;

    let durationMatch = true;
    if (selectedDuration === "1–2 Days") durationMatch = pkg.days <= 2;
    else if (selectedDuration === "3–4 Days") durationMatch = pkg.days >= 3 && pkg.days <= 4;
    else if (selectedDuration === "5+ Days") durationMatch = pkg.days >= 5;

    return categoryMatch && budgetMatch && durationMatch;
  });

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedBudget("All");
    setSelectedDuration("All");
  };

  return (
    <div className="kera-packages-page">
      {/* Hero Section */}
      <section className="kp-hero">
        <div className="hero-slideshow">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`hero-slide ${idx === heroImageIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Kerala Travel Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Explore handpicked experiences across God's Own Country
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="kp-filters-section">
        <div className="kp-container">
          <div className="filters-header">
            <h2>Filter Packages</h2>
            <button className="reset-btn" onClick={resetFilters}>
              Reset All
            </button>
          </div>

          <div className="filters-grid">
            {/* Category Filter */}
            <div className="filter-box">
              <h3>Category</h3>
              <div className="filter-options">
                {filterOptions.categories.map((cat) => (
                  <label key={cat} className="filter-label">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Filter */}
            <div className="filter-box">
              <h3>Budget</h3>
              <div className="filter-options">
                {filterOptions.budgets.map((budget) => (
                  <label key={budget.label} className="filter-label">
                    <input
                      type="radio"
                      name="budget"
                      value={budget.label}
                      checked={selectedBudget === budget.label}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                    />
                    <span>{budget.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div className="filter-box">
              <h3>Duration</h3>
              <div className="filter-options">
                {filterOptions.durations.map((duration) => (
                  <label key={duration.label} className="filter-label">
                    <input
                      type="radio"
                      name="duration"
                      value={duration.label}
                      checked={selectedDuration === duration.label}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                    />
                    <span>{duration.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="results-count">
            Showing <strong>{filteredPackages.length}</strong> of{" "}
            <strong>{keraPackages.length}</strong> packages
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="kp-packages-section">
        <div className="kp-container">
          {loading ? (
            <div className="loading">Loading packages...</div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredPackages.length > 0 ? (
                <div className="packages-list">
                  {filteredPackages.map((pkg, idx) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      images={destinationImages[pkg.imageFolder] || []}
                      index={idx}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  className="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2>No packages found</h2>
                  <p>Try adjusting your filters to find your perfect Kerala escape.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
};

// Package Card Component
const PackageCard = ({ pkg, images, index }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const fallbackImages = Object.values(destinationImages).flat().slice(0, 3);
  const displayImages = images && images.length ? images.slice(0, 3) : fallbackImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % Math.max(1, displayImages.length));
    }, 3000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  return (
    <motion.div
      className="kp-package-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Gallery - Left Side (40%) */}
      <div className="card-image-section">
        <div className="image-gallery">
            <div className="gallery-container">
              {displayImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${pkg.destination} ${idx + 1}`}
                  className={`gallery-image ${idx === currentImageIdx ? "active" : ""}`}
                />
              ))}
            </div>

          {displayImages.length > 1 && (
            <div className="gallery-indicators">
              {displayImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === currentImageIdx ? "active" : ""}`}
                  onClick={() => setCurrentImageIdx(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info & Action - Right Side (60%) */}
      <div className="card-info-section">
        <div className="card-header">
          <h3 className="package-title">{pkg.title}</h3>
          <span className="category-badge">{pkg.category}</span>
        </div>

        <div className="package-meta">
          <div className="meta-item">
            <span className="meta-label">Duration</span>
            <span className="meta-value">
              {pkg.days}D/{pkg.nights}N
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Rating</span>
            <span className="meta-value">
              ⭐ {pkg.rating}
            </span>
          </div>
        </div>

        <p className="package-description">{pkg.description}</p>

        <div className="places-highlight">
          <p className="places-label">Places Covered:</p>
          <p className="places-list">{pkg.places.join(", ")}</p>
        </div>

        <div className="card-footer">
          <div className="price-section">
            <span className="price-label">Starting from</span>
            <span className="price-value">₹{pkg.price.toLocaleString()}</span>
          </div>
          <Link to={`/kerala-package/${pkg.id}`} className="select-btn">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default KeraPackages;
