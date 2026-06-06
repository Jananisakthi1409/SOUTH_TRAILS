import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const placeData = {
  meghamalai: {
    title: "Meghamalai",
    tagline: "The High Wavy Mountains",
    state: "Tamil Nadu",
    budget: "₹4500",
    duration: "2 Days",
    season: "Monsoon / Winter",
    story: "A mist-draped hill retreat where tea estates weave across the mountaintops and quiet roads lead to hidden viewpoints.",
    highlights: ["Tea Estates", "Waterfalls", "Sunrise Point", "Nature Walk"],
    itinerary: ["Arrival and tea estate walk", "Waterfall hike and sunset view"],
    nearby: ["Valparai", "Kolli Hills", "Yercaud"],
  },
};

const PlacePage = () => {
  const { place } = useParams();
  const data = placeData[place] || {
    title: place.replace(/-/g, " "),
    tagline: "A destination to explore.",
    state: "South India",
    budget: "₹4000",
    duration: "2-4 Days",
    season: "All year",
    story: "A timeless destination with memorable landscapes and curated experiences.",
    highlights: ["Local cuisine", "Nature trails", "Cultural visits"],
    itinerary: ["Explore the area", "Relax and savor local life"],
    nearby: ["Nearby Escape 1", "Nearby Escape 2", "Nearby Escape 3"],
  };

  return (
    <main className="app-shell explore-page">
      <section className="section explore-header">
        <div className="section-heading">
          <p className="eyebrow">Destination Details</p>
          <h2>{data.title}</h2>
          <p className="section-copy">{data.tagline}</p>
        </div>
      </section>

      <section className="section explore-state-section">
        <div className="section-heading">
          <p className="eyebrow">Story</p>
          <h2>{data.title}</h2>
        </div>
        <p>{data.story}</p>
      </section>

      <section className="section explore-mood-section">
        <div className="section-heading">
          <p className="eyebrow">Quick Facts</p>
          <h2>Essential trip details</h2>
        </div>
        <div className="destination-grid">
          <motion.article className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <h3>State</h3>
            <p>{data.state}</p>
          </motion.article>
          <motion.article className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <h3>Budget</h3>
            <p>{data.budget}</p>
          </motion.article>
          <motion.article className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <h3>Duration</h3>
            <p>{data.duration}</p>
          </motion.article>
          <motion.article className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <h3>Best Season</h3>
            <p>{data.season}</p>
          </motion.article>
        </div>
      </section>

      <section className="section explore-mood-section">
        <div className="section-heading">
          <p className="eyebrow">Things To Do</p>
          <h2>Essentials for the trip</h2>
        </div>
        <div className="destination-grid">
          {data.highlights.map((item) => (
            <motion.article key={item} className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
              <h3>{item}</h3>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section explore-state-section">
        <div className="section-heading">
          <p className="eyebrow">Curated Itinerary</p>
          <h2>Two-day rhythm</h2>
        </div>
        <div className="destination-grid">
          {data.itinerary.map((item, index) => (
            <motion.article key={item} className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
              <h3>Day {index + 1}</h3>
              <p>{item}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section destination-grid-section">
        <div className="section-heading">
          <p className="eyebrow">Nearby Escapes</p>
          <h2>Pair it with these routes</h2>
        </div>
        <div className="destination-grid">
          {data.nearby.map((item) => (
            <motion.article key={item} className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
              <h3>{item}</h3>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <motion.div className="cta-card" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
          <h2>Build Similar Trip</h2>
          <button className="button button-primary">Build Similar Trip</button>
        </motion.div>
      </section>
    </main>
  );
};

export default PlacePage;
