import { motion } from "framer-motion";

const examples = [
  "Need a break from placements",
  "Need a peaceful weekend under ₹5000",
  "Want an adventurous road trip",
];

const OracleSection = () => {
  return (
    <section className="section oracle-section">
      <div className="section-heading">
        <p className="eyebrow">Travel Oracle</p>
        <h2>Tell Us What You're Craving</h2>
      </div>
      <div className="oracle-grid">
        <div className="oracle-panel">
          <p className="oracle-intro">Type your travel mood and receive a premium preview.</p>
          <div className="oracle-examples">
            {examples.map((item) => (
              <span key={item} className="oracle-chip">
                {item}
              </span>
            ))}
          </div>
          <button className="button button-primary">Ask the Oracle</button>
        </div>
        <motion.div
          className="oracle-preview"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <span className="oracle-preview-label">Recommended Destination</span>
          <h3>Meghamalai</h3>
          <div className="oracle-preview-meta">
            <div>
              <span>Budget</span>
              <strong>₹4500</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>2 Days</strong>
            </div>
          </div>
          <p className="oracle-preview-copy">Tea estates, waterfalls and stargazing.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default OracleSection;
