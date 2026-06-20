import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import tamilnaduImg from "../../assets/images/tamilnadu.webp";
import keralaImg from "../../assets/images/kerala.webp";
import karnatakaImg from "../../assets/images/karnataka.webp";
import andhraImg from "../../assets/images/andhra.webp";

const stateContent = {
  "tamil-nadu": {
    title: "Tamil Nadu",
    subtitle: "Temple routes, coastal cliffs and heritage retreats.",
  },
  kerala: {
    title: "Kerala",
    subtitle: "Backwater resorts, hill stays and curated wellness journeys.",
  },
  karnataka: {
    title: "Karnataka",
    subtitle: "Coffee estates, historic forts and premium nature escapes.",
  },
  "andhra-pradesh": {
    title: "Andhra Pradesh",
    subtitle: "Coastal luxury, heritage temples and authentic cultural routes.",
  },
};

const categories = [
  "Family Trips",
  "Friends Trips",
  "Solo Explorer",
  "Couple Retreats",
  "Weekend Escapes",
  "Temple Tours",
  "Adventure Tours",
  "Luxury Packages",
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const stateImages = {
  "tamil-nadu": tamilnaduImg,
  kerala: keralaImg,
  karnataka: karnatakaImg,
  "andhra-pradesh": andhraImg,
};

const StatePage = () => {
  const { state } = useParams();
  const data = stateContent[state] || {
    title: "South India",
    subtitle: "Choose a state route and a package category.",
  };
  const heroImage = stateImages[state] || keralaImg;

  return (
    <main className="app-shell state-page">
      <section
        className="section state-hero"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(5, 21, 42, 0.86), rgba(1, 14, 30, 0.86)), url(${heroImage})` }}
      >
        <div className="hero-copy">
          <p className="eyebrow accent-light">Explore {data.title}</p>
          <h1>Explore {data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
      </section>

      <section className="section category-section">
        <div className="section-heading">
          <p className="eyebrow">Package Categories</p>
          <h2>Choose the travel style that fits your trip</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/states/${state}/packages/${slugify(category)}`}
              className="category-card-link"
            >
              <motion.article className="category-card glass-card" whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <h3>{category}</h3>
                <p>Explore premium {category.toLowerCase()} for {data.title}.</p>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default StatePage;
