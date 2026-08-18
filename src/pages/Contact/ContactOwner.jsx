import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createContactRequest } from "../../services/contactService";
import { validateContactForm } from "../../utils/validation";

const contactInfo = [
  {
    icon: "📍",
    title: "Our Office",
    lines: ["South Trails HQ", "No. 14, Anna Salai, Chennai", "Tamil Nadu – 600 002, India"],
  },
  {
    icon: "📞",
    title: "Phone",
    lines: ["+91 44 2222 8800", "+91 98400 12345 (WhatsApp)"],
  },
  {
    icon: "✉️",
    title: "Email",
    lines: ["hello@southtrails.in", "bookings@southtrails.in"],
  },
  {
    icon: "🕐",
    title: "Working Hours",
    lines: ["Mon – Sat: 9 AM – 7 PM IST", "Sunday: 10 AM – 4 PM IST"],
  },
];

const requestTypes = [
  "Request Custom Tour",
  "Business Enquiry",
  "Partnership",
  "Media & Press",
  "Support",
  "Feedback",
];

const ContactOwner = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    requestType: "Request Custom Tour",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateContactForm(form);
    if (validationError) {
      setStatus({ type: "error", text: validationError });
      return;
    }

    setLoading(true);
    const { error } = await createContactRequest({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      request_type: form.requestType,
    });
    setLoading(false);

    if (error) {
      setStatus({ type: "error", text: "Unable to send your message. Please try again later." });
      return;
    }

    setStatus({ type: "success", text: "Your message has been sent! Our team will reach out within 24 hours." });
    setForm({ name: "", email: "", phone: "", message: "", requestType: "Request Custom Tour" });
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1f2937]">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#f0fdf4] to-[#f8fafc] px-6 pb-16 pt-28 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="mb-3 inline-block rounded-full border border-[#dcfce7] bg-[#dcfce7]/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#166534]">
              South Trails Concierge
            </span>
            <h1 className="mb-4 font-display text-4xl font-extrabold text-[#1f2937] md:text-5xl">
              Tell us about your journey.
            </h1>
            <p className="text-base leading-relaxed text-[#6b7280]">
              Custom Tamil Nadu tours, premium packages, business enquiries, partnerships,
              and support requests — it all starts with a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Grid ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            {/* Left – Info */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 font-display text-xl font-bold text-[#1f2937]">
                  We'd love to hear from you
                </h2>
                <p className="text-xs leading-relaxed text-[#6b7280]">
                  Whether you're planning your first visit to Tamil Nadu or returning to discover more,
                  our expert team is ready to assist.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#15803d]">
                        {info.title}
                      </p>
                      {info.lines.map((line) => (
                        <p key={line} className="text-xs text-[#6b7280]">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right – Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-8 shadow-sm"
              >
                <h3 className="mb-6 font-display text-lg font-bold text-[#1f2937]">Send us a message</h3>

                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mb-6 flex items-start gap-3 rounded-lg p-4 text-xs font-semibold ${
                        status.type === "success"
                          ? "bg-[#f0fdf4] text-[#166534] border border-[#dcfce7]"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      <span>{status.type === "success" ? "✅" : "⚠️"}</span>
                      {status.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Your full name"
                      className={inputClass}
                      required
                    />
                  </Field>
                  <Field label="Email Address">
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="you@example.com"
                      className={inputClass}
                      required
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      placeholder="+91 98XXX XXXXX"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Request Type">
                    <select
                      value={form.requestType}
                      onChange={handleChange("requestType")}
                      className={inputClass}
                    >
                      {requestTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Your Message" className="mt-4">
                  <textarea
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Tell us your travel dates, group size, budget, or preferred destinations..."
                    rows={4}
                    className={`${inputClass} py-2.5`}
                    required
                  />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#15803d] py-3 text-sm font-bold text-white transition hover:bg-[#166534] disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <p className="mt-3 text-center text-xs text-[#6b7280]">
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Field = ({ label, children, className = "" }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-xs font-semibold text-[#1f2937]">
      {label}
    </span>
    {children}
  </label>
);

const inputClass =
  "w-full rounded-lg border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-xs text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#15803d] focus:ring-1 focus:ring-[#15803d] transition";

export default ContactOwner;
