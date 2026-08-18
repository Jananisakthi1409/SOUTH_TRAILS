import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    title: "Booking & Payments",
    icon: "💳",
    desc: "Help with reservations, payment methods, and transaction issues",
    articles: 12,
  },
  {
    title: "Managing Your Trip",
    icon: "🧳",
    desc: "Modifying itineraries, adding services, and trip customization",
    articles: 9,
  },
  {
    title: "Cancellations & Refunds",
    icon: "↩️",
    desc: "Refund policies, cancellation steps, and timelines",
    articles: 7,
  },
  {
    title: "Account & Profile",
    icon: "👤",
    desc: "Password reset, profile management, and account security",
    articles: 8,
  },
  {
    title: "Travel Requirements",
    icon: "📋",
    desc: "IDs, local regulations, permits, and travel advisories",
    articles: 6,
  },
  {
    title: "Emergency Assistance",
    icon: "🚨",
    desc: "What to do if you need immediate help during your trip",
    articles: 4,
  },
];

const popularArticles = [
  { title: "How do I book a tour package?", category: "Booking & Payments", readTime: "2 min" },
  { title: "What is the cancellation policy?", category: "Cancellations & Refunds", readTime: "3 min" },
  { title: "How do I modify my itinerary after booking?", category: "Managing Your Trip", readTime: "3 min" },
  { title: "What payment methods are accepted?", category: "Booking & Payments", readTime: "1 min" },
  { title: "How do I reset my password?", category: "Account & Profile", readTime: "1 min" },
  { title: "Are airport transfers included?", category: "Managing Your Trip", readTime: "2 min" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

const HelpCenter = () => {
  const [query, setQuery] = useState("");

  const filtered = popularArticles.filter(
    (a) =>
      query === "" ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1f2937]">
      {/* ── Hero / Search ── */}
      <section className="bg-gradient-to-b from-[#f0fdf4] to-[#f8fafc] px-6 pb-14 pt-28 border-b border-[#e5e7eb] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <span className="mb-3 inline-block rounded-full border border-[#dcfce7] bg-[#dcfce7]/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
            Help Center
          </span>
          <h1 className="mb-4 font-display text-3xl font-extrabold text-[#1f2937] md:text-5xl">
            How can we help you?
          </h1>
          <p className="mb-8 text-sm text-[#6b7280]">
            Search our knowledge base or browse categories below.
          </p>
          <div className="relative mx-auto max-w-xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#9ca3af]">🔍</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics, or issues..."
              className="w-full rounded-lg border border-[#e5e7eb] bg-white py-3 pl-10 pr-10 text-sm text-[#1f2937] placeholder-[#9ca3af] shadow-sm outline-none transition focus:border-[#15803d] focus:ring-1 focus:ring-[#15803d]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#9ca3af] hover:text-[#1f2937]"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Categories ── */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-display text-xl font-bold text-[#1f2937]">Browse by Topic</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={fadeUp}
                className="group flex flex-col rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm transition hover:border-[#15803d]/40"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-xs font-bold text-[#15803d]">
                    {cat.articles} articles
                  </span>
                </div>
                <h3 className="mb-1 font-display text-base font-bold text-[#1f2937] transition group-hover:text-[#15803d]">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#6b7280]">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Articles ── */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-display text-xl font-bold text-[#1f2937]">
            {query ? `Results for "${query}"` : "Popular Articles"}
          </h2>

          <div className="divide-y divide-[#e5e7eb] overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
            {filtered.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group flex items-center justify-between px-6 py-4 transition hover:bg-[#f0fdf4]/50 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-semibold text-[#1f2937] transition group-hover:text-[#15803d]">
                    {article.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6b7280]">{article.category}</p>
                </div>
                <span className="text-xs text-[#9ca3af]">{article.readTime} read</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-16 pt-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#166534] p-8 text-center text-white shadow-sm">
          <h2 className="mb-2 font-display text-xl font-bold md:text-2xl">
            Still need help?
          </h2>
          <p className="mb-6 text-xs text-white/80">
            Our support team is available 7 days a week to answer your questions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-6 text-xs font-bold text-[#166534] transition hover:bg-[#f0fdf4]"
            >
              Contact Support
            </Link>
            <Link
              to="/faq"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-white/30 px-6 text-xs font-bold text-white transition hover:bg-white/10"
            >
              Browse FAQs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelpCenter;
