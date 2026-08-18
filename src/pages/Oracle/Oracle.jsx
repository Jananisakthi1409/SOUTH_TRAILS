import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { chatWithOracle } from "../../services/aiTourismService";

const examplePrompts = [
  "Need a peaceful Tamil Nadu temple and food trip under Rs. 12000",
  "Plan a family Madurai, Rameswaram, and Chettinad route for 4 people",
  "Suggest a premium Ooty and Kodaikanal hill station escape with waterfalls",
  "Best 3-day solo backpacking itinerary across coastal Tamil Nadu",
];

const languages = ["English", "Tamil", "Malayalam", "Kannada", "Telugu", "Hindi"];

const Oracle = () => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const askOracle = async () => {
    if (!prompt.trim()) {
      setError("Please describe the trip you want first.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    const { data, error: requestError } = await chatWithOracle({
      message: `Tamil Nadu only: ${prompt}`,
      language,
    });
    if (requestError) {
      setError(requestError.message || "Unable to reach the AI Travel Oracle. Please try again.");
      setResult(null);
    } else {
      setResult(data);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1f2937]">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#f0fdf4] to-[#f8fafc] px-6 pb-12 pt-28 border-b border-[#e5e7eb] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <span className="mb-3 inline-block rounded-full border border-[#dcfce7] bg-[#dcfce7]/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
            🤖 AI Travel Oracle
          </span>
          <h1 className="mb-3 font-display text-3xl font-extrabold text-[#1f2937] md:text-5xl">
            Conversational Travel Assistant
          </h1>
          <p className="text-xs leading-relaxed text-[#6b7280]">
            Ask in natural language. Oracle uses the South Trails package catalog, destinations,
            ratings, festivals, and food routes to craft your itinerary.
          </p>
        </motion.div>
      </section>

      {/* ── Input ── */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 font-display text-base font-bold text-[#1f2937]">Describe your ideal trip</h2>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold text-[#1f2937]">
                  Language
                </label>
                <select
                  id="oracle-language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-[#1f2937] outline-none focus:border-[#15803d]"
                >
                  {languages.map((lang) => (
                    <option key={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="oracle-prompt"
                  className="mb-1.5 block text-xs font-semibold text-[#1f2937]"
                >
                  Travel Request
                </label>
                <textarea
                  id="oracle-prompt"
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    setError("");
                  }}
                  placeholder="E.g. Plan a 5-day family trip to Madurai and Rameswaram under ₹15,000 per person..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#e5e7eb] bg-white p-3 text-xs text-[#1f2937] placeholder-[#9ca3af] outline-none focus:border-[#15803d]"
                />
                {error && <p className="mt-1 text-xs text-red-600">⚠️ {error}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={askOracle}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-[#15803d] px-6 text-xs font-bold text-white transition hover:bg-[#166534] disabled:opacity-60"
                >
                  {loading ? "Thinking..." : "Ask Oracle"}
                </button>
                <Link
                  to="/trip-builder"
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-5 text-xs font-bold text-[#1f2937] transition hover:border-[#15803d]"
                >
                  Build Itinerary
                </Link>
              </div>
            </motion.div>

            {/* Prompt Starters */}
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#15803d]">
                Prompt Starters
              </h3>
              <div className="flex flex-col gap-2.5">
                {examplePrompts.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setPrompt(item);
                      setError("");
                    }}
                    className="w-full rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-3 text-left text-xs text-[#1f2937] transition hover:border-[#15803d] hover:bg-[#f0fdf4]"
                  >
                    → {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Result ── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          {result && (
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-display text-base font-bold text-[#1f2937]">Oracle Response</h3>
              <p className="text-xs leading-relaxed text-[#6b7280]">{result.answer}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Oracle;
