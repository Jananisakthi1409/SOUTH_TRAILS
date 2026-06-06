import { motion } from "framer-motion";

const categories = [
  "Weekend Escapes",
  "Road Trips",
  "Budget Escapes",
  "Photography Trails",
  "Monsoon Specials",
];

const Curated = () => {
  return (
    <main className="app-shell explore-page">
      <section className="section explore-header">
        <div className="section-heading">
          <p className="eyebrow">Curated Escapes</p>
          <h2>Choose a category for your next journey</h2>
          <p className="section-copy">Browse tailored travel concepts designed for South India moods and seasons.</p>
        </div>
      </section>

      <section className="section explore-state-section">
        <div className="destination-grid">
          {categories.map((category) => (
            <motion.article key={category} className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
              <h3>{category}</h3>
              <p>Signature recommendations for {category.toLowerCase()}.</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Curated;
