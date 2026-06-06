import { motion } from "framer-motion";

const gems = [
  {
    title: "Kovalam Cove",
    location: "Kerala",
    story: "A quiet coastal trail where the dawn is painted in powder blue.",
    tag: "Coastal Calm",
  },
  {
    title: "Anamalai Lane",
    location: "Tamil Nadu",
    story: "A lost hill village with spice markets and misty mornings.",
    tag: "Mystery",
  },
  {
    title: "Nandi Falls",
    location: "Karnataka",
    story: "A hidden waterfall framed by coffee groves and solitude.",
    tag: "Waterfall",
  },
  {
    title: "Varkala Verve",
    location: "Kerala",
    story: "Cliffside evenings with lantern-lit paths and seashore songs.",
    tag: "Sunset",
  },
  {
    title: "Kondaveedu Drift",
    location: "Andhra Pradesh",
    story: "A forgotten fort route with dramatic rocky views.",
    tag: "Heritage",
  },
  {
    title: "Golconda Glow",
    location: "Telangana",
    story: "A starlit city edge with rooftop quiet and soft neon.",
    tag: "Nocturne",
  },
];

const HiddenGems = () => {
  return (
    <section className="section hidden-gems">
      <div className="section-heading">
        <p className="eyebrow">Hidden Gems</p>
        <h2>Hidden Gems</h2>
      </div>
      <div className="gems-grid">
        {gems.map((gem) => (
          <motion.article
            key={gem.title}
            className="gem-card"
            whileHover={{ y: -6, boxShadow: "0 30px 80px rgba(20,184,166,0.14)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="gem-content">
              <span className="gem-tag">{gem.tag}</span>
              <h3>{gem.title}</h3>
              <p>{gem.story}</p>
            </div>
            <div className="gem-meta">{gem.location}</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default HiddenGems;
