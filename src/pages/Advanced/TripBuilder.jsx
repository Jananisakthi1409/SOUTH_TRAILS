import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { generateAiItinerary } from "../../services/aiTourismService";
import { useAuthContext } from "../../features/auth/AuthContext";
import { getPackages } from "../../services/packageService";

import kodaikanalImg from "../state/tamilnadu/kodaikanal/pexels-rohit-george-1141376880-32236721.webp";
import rameswaramImg from "../state/tamilnadu/rameswaram/pexels-animesh-paul-150064-35620983.webp";
import "./TripBuilder.css";

const moods = ["Calm", "Adventure", "Culture", "Romance", "Luxury", "Spiritual"];
const seasons = ["Current season", "Summer", "Monsoon", "Winter", "Festival season"];
const styles = ["Balanced", "Relaxed", "Fast-paced", "Premium"];

const TripBuilder = () => {
  const { user } = useAuthContext() || {};
  const [form, setForm] = useState({
    state: "Tamil Nadu",
    mood: "Luxury",
    budget: 18000,
    travelers: 2,
    duration: 4,
    interests: "temples, food, hills",
    season: "Current season",
    startDate: "",
    style: "Premium",
  });
  const [results, setResults] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const recommendationCopy = useMemo(
    () => `${form.mood} ${form.style.toLowerCase()} trip for ${form.travelers} traveler${form.travelers > 1 ? "s" : ""}`,
    [form]
  );

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
    <main className="trip-builder-page min-h-screen font-sans text-white">
      <section className="trip-builder-hero relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <img src={kodaikanalImg} alt="" className="trip-builder-hero__image absolute inset-0 h-full w-full object-cover" />
        <div className="trip-builder-hero__shade absolute inset-0" />
        <div className="trip-builder-hero__content relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="trip-builder-eyebrow font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">AI Trip Builder</p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.8rem,9vw,8rem)] uppercase leading-[0.82]">
              Private route atelier.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70">
              Choose duration, season, budget, interests, and travel style. South Trails shapes a royal Tamil Nadu itinerary with day-wise flow and package matches.
            </p>
          </div>
          <div className="trip-brief-card rounded-md border border-white/12 bg-white/10 p-6 shadow-luxury backdrop-blur-xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/60">Current brief</p>
            <h2 className="mt-3 text-3xl font-black">{recommendationCopy}</h2>
            <p className="mt-3 text-white/65">
              Rs. {Number(form.budget).toLocaleString("en-IN")} cap / {form.duration} day plan
            </p>
            <div className="trip-brief-meta">
              <span>{form.season}</span>
              <span>{form.interests}</span>
              <span>{form.startDate || "Flexible dates"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trip-builder-workspace bg-[#ffffff] px-5 py-16 text-[#022c22] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form className="trip-builder-form grid gap-5 rounded-md bg-white p-6 shadow-luxury" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Region">
                <input value="Tamil Nadu" readOnly className={inputClass} />
              </Field>
              <Field label="Mood">
                <select value={form.mood} onChange={(event) => update("mood", event.target.value)} className={inputClass}>
                  {moods.map((mood) => <option key={mood}>{mood}</option>)}
                </select>
              </Field>
              <Field label="Duration">
                <input type="number" min="1" max="14" value={form.duration} onChange={(event) => update("duration", Number(event.target.value))} className={inputClass} />
              </Field>
              <Field label="Travelers">
                <input type="number" min="1" max="12" value={form.travelers} onChange={(event) => update("travelers", Number(event.target.value))} className={inputClass} />
              </Field>
              <Field label="Start Date">
                <input type="date" value={form.startDate} onChange={(event) => update("startDate", event.target.value)} className={inputClass} />
              </Field>
              <Field label="Travel Style">
                <select value={form.style} onChange={(event) => update("style", event.target.value)} className={inputClass}>
                  {styles.map((style) => <option key={style}>{style}</option>)}
                </select>
              </Field>
              <Field label="Season">
                <select value={form.season} onChange={(event) => update("season", event.target.value)} className={inputClass}>
                  {seasons.map((season) => <option key={season}>{season}</option>)}
                </select>
              </Field>
              <Field label={`Budget: Rs. ${Number(form.budget).toLocaleString("en-IN")}`}>
                <input type="range" min="5000" max="50000" step="1000" value={form.budget} onChange={(event) => update("budget", Number(event.target.value))} />
              </Field>
            </div>
            <Field label="Interests">
              <input value={form.interests} onChange={(event) => update("interests", event.target.value)} className={inputClass} />
            </Field>
            <button
              className="trip-generate-btn min-h-14 rounded-md bg-[#0b6b43] px-7 font-black text-white disabled:opacity-60"
              type="button"
              onClick={generateTrip}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate AI Itinerary"}
            </button>
            {error && <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}
          </form>

          <div className="trip-builder-preview relative min-h-[560px] overflow-hidden rounded-md bg-black shadow-luxury">
            <img src={rameswaramImg} alt="" className="h-full w-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">AI output</p>
              <h2 className="mt-4 text-4xl font-black">A route you can book, not just read.</h2>
              <p className="mt-4 max-w-lg leading-7 text-white/70">
                Generated itineraries appear below with day-wise structure and package matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {(itinerary || results.length > 0) && (
        <section className="trip-builder-results px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            {itinerary && (
              <div className="trip-plan-card mb-8 rounded-md border border-white/10 bg-white/5 p-6 shadow-luxury">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#0b6b43]">Generated plan</p>
                <h2 className="mt-3 text-4xl font-black">{itinerary.title}</h2>
                <p className="mt-4 max-w-3xl leading-7 text-white/70">{itinerary.summary}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {(itinerary.dayPlan || []).map((day) => (
                    <article key={day.day} className="trip-day-card rounded-md border border-white/10 bg-white/5 p-5">
                      <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#0b6b43]">Day {day.day}</p>
                      <h3 className="mt-2 text-xl font-black">{day.destination}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/65">{day.focus}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((pkg) => (
                <article key={pkg.id} className="trip-match-card rounded-md border border-white/10 bg-white/5 p-5 shadow-luxury">
                  <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#0b6b43]">{pkg.state || "Tamil Nadu"}</p>
                  <h3 className="mt-2 text-2xl font-black">{pkg.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {pkg.destination} / {pkg.days}D / {pkg.nights}N / Rs. {Number(pkg.price || 0).toLocaleString("en-IN")}
                  </p>
                  <Link to={`/package/${pkg.id}`} className="mt-5 inline-flex font-black text-[#0b6b43]">View package</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

const Field = ({ label, children }) => (
  <label className="trip-field block text-sm font-black text-[#022c22]">
    {label}
    <div className="mt-2">{children}</div>
  </label>
);

const inputClass = "trip-builder-input min-h-12 w-full rounded-md border border-[#d8efe5] bg-[#ffffff] px-4 text-[#022c22] outline-none";

export default TripBuilder;
