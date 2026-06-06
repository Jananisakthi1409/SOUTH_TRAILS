// src/pages/Packages/TamilNaduPackages.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import tamilNaduPackages, { tamilNaduCategories, tamilNaduBudgetFilters, tamilNaduDurationFilters } from "./tamilNaduPackageData";
import "./TamilNaduPackages.css";

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

const TamilNaduPackages = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Hero image slideshow
  const heroImages = Object.values(destinationImages).flat().slice(0, 5);
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Filter packages
  const filteredPackages = tamilNaduPackages.filter((pkg) => {
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
    <div className="tamil-nadu-packages-page">
      {/* Hero Section */}
      <section className="tnp-hero">
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
            Tamil Nadu Travel Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Explore handpicked experiences across Tamil Nadu
          </motion.p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="tnp-filters-section">
        <div className="tnp-container">
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
                {tamilNaduCategories.map((cat) => (
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
                {tamilNaduBudgetFilters.map((budget) => (
                  <label key={budget} className="filter-label">
                    <input
                      type="radio"
                      name="budget"
                      value={budget}
                      checked={selectedBudget === budget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                    />
                    <span>{budget}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div className="filter-box">
              <h3>Duration</h3>
              <div className="filter-options">
                {tamilNaduDurationFilters.map((duration) => (
                  <label key={duration} className="filter-label">
                    <input
                      type="radio"
                      name="duration"
                      value={duration}
                      checked={selectedDuration === duration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                    />
                    <span>{duration}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="results-count">
            Showing <strong>{filteredPackages.length}</strong> of{" "}
            <strong>{tamilNaduPackages.length}</strong> packages
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="tnp-packages-section">
        <div className="tnp-container">
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
                <p>Try adjusting your filters to find your perfect Tamil Nadu escape.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

// Package Card Component
const PackageCard = ({ pkg, images, index }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const displayImages = images.slice(0, 3);

  useEffect(() => {
    if (displayImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % displayImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  return (
    <motion.div
      className="tnp-package-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Gallery - Left Side (40%) */}
      <div className="card-image-section">
        <div className="image-gallery">
          {displayImages.length > 0 ? (
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
          ) : (
            <div className="no-image">No images available</div>
          )}

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

      {/* Info Section - Right Side (60%) */}
      <div className="card-info-section">
        <div className="info-header">
          <div>
            <p className="destination-label">{pkg.destination}</p>
            <h3>{pkg.title}</h3>
          </div>
          <div className="rating-badge">
            <span className="rating-value">{pkg.rating}</span>
            <span className="stars">★</span>
          </div>
        </div>

        <div className="package-meta">
          <div className="meta-item">
            <span className="meta-label">Duration</span>
            <span className="meta-value">{pkg.days}D / {pkg.nights}N</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Category</span>
            <span className="meta-value">{pkg.category}</span>
          </div>
        </div>

        <p className="package-description">{pkg.description}</p>

        <div className="places-covered">
          <strong>Places Covered:</strong>
          <p>{pkg.places.join(" • ")}</p>
        </div>

        <div className="card-footer">
          <div className="price-section">
            <span className="price-label">From</span>
            <span className="price-value">₹{pkg.price.toLocaleString()}</span>
            <span className="price-note">per person</span>
          </div>
          <Link to={`/tamil-nadu-package/${pkg.id}`} className="select-btn">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TamilNaduPackages;
