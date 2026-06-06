import { useEffect, useState } from "react";
import { getPackages } from "../../services/packageService";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { categories, budgetFilters, durationFilters } from "./packages";
import tamilnaduImg from "../../assets/images/tamilnadu.png";
import "./PackagesBrowse.css";
//import { seedPackagesToSupabase } from "../../services/packageService";
const imageModules = import.meta.glob("../state/tamilnadu/**/*.{png,jpg,jpeg}", { eager: true });
const stateImageMap = Object.entries(imageModules)
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

const PackagesBrowse = () => {
  const navigate = useNavigate();
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    const data = await getPackages();

    if (data && data.length > 0) {
      // Mapping layer to ensure Supabase property names align safely with UI expectations
      const mappedPackages = data.map((pkg) => ({
        id: pkg.id,
        title: pkg.title,
        destination: pkg.destination,
        category: pkg.category,
        days: pkg.days,
        nights: pkg.nights,
        rating: Number(pkg.rating) || 0,
        price: Number(pkg.price) || 0,
        places: Array.isArray(pkg.places) ? pkg.places : typeof pkg.places === "string" ? pkg.places.split(",").map(p => p.trim()) : [],
        imageFolder: pkg.imageFolder || pkg.image_folder || ""
      }));
      setPackagesData(mappedPackages);
    }
    setLoading(false);
  };

  // Get first 10 packages
  const firstTenPackages = packagesData.slice(0, 10);

  // Filter logic
  const filteredPackages = firstTenPackages.filter((pkg) => {
    const categoryMatch = selectedCategory === "All" || pkg.category === selectedCategory;
    const ratingMatch = pkg.rating >= minRating;

    let budgetMatch = true;
    if (selectedBudget === "Under 8000") budgetMatch = pkg.price < 8000;
    else if (selectedBudget === "8000-12000") budgetMatch = pkg.price >= 8000 && pkg.price <= 12000;
    else if (selectedBudget === "Above 12000") budgetMatch = pkg.price > 12000;

    let durationMatch = true;
    if (selectedDuration === "1-2 Days") durationMatch = pkg.days <= 2;
    else if (selectedDuration === "3-4 Days") durationMatch = pkg.days >= 3 && pkg.days <= 4;
    else if (selectedDuration === "5+ Days") durationMatch = pkg.days >= 5;

    return categoryMatch && ratingMatch && budgetMatch && durationMatch;
  });

  // Sort logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const togglePackageSelection = (packageId) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId) ? prev.filter((id) => id !== packageId) : [...prev, packageId]
    );
  };

  const handleConfirm = () => {
    if (selectedPackages.length > 0) {
      navigate("/");
    }
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedBudget("All");
    setSelectedDuration("All");
    setMinRating(0);
    setSortBy("rating");
  };

  return (
    
    <main className="packages-browse-page">
      <section className="packages-hero">
        <h1>Explore Curated Packages</h1>
        <p>Find your perfect South India escape with our Airbnb-style filters</p>
      </section>

      <div className="packages-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar glass-card">
          <div className="filters-header">
            <h2>Filters</h2>
            <button className="reset-filters-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-options">
              {categories.map((cat) => (
                <label key={cat} className="filter-option">
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
          <div className="filter-group">
            <h3>Budget</h3>
            <div className="filter-options">
              {budgetFilters.map((budget) => (
                <label key={budget} className="filter-option">
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
          <div className="filter-group">
            <h3>Duration</h3>
            <div className="filter-options">
              {durationFilters.map((duration) => (
                <label key={duration} className="filter-option">
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

          {/* Rating Filter */}
          <div className="filter-group">
            <h3>Minimum Rating</h3>
            <div className="rating-slider">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="slider"
              />
              <div className="rating-value">
                <span>{minRating.toFixed(1)} ★</span>
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <h3>Sort By</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Selection Summary */}
          <div className="selection-summary">
            <p className="summary-text">
              {selectedPackages.length > 0
                ? `${selectedPackages.length} package${selectedPackages.length > 1 ? "s" : ""} selected`
                : "No packages selected"}
            </p>
            <button
              className={`confirm-btn ${selectedPackages.length > 0 ? "active" : ""}`}
              onClick={handleConfirm}
              disabled={selectedPackages.length === 0}
            >
              Confirm & Go Home
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="packages-main">
          <div className="packages-header">
            <p className="results-count">
              Showing <strong>{sortedPackages.length}</strong> of{" "}
              <strong>{firstTenPackages.length}</strong> packages
            </p>
          </div>

          {loading ? (
            <div className="loading">Loading packages...</div>
          ) : (
            <AnimatePresence mode="wait">
              {sortedPackages.length > 0 ? (
                <motion.div
                  className="packages-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {sortedPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      isSelected={selectedPackages.includes(pkg.id)}
                      onToggle={() => togglePackageSelection(pkg.id)}
                      images={stateImageMap[pkg.imageFolder] || []}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="no-results glass-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2>No packages found</h2>
                  <p>Try adjusting your filters to find your perfect escape.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>
      </div>
    </main>
  );
};

const PackageCard = ({ pkg, isSelected, onToggle, images }) => {
  const visibleImages = images.length ? images.slice(0, 3) : [tamilnaduImg, tamilnaduImg, tamilnaduImg];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      className={`package-browse-card glass-card ${isSelected ? "selected" : ""}`}
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {/* Selection Checkbox */}
      <label className="selection-checkbox">
        <input type="checkbox" checked={isSelected} onChange={onToggle} />
        <span className="checkmark"></span>
      </label>

      {/* Package Image */}
      <div className="package-image-container">
        <div className="image-carousel">
          {visibleImages.map((src, idx) => (
            <div
              key={idx}
              className={`carousel-slide ${idx === activeIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
        <div className="image-indicators">
          {visibleImages.map((_, idx) => (
            <button
              key={idx}
              className={`indicator ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Package Info */}
      <div className="package-info">
        <p className="destination-label">{pkg.destination}</p>
        <h3>{pkg.title}</h3>

        <div className="package-meta">
          <div className="meta-item">
            <span className="label">Duration</span>
            <span className="value">{pkg.days}D / {pkg.nights}N</span>
          </div>
          <div className="meta-item">
            <span className="label">Rating</span>
            <span className="value">
              {pkg.rating.toFixed(1)} <span className="star">★</span>
            </span>
          </div>
        </div>

        <p className="places-covered">
          <strong>Places:</strong> {pkg.places.join(", ")}
        </p>

        <div className="package-footer">
          <div className="price">
            <span className="label">From</span>
            <span className="amount">₹{pkg.price.toLocaleString()}</span>
          </div>
          <button className="select-btn" onClick={onToggle}>
            {isSelected ? "✓ Selected" : "Select"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackagesBrowse;