import { useEffect, useState } from "react";
import { getPackages } from "../../services/packageService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { categories, budgetFilters, durationFilters } from "./packages";
import PackageCompareTray from "../../components/advanced/PackageCompareTray";
import PackageSkeletonGrid from "../../components/advanced/PackageSkeletonGrid";
import SmartFilterDrawer from "../../components/advanced/SmartFilterDrawer";
import { useAuthContext } from "../../features/auth/AuthContext";
import { useToast } from "../../components/ui/Toast";
import { getWishlist, removeWishlistPackage, saveWishlistPackage } from "../../services/wishlistService";
import tamilnaduImg from "../../assets/images/tamilnadu.webp";
import "./PackagesBrowse.css";
//import { seedPackagesToSupabase } from "../../services/packageService";
const imageModules = import.meta.glob("../state/**/*.{webp,avif}", { eager: true });
const stateImageMap = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .reduce((map, [path, moduleValue]) => {
    const normalized = path.replace(/\\/g, "/");
    const match = normalized.match(/state\/[^/]+\/([^/]+)\/[^/]+\.(webp|avif)$/i);
    if (!match) return map;

    const folder = match[1];
    const src = moduleValue.default || moduleValue;
    map[folder] = [...(map[folder] || []), src];
    return map;
  }, {});

const stateFallbackImages = {
  "Tamil Nadu": tamilnaduImg,
};

const PackagesBrowse = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const { showToast } = useToast();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || searchParams.get("q") || "";

  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [savedPackageIds, setSavedPackageIds] = useState([]);
  const [minRating, setMinRating] = useState(0);
