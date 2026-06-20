import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { generateAiItinerary } from "../../services/aiTourismService";
import { useAuthContext } from "../../features/auth/AuthContext";
import { getPackages } from "../../services/packageService";
import "../../components/advanced/AdvancedUI.css";

const moods = ["Calm", "Adventure", "Culture", "Romance", "Luxury", "Spiritual"];
const states = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"];
const seasons = ["Current season", "Summer", "Monsoon", "Winter", "Festival season"];

const TripBuilder = () => {
  const { user } = useAuthContext() || {};
  const [form, setForm] = useState({
    state: "Kerala",
    mood: "Calm",
    budget: 12000,
    travelers: 2,
    duration: 3,
    interests: "backwaters, culture, food",
    season: "Current season",
    startDate: "",
    style: "Balanced",
  });
  const [results, setResults] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const recommendationCopy = useMemo(() => {
    return `${form.mood} ${form.style.toLowerCase()} trip for ${form.travelers} traveler${form.travelers > 1 ? "s" : ""}`;
  }, [form]);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const generateTrip = async () => {
    setLoading(true);
    setError("");
    const { data, error: itineraryError } = await generateAiItinerary({
      state: form.state,
      budget: form.budget,
      familySize: form.travelers,
      duration: form.duration,
      interests: form.interests,
      season: form.season,
      travelStyle: form.style,
      customerId: user?.id,
    });

    if (data) {
      setItinerary(data);
      setResults(data.matchedPackages || []);
      setLoading(false);
      return;
    }

    if (itineraryError) {
      setError(`${itineraryError.message} Showing local package matches instead.`);
    }

    const packages = await getPackages({ state: form.state, maxPrice: form.budget + 5000, minRating: 4.5 });
    const moodQuery = form.mood.toLowerCase();
    const ranked = packages
      .map((pkg) => ({
        ...pkg,
        score:
          Number(pkg.rating || 0) +
          (pkg.category?.toLowerCase().includes(moodQuery) ? 2 : 0) +
          (pkg.description?.toLowerCase().includes(moodQuery) ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    setItinerary(null);
    setResults(ranked);
    setLoading(false);
  };

  return (
    <main className="advanced-page">
      <div className="advanced-page-inner">
        <section className="advanced-hero">
          <div className="advanced-panel advanced-hero-copy">
            <p className="eyebrow">AI Trip Builder</p>
            <h1>Build a South India plan in one guided flow</h1>
            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              Pick state, mood, budget, dates, travelers, and style. The builder recommends matching Spring Boot packages.
            </p>
          </div>
          <div className="advanced-panel advanced-hero-copy">
            <h2>{recommendationCopy}</h2>
            <p style={{ color: "#64748b" }}>
              Budget cap: Rs. {Number(form.budget).toLocaleString("en-IN")} - {form.duration} day plan
            </p>
          </div>
        </section>

        <section className="advanced-grid">
          <label className="advanced-panel personal-card">
            <strong>State</strong>
            <select value={form.state} onChange={(event) => update("state", event.target.value)} style={inputStyle}>
              {states.map((state) => <option key={state}>{state}</option>)}
            </select>
          </label>
          <label className="advanced-panel personal-card">
            <strong>Mood</strong>
            <select value={form.mood} onChange={(event) => update("mood", event.target.value)} style={inputStyle}>
              {moods.map((mood) => <option key={mood}>{mood}</option>)}
            </select>
          </label>
          <label className="advanced-panel personal-card">
            <strong>Budget</strong>
            <input type="range" min="5000" max="30000" step="1000" value={form.budget} onChange={(event) => update("budget", Number(event.target.value))} />
          </label>
          <label className="advanced-panel personal-card">
            <strong>Duration</strong>
            <input type="number" min="1" max="14" value={form.duration} onChange={(event) => update("duration", Number(event.target.value))} style={inputStyle} />
          </label>
          <label className="advanced-panel personal-card">
            <strong>Travelers</strong>
            <input type="number" min="1" max="12" value={form.travelers} onChange={(event) => update("travelers", Number(event.target.value))} style={inputStyle} />
          </label>
          <label className="advanced-panel personal-card">
            <strong>Start Date</strong>
            <input type="date" value={form.startDate} onChange={(event) => update("startDate", event.target.value)} style={inputStyle} />
          </label>
          <label className="advanced-panel personal-card">
            <strong>Travel Style</strong>
            <select value={form.style} onChange={(event) => update("style", event.target.value)} style={inputStyle}>
              {["Balanced", "Relaxed", "Fast-paced", "Premium"].map((style) => <option key={style}>{style}</option>)}
            </select>
          </label>
          <label className="advanced-panel personal-card">
            <strong>Season</strong>
            <select value={form.season} onChange={(event) => update("season", event.target.value)} style={inputStyle}>
              {seasons.map((season) => <option key={season}>{season}</option>)}
            </select>
          </label>
          <label className="advanced-panel personal-card">
            <strong>Interests</strong>
            <input value={form.interests} onChange={(event) => update("interests", event.target.value)} style={inputStyle} />
          </label>
        </section>

        <button className="button button-primary" type="button" onClick={generateTrip} style={{ margin: "1.5rem 0" }}>
          {loading ? "Generating..." : "Generate AI Itinerary"}
        </button>

        {error && (
          <div className="advanced-panel personal-card" style={{ marginBottom: "1rem", borderColor: "#fecaca", color: "#991b1b" }}>
            {error}
          </div>
        )}

        {itinerary && (
          <section className="advanced-hero">
            <article className="advanced-panel advanced-hero-copy">
              <p className="eyebrow">Generated Plan</p>
              <h2>{itinerary.title}</h2>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>{itinerary.summary}</p>
              <p style={{ color: "#0f766e", fontWeight: 800 }}>
                Estimated budget: Rs. {Number(itinerary.estimated_budget || itinerary.estimatedBudget || 0).toLocaleString("en-IN")}
              </p>
            </article>
            <article className="advanced-panel" style={{ padding: "1.25rem" }}>
              <h2 style={{ marginTop: 0 }}>Day-wise route</h2>
              <div className="itinerary-timeline">
                {(itinerary.dayPlan || []).map((day) => (
                  <div key={day.day} className="itinerary-day">
                    <p className="eyebrow" style={{ margin: 0 }}>Day {day.day}</p>
                    <h3 style={{ margin: "0.35rem 0" }}>{day.destination}</h3>
                    <p style={{ margin: "0 0 0.5rem", color: "#64748b" }}>{day.focus}</p>
                    <p style={{ margin: 0, color: "#334155" }}>{day.morning} {day.afternoon} {day.evening}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        )}

        <section className="advanced-grid">
          {results.map((pkg) => (
            <article key={pkg.id} className="advanced-panel personal-card">
              <p className="eyebrow">{pkg.state}</p>
              <h3>{pkg.title}</h3>
              <p>{pkg.destination} · {pkg.days}D / {pkg.nights}N · Rs. {Number(pkg.price).toLocaleString("en-IN")}</p>
              <Link to={`/package/${pkg.id}`}>View package</Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

const inputStyle = {
  width: "100%",
  marginTop: "0.7rem",
  padding: "0.75rem",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
};

export default TripBuilder;
