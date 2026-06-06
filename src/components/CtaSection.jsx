import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="section cta-section">
      <motion.div
        className="cta-card"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2>Ready For Your Next Story?</h2>
        <button className="button button-primary">Start Exploring</button>
      </motion.div>
    </section>
  );
};

export default CtaSection;
