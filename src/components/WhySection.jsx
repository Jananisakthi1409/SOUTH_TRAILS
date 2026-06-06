import { motion } from "framer-motion";

const reasons = [
  {
    title: "State Stories",
    description: "Four unique states, four distinct travel moods.",
  },
  {
    title: "Video-led Discovery",
    description: "Preview journeys with cinematic state videos.",
  },
  {
    title: "Curated Flow",
    description: "A refined path from mood to escape to story.",
  },
];

const WhySection = () => {
  return (
    <section className="section why-section">
      <div className="section-heading">
        <p className="eyebrow">Why South India Explorer</p>
        <h2>Not just travel — a story-led escape</h2>
      </div>
      <div className="why-grid">
        {reasons.map((item) => (
          <motion.div
            key={item.title}
            className="why-card"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhySection;
