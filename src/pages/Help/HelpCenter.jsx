import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HelpCenter = () => {
  const categories = [
    { title: "Booking & Payments", icon: "💳", desc: "Help with your reservations and transactions" },
    { title: "Managing Your Trip", icon: "🧳", desc: "Modifying itineraries, adding services" },
    { title: "Cancellations", icon: "↩️", desc: "Refund policies and cancellation steps" },
    { title: "Account Support", icon: "👤", desc: "Password reset, profile management" },
    { title: "Travel Requirements", icon: "📋", desc: "Visas, IDs, and local regulations" },
    { title: "Emergencies", icon: "🚨", desc: "What to do if you need immediate assistance" },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-6 font-display text-4xl text-white md:text-5xl">
            How can we help you?
          </h1>
          <div className="mx-auto max-w-xl relative mt-8">
            <input
              type="text"
              placeholder="Search for articles, topics, or issues..."
              className="w-full rounded-full border border-white/20 bg-white/5 py-4 pl-6 pr-12 text-white placeholder-white/40 focus:border-[#f0c94a] focus:outline-none focus:ring-1 focus:ring-[#f0c94a] backdrop-blur-md"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#f0c94a]">
              🔍
            </button>
          </div>
        </div>

        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/10"
            >
              <div className="mb-4 text-4xl">{cat.icon}</div>
              <h3 className="mb-2 font-display text-xl text-white group-hover:text-[#f0c94a] transition">
                {cat.title}
              </h3>
              <p className="text-sm text-[#f5efe6]/60">{cat.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#030a0c] p-10 text-center shadow-luxury">
          <h2 className="mb-4 font-display text-2xl text-white">Still need help?</h2>
          <p className="mb-8 text-[#f5efe6]/70">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#2f7dd3] px-8 text-sm font-bold text-white transition hover:bg-[#3d8ee9]"
            >
              Contact Support
            </Link>
            <Link
              to="/faq"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Browse FAQs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HelpCenter;
