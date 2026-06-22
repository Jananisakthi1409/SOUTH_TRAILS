import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const StateExploreLayout = ({
  stateName,
  packagePath,
  destinationsPath,
  intro,
  soulTitle,
  soulText,
  cultureCards,
  experienceTitles,
  reviews,
  slides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideCount = slides.length;
  const activeIndex = slideCount > 0 ? ((currentSlide % slideCount) + slideCount) % slideCount : 0;

  useEffect(() => {
    if (slideCount === 0) return undefined;
    const interval = window.setInterval(() => setCurrentSlide((value) => value + 1), 5000);
    return () => window.clearInterval(interval);
  }, [slideCount]);

  const goToSlide = (index) => setCurrentSlide(((index % slideCount) + slideCount) % slideCount);
  const nextSlide = () => setCurrentSlide((value) => value + 1);
  const prevSlide = () => setCurrentSlide((value) => value - 1);

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
    [activeIndex, slides]
  );

  if (slideCount === 0) {
    return (
      <main className="state-explore-page">
        <section className="state-explore-empty">
          <p className="home-hero__kicker">{stateName}</p>
          <h1>Explore {stateName}</h1>
          <p>No hero images found for this state.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="state-explore-page">
      <section className="state-explore-hero" aria-label={`Explore ${stateName}`}>
        <div className="hero-shell state-explore-hero__shell">
          <div className="hero-slides">{slideItems}</div>
          <div className="hero-overlay" />
          <div className="hero-copy hero-copy-fixed state-explore-hero__copy">
            <p className="eyebrow accent-light">{stateName}</p>
            <h1>Explore {stateName}</h1>
            <p>{intro}</p>
            <div className="hero-actions hero-actions-cta">
              <Link to={packagePath} className="home-luxury-button home-luxury-button--primary">
                Explore Packages
              </Link>
              <Link to={destinationsPath} className="home-luxury-button home-luxury-button--ghost">
                View Destinations
              </Link>
            </div>
          </div>

          <button className="hero-arrow hero-arrow-prev" onClick={prevSlide} aria-label="Previous slide">
            {"<"}
          </button>
          <button className="hero-arrow hero-arrow-next" onClick={nextSlide} aria-label="Next slide">
            {">"}
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

      <section className="state-explore-section state-explore-section--cream">
        <div className="state-explore-inner">
          <div className="home-section-header home-section-header--center">
            <span>Culture Lens</span>
            <h2>{soulTitle}</h2>
            <p>{soulText}</p>
          </div>

          <div className="state-culture-grid">
            {cultureCards.map((item) => (
              <article className="state-culture-card" key={item.title}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="state-explore-section state-explore-section--black">
        <div className="state-explore-inner">
          <div className="home-section-header">
            <span>Signature Moments</span>
            <h2>Experiences you will remember long after checkout.</h2>
          </div>

          <div className="state-experience-grid">
            {experienceTitles.map((title, index) => (
              <article
                className="state-experience-card"
                key={title}
                style={{ backgroundImage: `url(${slides[index % slideCount]})` }}
              >
                <div>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>Explore route</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="state-explore-section state-explore-section--white">
        <div className="state-explore-inner">
          <div className="home-section-header home-section-header--center">
            <span>Traveler Notes</span>
            <h2>Stories from fellow travelers.</h2>
          </div>

          <div className="state-review-grid">
            {reviews.map((review) => (
              <article className="state-review-card" key={review.name}>
                <div className="state-review-avatar">{review.name.charAt(0)}</div>
                <span className="state-review-rating">5.0 rating</span>
                <p>"{review.review}"</p>
                <strong>{review.name}</strong>
                <small>{review.city}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default StateExploreLayout;
