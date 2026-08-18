import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { chatWithOracle } from "../../services/aiTourismService";

const examplePrompts = [
  "Need a peaceful Tamil Nadu temple and food trip under Rs. 12000",
  "Plan a family Madurai, Rameswaram, and Chettinad route for 4 people",
  "Suggest a premium Ooty and Kodaikanal hill station escape with waterfalls",
];

const Oracle = () => {
  const [prompt, setPrompt] = useState(examplePrompts[0]);
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const askOracle = async () => {
    if (!prompt.trim()) {
      setError("Describe the trip you want first.");
      return;
    }

    setLoading(true);
    setError("");
    const { data, error: requestError } = await chatWithOracle({ message: `Tamil Nadu only: ${prompt}`, language });
    if (requestError) {
      setError(requestError.message || "Unable to reach the AI Travel Oracle.");
      setResult(null);
    } else {
      setResult(data);
    }
    setLoading(false);
  };

  return (
    <main className="app-shell explore-page">
      <section className="section explore-header">
        <div className="section-heading">
          <p className="eyebrow">AI Travel Oracle</p>
          <h2>Conversational Tamil Nadu travel assistant</h2>
          <p className="section-copy">
            Ask in natural language. Tamil Nadu Explorer AI uses the Tamil Trails package catalog, destinations, ratings, festivals, food routes, and highlights.
          </p>
        </div>
      </section>

      <section className="section explore-mood-section">
        <div className="section-heading">
          <p className="eyebrow">Your input</p>
          <h2>Describe your ideal trip</h2>
        </div>

        <div className="destination-grid">
          <motion.article className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <label htmlFor="oracle-language" style={labelStyle}>Language</label>
            <select
              id="oracle-language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              style={inputStyle}
            >
              {["English", "Tamil", "Malayalam", "Kannada", "Telugu", "Hindi"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label htmlFor="oracle-prompt" style={labelStyle}>Travel request</label>
            <textarea
              id="oracle-prompt"
              className="oracle-input"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={5}
              style={{ ...inputStyle, minHeight: 140 }}
            />

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <button className="button button-primary" type="button" onClick={askOracle} disabled={loading}>
                {loading ? "Thinking..." : "Ask Oracle"}
              </button>
              <Link className="button button-secondary" to="/trip-builder">Build Itinerary</Link>
            </div>

            {error && <p style={{ color: "#b91c1c", marginTop: "1rem" }}>{error}</p>}
          </motion.article>

          <motion.article className="destination-card" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
            <h3>Prompt starters</h3>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {examplePrompts.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPrompt(item)}
                  style={promptButtonStyle}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.article>
        </div>
      </section>

      <section className="section explore-state-section">
        <div className="section-heading">
          <p className="eyebrow">Output</p>
          <h2>Catalog-aware response</h2>
        </div>

        {!result ? (
          <div className="destination-grid">
            <article className="destination-card">
              <h3>Ready when you are</h3>
              <p>Ask for a budget, mood, state, travel style, family size, or season to get package-linked suggestions.</p>
            </article>
          </div>
        ) : (
          <div className="destination-grid">
            <article className="destination-card">
              <h3>Oracle answer</h3>
              <p>{result.answer}</p>
              <p style={{ color: "#64748b" }}>Language target: {result.language}</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {(result.quick_actions || result.quickActions || []).map((action) => (
                  <span key={action} style={pillStyle}>{action}</span>
                ))}
              </div>
            </article>

            {(result.suggestedPackages || []).map((pkg) => (
              <article key={pkg.id} className="destination-card">
                <p className="eyebrow">{pkg.state}</p>
                <h3>{pkg.title}</h3>
                <p>{pkg.destination} - {pkg.days}D / {pkg.nights}N - Rs. {Number(pkg.price).toLocaleString("en-IN")}</p>
                <Link to={`/package/${pkg.id}`}>View package</Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

const labelStyle = {
  display: "block",
  margin: "0 0 0.45rem",
  color: "#334155",
  fontWeight: 800,
};

const inputStyle = {
  width: "100%",
  marginBottom: "1rem",
  padding: "0.8rem",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  font: "inherit",
};

const promptButtonStyle = {
  textAlign: "left",
  padding: "0.85rem",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#ffffff",
  color: "#0f172a",
  cursor: "pointer",
  fontWeight: 700,
};

const pillStyle = {
  display: "inline-flex",
  padding: "0.45rem 0.7rem",
  borderRadius: 999,
  background: "#f0fdfa",
  color: "#0f766e",
  fontWeight: 800,
  fontSize: "0.85rem",
};

export default Oracle;
