import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPackages } from "../../services/packageService";
import tamilnaduImg from "../../assets/images/tamilnadu.png";

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

const categorySlugMap = {
  "family-trips": "Family",
  "friends-trips": "Friends",
  "solo-explorer": "Solo",
  "couple-retreats": "Couple",
  "weekend-escapes": "Weekend",
  "temple-tours": "Temple",
  "adventure-tours": "Adventure",
  "luxury-packages": "Luxury",
  family: "Family",
  friends: "Friends",
  solo: "Solo",
  couple: "Couple",
  weekend: "Weekend",
  temple: "Temple",
  adventure: "Adventure",
  luxury: "Luxury",
};

const PackageCategory = () => {
  const { state, category } = useParams();
  const title = categorySlugMap[category] || "Packages";
  const isTamilNadu = state === "tamil-nadu";
  
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      // Get packages for the category
      const allPackages = await getPackages({ category: title });
      // Filter by state if needed
      const filtered = isTamilNadu ? allPackages.filter(item => Boolean(stateImageMap[item.imageFolder])) : allPackages;
      setPackages(filtered);
      setLoading(false);
    };
    loadPackages();
  }, [title, isTamilNadu]);

  const stateLabel = state ? state.replace(/-/g, " ") : "Packages";

  return (
    <main className="app-shell package-category-page">
      <section className="section hero-copy">
        <p className="eyebrow accent-light">{stateLabel}</p>
        <h1>{title}</h1>
        <p>Premium {title.toLowerCase()} across {stateLabel}.</p>
      </section>

      <section className="section package-grid">
        {loading ? (
          <div className="loading">Loading packages...</div>
        ) : packages.length > 0 ? (
          packages.map((item) => (
            <PackageCard key={item.id} item={item} images={stateImageMap[item.imageFolder] || []} />
          ))
        ) : (
          <div className="empty-state glass-card">
            <h2>No packages found for this category.</h2>
            <p>Try another route or category to explore curated Tamil Nadu escapes.</p>
          </div>
        )}
      </section>
    </main>
  );
};

const PackageCard = ({ item, images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleImages = images.length ? images.slice(0, 3) : [tamilnaduImg, tamilnaduImg, tamilnaduImg];

  useEffect(() => {
    if (visibleImages.length < 2 || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [visibleImages.length, isPaused]);

  return (
    <motion.article
      className="package-card glass-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="package-card-media"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="image-carousel-shell">
          <div className="flip-stage">
            <div className="flip-cube" style={{ transform: `rotateY(${activeIndex * -120}deg)` }}>
              {visibleImages.map((src, idx) => (
                <div
                  key={idx}
                  className={`flip-face face-${idx}`}
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
          </div>

          <div className="gallery-indicators">
            {visibleImages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`gallery-indicator ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="package-card-body horizontal-card-body">
        <div>
          <p className="eyebrow accent-light">{item.destination}</p>
          <h3>{item.title}</h3>
          <div className="package-rating-row">
            <span className="rating-pill">{item.rating.toFixed(1)}</span>
            <span className="rating-stars">{Array.from({ length: Math.round(item.rating) }, () => "★").join("")}</span>
          </div>
        </div>

        <div className="package-detail-list">
          <div>
            <span className="detail-label">Price</span>
            <strong>₹{item.price.toLocaleString()}</strong>
          </div>
          <div>
            <span className="detail-label">Duration</span>
            <strong>{item.days}D / {item.nights}N</strong>
          </div>
          <div>
            <span className="detail-label">Places Covered</span>
            <p>{item.places.join(", ")}</p>
          </div>
        </div>

        <Link to="/booking" className="button button-primary select-package-button">
          Select Package
        </Link>
      </div>
    </motion.article>
  );
};

export default PackageCategory;