const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    let active = true;

    const loadPackages = async () => {
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
        state: "Tamil Nadu",
        image1: pkg.image1,
        image2: pkg.image2,
        image3: pkg.image3,
        places: Array.isArray(pkg.places) ? pkg.places : typeof pkg.places === "string" ? pkg.places.split(",").map(p => p.trim()) : [],
        imageFolder: pkg.imageFolder || pkg.image_folder || ""
      }));
      if (active) {
        setPackagesData(mappedPackages);
      }
    }
      if (active) {
        setLoading(false);
      }
    };

    loadPackages();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const loadWishlist = async () => {
      if (!isAuthenticated) {
        setSavedPackageIds([]);
        return;
      }
      const { data } = await getWishlist(user?.id);
      setSavedPackageIds((data || []).map((item) => item.id));
    };

    loadWishlist();
  }, [isAuthenticated, user?.id]);

  // Filter logic
  const filteredPackages = packagesData.filter((pkg) => {
    const categoryMatch = selectedCategory === "All" || pkg.category === selectedCategory;
    const stateMatch = selectedState === "All" || pkg.state === "Tamil Nadu";
    const ratingMatch = pkg.rating >= minRating;
    const query = searchTerm.trim().toLowerCase();
    const searchMatch =
      !query ||
      `${pkg.title} ${pkg.destination} ${pkg.category} ${pkg.state} ${pkg.places.join(" ")}`
        .toLowerCase()
        .includes(query);

    let budgetMatch = true;
    if (selectedBudget === "Under 8000") budgetMatch = pkg.price < 8000;
    else if (selectedBudget === "8000-12000") budgetMatch = pkg.price >= 8000 && pkg.price <= 12000;
    else if (selectedBudget === "Above 12000") budgetMatch = pkg.price > 12000;

    let durationMatch = true;
    if (selectedDuration === "1-2 Days") durationMatch = pkg.days <= 2;
    else if (selectedDuration === "3-4 Days") durationMatch = pkg.days >= 3 && pkg.days <= 4;
    else if (selectedDuration === "5+ Days") durationMatch = pkg.days >= 5;

    return categoryMatch && stateMatch && searchMatch && ratingMatch && budgetMatch && durationMatch;
  });

  // Sort logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const selectedComparePackages = packagesData
    .filter((pkg) => selectedPackages.includes(pkg.id))
    .slice(0, 3);

  const averageRating = packagesData.length
    ? packagesData.reduce((sum, pkg) => sum + Number(pkg.rating || 0), 0) / packagesData.length
    : 0;
  const startingPrice = packagesData.length
    ? Math.min(...packagesData.map((pkg) => Number(pkg.price || 0)).filter(Boolean))
    : 0;

  const togglePackageSelection = (packageId) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId) ? prev.filter((id) => id !== packageId) : [...prev, packageId]
    );
  };

  const toggleWishlist = async (pkg) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { message: "Please login to save packages to your wishlist." } });
      return;
    }

    const isSaved = savedPackageIds.includes(pkg.id);
    const result = isSaved
      ? await removeWishlistPackage({ customerId: user?.id, packageId: pkg.id })
      : await saveWishlistPackage({ customerId: user?.id, packageId: pkg.id, packageItem: pkg });

    if (result.error) {
      showToast(result.error.message || "Unable to update wishlist.", "error");
      return;
    }

    setSavedPackageIds((current) =>
      isSaved ? current.filter((id) => id !== pkg.id) : [pkg.id, ...current]
    );
    showToast(isSaved ? "Removed from wishlist." : "Saved to wishlist.", "success");
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
    setSelectedState("All");
    setSearchTerm("");
    setMinRating(0);
    setSortBy("rating");
    setIsFilterDrawerOpen(false);
  };

  return (
    <main className="packages-browse-page !w-full !max-w-none !p-0">
      <section className="packages-royal-hero">
        <img src={tamilnaduImg} alt="" className="packages-royal-hero__image" />
        <div className="packages-royal-hero__shade" />
        <div className="packages-royal-hero__content">
          <div>
            <p className="royal-eyebrow">Tamil Nadu private journeys</p>
            <h1>Royal travel collections.</h1>
            <p>
              Curated temple circuits, hill retreats, coastal escapes, food trails,
              and luxury weekends with handpicked stays, route planning, and smooth booking.
            </p>
            <div className="royal-hero-actions">
              <a href="#package-collection" className="royal-primary-link">Explore packages</a>
              <button className="royal-secondary-link" type="button" onClick={() => setIsFilterDrawerOpen(true)}>
                Concierge filters
              </button>
            </div>
          </div>

          <div className="royal-stat-panel" aria-label="Package highlights">
            <div>
              <span>{packagesData.length || "--"}</span>
              <p>Curated routes</p>
            </div>
            <div>
              <span>{averageRating ? averageRating.toFixed(1) : "--"}</span>
              <p>Average rating</p>
            </div>
            <div>
              <span>{startingPrice ? `Rs. ${startingPrice.toLocaleString("en-IN")}` : "--"}</span>
              <p>Starting price</p>
            </div>
          </div>
        </div>
      </section>

      <SmartFilterDrawer
        open={isFilterDrawerOpen}
        filters={{ searchTerm, selectedState, selectedBudget, selectedDuration, minRating }}
        onChange={(field, value) => {
          const setters = {
            searchTerm: setSearchTerm,
            selectedState: setSelectedState,
            selectedBudget: setSelectedBudget,
            selectedDuration: setSelectedDuration,
            minRating: setMinRating,
          };
          setters[field]?.(value);
        }}
        onClose={() => setIsFilterDrawerOpen(false)}
        onReset={resetFilters}
      />

      <div id="package-collection" className="packages-container packages-royal-shell px-4 py-10 sm:px-6 lg:px-8">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar glass-card">
          <div className="filters-header">
            <h2>Curate</h2>
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
              Compare selected
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <section className="packages-main">
          <div className="packages-header">
            <p className="results-count">
              Showing <strong>{sortedPackages.length}</strong> of{" "}
              <strong>{packagesData.length}</strong> packages
            </p>
            <div className="package-toolbar-controls">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search packages, places, moods..."
                className="package-search-input"
              />
              <select
                value={selectedState}
                onChange={(event) => setSelectedState(event.target.value)}
                className="sort-select"
                aria-label="Filter by state"
              >
                {["All", "Tamil Nadu"].map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
              <button className="smart-filter-toggle" type="button" onClick={() => setIsFilterDrawerOpen(true)}>
                Concierge filters
              </button>
            </div>
          </div>

          {loading ? (
            <PackageSkeletonGrid count={6} />
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
                      isSaved={savedPackageIds.includes(pkg.id)}
                      onWishlist={() => toggleWishlist(pkg)}
                      images={stateImageMap[pkg.imageFolder] || []}
                      fallbackImage={stateFallbackImages[pkg.state] || tamilnaduImg}
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
          <PackageCompareTray packages={selectedComparePackages} onClear={() => setSelectedPackages([])} />
        </section>
      </div>
    </main>
  );
};

const PackageCard = ({ pkg, isSelected, isSaved, onToggle, onWishlist, images, fallbackImage }) => {
  const uploadedImages = [pkg.image1, pkg.image2, pkg.image3].filter(Boolean);
  const visibleImages = uploadedImages.length
    ? uploadedImages
    : images.length ? images.slice(0, 5) : [fallbackImage, fallbackImage, fallbackImage];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      className={`package-browse-card glass-card ${isSelected ? "selected" : ""}`}
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <label className="selection-checkbox">
        <input type="checkbox" checked={isSelected} onChange={onToggle} />
        <span className="checkmark"></span>
      </label>

      <div className="package-image-container">
        <div className="image-carousel">
          {visibleImages.map((src, idx) => (
            <div
              key={src || idx}
              className={`carousel-slide ${idx === activeIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
        <div className="package-image-overlay" />
        <div className="package-card-badges">
          <span>{pkg.category}</span>
          <span>{pkg.days}D / {pkg.nights}N</span>
        </div>
        <div className="image-indicators">
          {visibleImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`indicator ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

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
              {Number(pkg.rating || 0).toFixed(1)} <span className="star">/ 5</span>
            </span>
          </div>
        </div>

        <p className="places-covered">
          <strong>Places:</strong> {pkg.places.join(", ")}
        </p>

        <div className="package-footer package-price-row">
          <div className="price">
            <span className="label">From</span>
            <span className="amount">Rs. {pkg.price.toLocaleString("en-IN")}</span>
          </div>
          <button className="select-btn" type="button" onClick={onToggle}>
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
        <div className="package-actions-row">
          <Link className="details-btn" to={`/package/${pkg.id}`}>
            View Details
          </Link>
          <button className="save-btn" type="button" onClick={onWishlist}>
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default PackagesBrowse;
