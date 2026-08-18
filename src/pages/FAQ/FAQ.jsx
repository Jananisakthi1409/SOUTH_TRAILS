import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    category: "Bookings",
    questions: [
      { q: "How do I book a tour package?", a: "You can book a package by navigating to the Packages section, selecting your desired tour, and clicking the 'Book Now' button. Follow the checkout process to secure your spot." },
      { q: "Can I cancel or modify my booking?", a: "Yes, you can cancel or modify your booking from your Profile > My Bookings page. Please note that cancellation fees may apply depending on how close you are to the travel date." },
    ]
  },
  {
    category: "Payment",
    questions: [
      { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, UPI, Net Banking, and select international payment gateways." },
      { q: "Is it safe to use my credit card on your site?", a: "Absolutely. We use industry-standard encryption and secure payment gateways to ensure your financial information is protected." },
    ]
  },
  {
    category: "Travel",
    questions: [
      { q: "Do you provide airport transfers?", a: "Yes, airport transfers are included in our premium packages. For standard packages, they can be added during the booking process." },
      { q: "Are guides included in the tours?", a: "Yes, all our curated packages include expert local guides who speak multiple languages including English and Tamil." },
    ]
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between p-6 text-left focus-visible"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-white">{question}</span>
        <span className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 transition-transform ${isOpen ? 'rotate-180 bg-[#f0c94a] text-black border-[#f0c94a]' : 'text-white'}`}>
          ↓
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6"
          >
            <p className="text-sm text-[#f5efe6]/70 leading-relaxed border-t border-white/10 pt-4 mt-2">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-[#f0c94a]">
            Support
          </span>
          <h1 className="mb-6 font-display text-4xl text-white md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="text-[#f5efe6]/70 max-w-xl mx-auto">
            Find answers to common questions about booking, payments, and our travel services.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="mb-6 font-display text-2xl text-white border-b border-white/10 pb-4">
                {section.category}
              </h2>
              <div>
                {section.questions.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQ;
