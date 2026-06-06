import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import c1 from "../state/kerala/culturesection/c1.jpg";
import c2 from "../state/kerala/culturesection/c2.jpg";
import c3 from "../state/kerala/culturesection/c3.jpg";
import c4 from "../state/kerala/culturesection/c4.jpg";

// Load images dynamically from the folder (Vite eager glob)
const imageModules = import.meta.glob("../state/kerala/*.{png,jpg,jpeg}", { eager: true });
const slides = Object.keys(imageModules).sort().map((p) => imageModules[p].default);

const cultureCards = [
  {
    title: "Backwater Bliss",
    image: c1,
    desc: "Serene houseboats, lagoons and tranquil waterways.",
  },
  {
    title: "Spice Gardens",
    image: c2,
    desc: "Cardamom, pepper and aromatic plantations.",
  },
  {
    title: "Culinary Treasures",
    image: c3,
    desc: "Seafood delicacies, coconut-based dishes and Kerala cuisine.",
  },
  {
    title: "Beach & Hill Retreats",
    image: c4,
    desc: "Golden beaches, misty mountains and tea estates.",
  },
];

const reviews = [
  {
    name: "Ananya V.",
    city: "Kochi",
    review: "The backwater tour was absolutely mesmerizing.",
  },
  {
    name: "Ravi M.",
    city: "Ernakulam",
    review: "Munnar tea gardens left us speechless.",
  },
  {
    name: "Divya P.",
    city: "Mumbai",
    review: "Perfect blend of nature, culture and adventure.",
  },
];

const KeraExplore = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideCount = slides.length;
  const activeIndex = slideCount > 0 ? ((currentSlide % slideCount) + slideCount) % slideCount : 0;

  useEffect(() => {
    if (slideCount === 0) return;
    const interval = window.setInterval(() => setCurrentSlide((v) => v + 1), 5000);
    return () => window.clearInterval(interval);
  }, [slideCount]);

  const goToSlide = (index) => setCurrentSlide(((index % slideCount) + slideCount) % slideCount);
  const nextSlide = () => setCurrentSlide((v) => v + 1);
  const prevSlide = () => setCurrentSlide((v) => v - 1);

  const slideItems = useMemo(
    () =>
      slides.map((image, index) => (
        <div
          key={image}
          role="img"
          aria-hidden={index !== activeIndex}
          className={`hero-slide ${index === activeIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      )),
    [activeIndex]
  );

  if (slideCount === 0) {
    return (
      <main className="app-shell state-page">
        <section className="section state-hero">
          <div className="hero-copy">
            <p className="eyebrow accent-light">Kerala</p>
            <h1>Explore Kerala</h1>
            <p>No hero images found in src/pages/state/kerala/</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell state-page">
      <section className="kera-hero">
        <div className="hero-shell">
          <div className="hero-slides">{slideItems}</div>
          <div className="hero-overlay" />
          <div className="hero-copy hero-copy-fixed">
            <p className="eyebrow accent-light">Kerala</p>
            <h1>Explore Kerala</h1>
            <p>Discover backwaters, spice gardens, golden beaches and the enchanting beauty of God's Own Country.</p>
            <div className="hero-actions hero-actions-cta">
              <Link to="/kerala-packages" className="button button-primary">
                Explore Packages
              </Link>
              <Link to="/states/kerala" className="button button-secondary">
                View Destinations
              </Link>
            </div>
          </div>

          <button className="hero-arrow hero-arrow-prev" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>
          <button className="hero-arrow hero-arrow-next" onClick={nextSlide} aria-label="Next slide">
            ›
          </button>

          <div className="hero-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Kerala Culture */}

      <section
        style={{
          padding: "80px 6%",
          background: "#fff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "2.5rem" }}>
            The Magic of Kerala
          </h2>

          <p style={{ color: "#64748b" }}>
            A land where nature, culture, cuisine and adventure blend seamlessly.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
          }}
        >
          {cultureCards.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "20px" }}>
                <h3>{item.title}</h3>
                <p style={{ color: "#64748b" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experiences */}

      <section
        style={{
          padding: "80px 6%",
          background: "#f8fafc",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "2.5rem" }}>
            Experiences You'll Never Forget
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          {[
            "Sunset on Alleppey Backwaters",
            "Trek Through Munnar Tea Gardens",
            "Discover Spice Plantations",
            "Relax on Varkala Beach",
          ].map((title, index) => (
            <div
              key={title}
              style={{
                height: "350px",
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                backgroundImage: `url(${slides[index]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "20px",
                  bottom: "20px",
                  color: "#fff",
                }}
              >
                <h3>{title}</h3>
                <p>Explore →</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}

      <section
        style={{
          padding: "80px 6%",
          background: "#fff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "2.5rem" }}>
            Stories From Fellow Travelers
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "24px",
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              style={{
                padding: "24px",
                borderRadius: "20px",
                background: "#fff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#0ea5e9",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                {review.name.charAt(0)}
              </div>

              <div
                style={{
                  color: "#f59e0b",
                  marginBottom: "10px",
                }}
              >
                ★★★★★
              </div>

              <p style={{ marginBottom: "15px" }}>
                "{review.review}"
              </p>

              <strong>{review.name}</strong>
              <br />
              <span style={{ color: "#64748b" }}>
                {review.city}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default KeraExplore;
