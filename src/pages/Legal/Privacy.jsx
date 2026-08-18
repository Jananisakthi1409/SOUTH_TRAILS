import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
  {
    id: "collection",
    title: "1. Information We Collect",
    content: (
      <>
        <p className="mb-3 text-xs leading-relaxed text-[#6b7280]">
          We collect information from you when you register on our platform, make a booking,
          subscribe to our newsletter, respond to a survey, or interact with our services:
        </p>
        <ul className="space-y-2 text-xs text-[#6b7280]">
          {[
            "Personal identifiers: name, email address, phone number, mailing address",
            "Payment information (processed securely through certified payment gateways)",
            "Travel preferences, booking history, and trip feedback",
            "Device and browser information collected through cookies",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-[#15803d]">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "use",
    title: "2. How We Use Your Information",
    content: (
      <p className="text-xs leading-relaxed text-[#6b7280]">
        Information collected is used to personalize your travel recommendations, process bookings,
        send confirmation updates, improve customer support, and comply with legal requirements.
      </p>
    ),
  },
  {
    id: "security",
    title: "3. Data Security",
    content: (
      <p className="text-xs leading-relaxed text-[#6b7280]">
        We implement industry-standard SSL encryption for all data in transit and PCI-DSS compliant
        payment processing. Sensitive data is stored securely with restricted access controls.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "4. Third-Party Disclosure",
    content: (
      <p className="text-xs leading-relaxed text-[#6b7280]">
        We do not sell or trade your personal data. We only share necessary details with trusted partners
        (hotels, transport operators, guides) required to execute your booked itinerary.
      </p>
    ),
  },
  {
    id: "rights",
    title: "5. Your Rights",
    content: (
      <p className="text-xs leading-relaxed text-[#6b7280]">
        You have the right to request access to your personal data, update your preferences, request deletion,
        or opt out of marketing communications at any time by contacting our team.
      </p>
    ),
  },
];

const Privacy = () => {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1f2937]">
      <section className="bg-gradient-to-b from-[#f0fdf4] to-[#f8fafc] px-6 pb-12 pt-28 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-4xl">
          <span className="mb-3 inline-block rounded-full border border-[#dcfce7] bg-[#dcfce7]/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
            Legal Document
          </span>
          <h1 className="mb-2 font-display text-3xl font-extrabold text-[#1f2937] md:text-4xl">Privacy Policy</h1>
          <p className="text-xs text-[#6b7280]">
            Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
            >
              <h2 className="mb-3 font-display text-base font-bold text-[#1f2937]">
                {section.title}
              </h2>
              {section.content}
            </motion.div>
          ))}

          <div className="rounded-xl border border-[#dcfce7] bg-[#f0fdf4] p-6 text-center text-xs text-[#166534]">
            Have questions about your privacy?{" "}
            <Link to="/contact" className="font-bold underline text-[#15803d]">
              Contact our Privacy Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
