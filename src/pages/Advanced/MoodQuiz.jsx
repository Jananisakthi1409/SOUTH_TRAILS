import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPackages } from "../../services/packageService";
import "../../components/advanced/AdvancedUI.css";

const questions = [
  { prompt: "Your ideal morning?", options: ["Calm", "Adventure", "Culture", "Luxury"] },
  { prompt: "Best travel memory style?", options: ["Spiritual", "Culture", "Romance", "Adventure"] },
  { prompt: "Pick a stay mood", options: ["Luxury", "Calm", "Culture", "Romance"] },
  { prompt: "Your pace?", options: ["Calm", "Adventure", "Spiritual", "Luxury"] },
  { prompt: "Trip highlight?", options: ["Culture", "Romance", "Adventure", "Spiritual"] },
];

const categoryMap = {
  Calm: ["Nature", "Hill Station", "Relaxation", "Backwaters"],
  Adventure: ["Adventure", "Nature", "Wildlife"],
  Culture: ["Heritage", "Temple", "Cultural"],
  Romance: ["Honeymoon", "Luxury", "Beach"],
  Luxury: ["Luxury", "Backwaters", "Heritage"],
  Spiritual: ["Spiritual", "Temple", "Heritage"],
};

const MoodQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages().then((items) => setPackages(items || []));
  }, []);

  const winningMood = useMemo(() => {
    if (!answers.length) return "";
    const counts = answers.reduce((map, item) => ({ ...map, [item]: (map[item] || 0) + 1 }), {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  }, [answers]);

  const recommendations = useMemo(() => {
    if (!winningMood) return [];
    const categories = categoryMap[winningMood] || [];
    return packages
      .filter((pkg) => categories.some((cat) => `${pkg.category} ${pkg.title} ${pkg.description || ""}`.toLowerCase().includes(cat.toLowerCase())))
      .slice(0, 6);
  }, [packages, winningMood]);

  const choose = (option) => {
    setAnswers((current) => [...current.slice(0, step), option]);
    setStep((current) => Math.min(current + 1, questions.length));
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  const complete = step >= questions.length;

  return (
    <main className="advanced-page">
      <div className="advanced-page-inner">
        <section className="advanced-hero">
          <div className="advanced-hero-copy advanced-panel">
            <p className="eyebrow">Travel Mood Quiz</p>
            <h1>Find the package that matches your travel personality</h1>
            <p>Answer five quick choices and get package recommendations from the live catalog.</p>
          </div>
          <div className="advanced-panel" style={{ padding: "1.5rem" }}>
            <p className="eyebrow">Progress</p>
            <h2 style={{ marginTop: 0 }}>{Math.min(step, questions.length)} / {questions.length}</h2>
            <button className="button button-secondary" type="button" onClick={reset}>Restart</button>
          </div>
        </section>

        {!complete ? (
          <section className="advanced-panel" style={{ padding: "2rem" }}>
            <p className="eyebrow">Question {step + 1}</p>
            <h2>{questions[step].prompt}</h2>
            <div className="advanced-grid">
              {questions[step].options.map((option) => (
                <button key={option} type="button" className="itinerary-day" onClick={() => choose(option)}>
                  <strong>{option}</strong>
                  <p style={{ color: "#35705c" }}>Choose this mood</p>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="advanced-panel" style={{ padding: "2rem" }}>
            <p className="eyebrow">Your Match</p>
            <h2>{winningMood} Travel</h2>
            <div className="advanced-grid">
              {(recommendations.length ? recommendations : packages.slice(0, 6)).map((pkg) => (
                <article key={pkg.id} className="itinerary-day">
                  <p className="eyebrow" style={{ margin: 0 }}>{pkg.state}</p>
                  <h3>{pkg.title}</h3>
                  <p style={{ color: "#35705c" }}>{pkg.category} - {pkg.days} days</p>
                  <Link to={`/package/${pkg.id}`}>View package</Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default MoodQuiz;
