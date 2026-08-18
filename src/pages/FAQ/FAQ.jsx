import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const faqData = [
  {
    category: "Bookings",
    icon: "📅",
    questions: [
      {
        q: "How do I book a tour package?",
        a: "Navigate to the Packages section, select your desired tour, choose your travel dates and group size, then click 'Book Now'. Follow the checkout process to confirm your booking.",
      },
      {
        q: "Can I book for a group?",
        a: "Yes! We offer special group pricing for parties of 6 or more. Select your group size during checkout and our team will reach out with customized group rates.",
      },
      {
        q: "Can I cancel or modify my booking?",
        a: "Yes. Visit your Profile → My Bookings page to request modifications or cancellations according to our cancellation policy.",
      },
    ],
  },
  {
    category: "Payments",
    icon: "💳",
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept all major credit and debit cards, UPI (GPay, PhonePe, Paytm), Net Banking, and select international payment gateways.",
      },
      {
        q: "Is it safe to pay online?",
        a: "Absolutely. Our payment system is PCI-DSS compliant and uses 256-bit SSL encryption. We never store raw card details on our servers.",
      },
    ],
  },
  {
    category: "Travel & Experiences",
    icon: "🗺️",
    questions: [
      {
        q: "Are airport transfers included?",
        a: "Airport transfers are included in all our Premium and Luxury packages. For Standard packages, they can be added during checkout.",
      },
      {
        q: "Are guides included in the tours?",
        a: "All our curated packages include certified expert local guides fluent in English and Tamil.",
      },
    ],
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition hover:border-[#15803d]/40">
      <button
        type="button"
        className="flex w-full items-center justify-between p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-sm font-semibold text-[#1f2937]">{question}</span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-transform duration-200 ${
            isOpen
              ? "rotate-180 border-[#15803d] bg-[#15803d] text-white"
              : "border-[#e5e7eb] text-[#6b7280]"
          }`}
        >
          ↓
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-[#e5e7eb] px-5 py-4 bg-[#f8fafc]">
              <p className="text-xs leading-relaxed text-[#6b7280]">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = faqData
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (faq) =>
          searchQuery === "" ||
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.questions.length > 0);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1f2937]">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#f0fdf4] to-[#f8fafc] px-6 pb-12 pt-28 border-b border-[#e5e7eb] text-center">
        <div className="mx-auto max-w-3xl">
          <span className="mb-3 inline-block rounded-full border border-[#dcfce7] bg-[#dcfce7]/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
            Support
          </span>
          <h1 className="mb-3 font-display text-3xl font-extrabold text-[#1f2937] md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mb-6 text-xs text-[#6b7280]">
            Find answers to common questions about bookings, payments, and travel services.
          </p>

          <div className="relative mx-auto max-w-lg">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#9ca3af]">🔍</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-lg border border-[#e5e7eb] bg-white py-2.5 pl-10 pr-10 text-xs text-[#1f2937] placeholder-[#9ca3af] shadow-sm outline-none transition focus:border-[#15803d] focus:ring-1 focus:ring-[#15803d]"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ Content ── */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-10">
          {filtered.map((section) => (
            <div key={section.category}>
              <div className="mb-4 flex items-center gap-2 border-b border-[#e5e7eb] pb-3">
                <span className="text-xl">{section.icon}</span>
                <h2 className="font-display text-lg font-bold text-[#1f2937]">{section.category}</h2>
              </div>
              <div className="space-y-3">
                {section.questions.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#166534] p-8 text-center text-white shadow-sm">
          <h2 className="mb-2 font-display text-xl font-bold md:text-2xl">
            Can't find your answer?
          </h2>
          <p className="mb-6 text-xs text-white/80">
            Our support team is available 7 days a week and typically responds within a few hours.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-6 text-xs font-bold text-[#166534] transition hover:bg-[#f0fdf4]"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
