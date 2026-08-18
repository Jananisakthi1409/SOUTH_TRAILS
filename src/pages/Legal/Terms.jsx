import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <p className="text-xs leading-relaxed text-[#6b7280]">
        By accessing and using the South Trails platform ("the Platform"), you confirm that you
        are at least 18 years of age and agree to be bound by these Terms of Service and our Privacy Policy.
      </p>
    ),
  },
  {
    id: "services",
    title: "2. Services Description",
    content: (
      <p className="text-xs leading-relaxed text-[#6b7280]">
        South Trails provides curated travel packages, itineraries, AI trip planning, and booking intermediary
        services within South India. We partner with verified hotels, transport operators, and local guides.
      </p>
    ),
  },
  {
    id: "bookings",
    title: "3. Booking & Payments",
    content: (
      <ul className="space-y-2 text-xs text-[#6b7280]">
        {[
          "All bookings are subject to availability and final confirmation.",
          "Prices displayed are per-person unless stated otherwise.",
          "Full payment or specified deposit is required to secure a reservation.",
          "Payments are processed securely via PCI-DSS compliant gateways.",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-[#15803d]">✦</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "cancellations",
    title: "4. Cancellations & Refunds",
    content: (
      <div className="overflow-hidden rounded-lg border border-[#e5e7eb]">
        <table className="w-full text-xs">
          <thead className="bg-[#f8fafc] text-[#1f2937]">
            <tr className="border-b border-[#e5e7eb]">
              <th className="px-4 py-2.5 text-left font-bold">Cancellation Timing</th>
              <th className="px-4 py-2.5 text-left font-bold">Refund Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb] text-[#6b7280]">
            <tr>
              <td className="px-4 py-2">30+ days before travel</td>
              <td className="px-4 py-2 font-semibold text-[#166534]">Full refund minus 2% fee</td>
            </tr>
            <tr>
              <td className="px-4 py-2">15–29 days before travel</td>
              <td className="px-4 py-2 font-semibold text-[#166534]">50% refund</td>
            </tr>
            <tr>
              <td className="px-4 py-2">7–14 days before travel</td>
              <td className="px-4 py-2 font-semibold text-[#166534]">25% refund</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Under 7 days before travel</td>
              <td className="px-4 py-2 font-semibold text-[#dc2626]">No refund</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "liability",
    title: "5. Limitation of Liability",
    content: (
      <p className="text-xs leading-relaxed text-[#6b7280]">
        South Trails acts as an intermediary and is not liable for third-party provider defaults or delays beyond our control.
      </p>
    ),
  },
];

const Terms = () => {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1f2937]">
      <section className="bg-gradient-to-b from-[#f0fdf4] to-[#f8fafc] px-6 pb-12 pt-28 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-4xl">
          <span className="mb-3 inline-block rounded-full border border-[#dcfce7] bg-[#dcfce7]/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
            Legal Agreement
          </span>
          <h1 className="mb-2 font-display text-3xl font-extrabold text-[#1f2937] md:text-4xl">Terms of Service</h1>
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
            Questions about our terms?{" "}
            <Link to="/contact" className="font-bold underline text-[#15803d]">
              Contact Legal Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;
