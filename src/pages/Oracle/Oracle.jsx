import { useState } from "react";
import { motion } from "framer-motion";

const Oracle = () => {
  const [prompt, setPrompt] = useState("Need a peaceful trip under ₹5000");
  const [result] = useState({
    destination: "Meghamalai",
    budget: "₹4500",
    duration: "2 Days",
    highlights: ["Tea Estates", "Waterfalls", "Stargazing"],
  });

  return (
    <main className="app-shell explore-page">
      <section className="section explore-header">
        <div className="section-heading">
          <p className="eyebrow">AI Travel Oracle</p>
          <h2>Personalized recommendations</h2>
          <p className="section-copy">Tell the oracle what kind of trip you want and receive a travel story in return.</p>
        </div>
      </section>

      <section className="section explore-mood-section">
        <div className="section-heading">
          <p className="eyebrow">Your input</p>
          <h2>Describe your ideal trip</h2>
        </div>
        <div className="destination-grid">
          <motion.article className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <textarea
              className="oracle-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </motion.article>
        </div>
      </section>

      <section className="section explore-state-section">
        <div className="section-heading">
          <p className="eyebrow">Output</p>
          <h2>Recommended trip</h2>
        </div>
        <div className="destination-grid">
          <motion.article className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <h3>{result.destination}</h3>
            <p>{result.budget} · {result.duration}</p>
            <ul>
              {result.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        </div>
      </section>
    </main>
  );
};

export default Oracle;
