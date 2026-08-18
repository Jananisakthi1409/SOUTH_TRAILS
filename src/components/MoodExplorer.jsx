import { motion } from "framer-motion";
import kerala from "../pages/state/kerala/backwater/pexels-optically-challenged-21717677.webp";
import tamil from "../pages/state/tamilnadu/madurai/pexels-animesh-paul-150064-35620983.webp";
import karnataka from "../pages/state/karnataka/coorg/j.webp";
import andhra from "../pages/state/andhra/rkbeach/image.webp";

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
