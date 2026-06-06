import { motion } from "framer-motion";
import kerala from "../assets/images/peace/p2.jpg";
import tamil from "../assets/images/hidden/pexels-stijn-dijkstra-1306815-29988882.jpg";
import karnataka from "../assets/images/adventure/pexels-cottonbro-5803403.jpg";
import andhra from "../assets/images/roadtrips/pexels-cottonbro-5329529.jpg";

const moods = [
  {
    title: "Kerala Calm",
    label: "Backwater mornings",
    image: kerala,
  },
  {
    title: "Tamil Tradition",
    label: "Temple paths & coast",
    image: tamil,
  },
  {
    title: "Karnataka Trails",
    label: "Coffee forests",
    image: karnataka,
  },
  {
    title: "Andhra Drives",
    label: "Coastal routes",
    image: andhra,
  },
];

const MoodExplorer = () => {
  return (
    <section className="section mood-explorer">
      <div className="section-heading">
        <p className="eyebrow">Mood Explorer</p>
        <h2>Feel the South India rhythm</h2>
      </div>
      <div className="mood-grid">
        {moods.map((mood) => (
          <motion.button
            key={mood.title}
            className="mood-card"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="mood-artboard">
              <img src={mood.image} alt={mood.title} />
              <div className="mood-overlay">
                <span>{mood.label}</span>
              </div>
            </div>
            <h3>{mood.title}</h3>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default MoodExplorer;
