import { useState } from "react";
import { createContactRequest } from "../../services/contactService";
import { validateContactForm } from "../../utils/validation";
import kanyakumariImg from "../state/tamilnadu/kanyakumari/pexels-prasang-yadav-2151662075-37512272.webp";

const ContactOwner = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    requestType: "Request Custom Tour",
  });
  const [status, setStatus] = useState(null);

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

    const { error } = await createContactRequest({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      request_type: form.requestType,
    });

    if (error) {
      setStatus({ type: "error", text: "Unable to send your message. Please try again later." });
      return;
    }

    setStatus({ type: "success", text: "Message sent successfully. Our team will reach out soon." });
    setForm({ name: "", email: "", phone: "", message: "", requestType: "Request Custom Tour" });
  };

  return (
    <main className="min-h-screen bg-[#07110f] font-sans text-white">
      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <img src={kanyakumariImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,15,0.98),rgba(7,17,15,0.78),rgba(7,17,15,0.34))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="self-end">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#f0c94a]">Tamil Trails concierge</p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.8rem,9vw,8rem)] uppercase leading-[0.82]">
              Tell us the journey.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70">
              Custom Tamil Nadu tours, premium packages, business enquiries, partnerships,
              and support requests all start here.
            </p>
          </div>

          <form className="rounded-md border border-white/12 bg-white/10 p-6 shadow-luxury backdrop-blur-xl" onSubmit={handleSubmit}>
            {status && (
              <div className={`mb-5 rounded-md p-4 text-sm font-bold ${
                status.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
              }`}>
                {status.text}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name">
                <input type="text" value={form.name} onChange={handleChange("name")} placeholder="Your full name" className={inputClass} />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={handleChange("email")} placeholder="you@example.com" className={inputClass} />
              </Field>
              <Field label="Phone">
                <input type="tel" value={form.phone} onChange={handleChange("phone")} placeholder="Phone number" className={inputClass} />
              </Field>
              <Field label="Request Type">
                <select value={form.requestType} onChange={handleChange("requestType")} className={inputClass}>
                  <option>Request Custom Tour</option>
                  <option>Business Enquiry</option>
                  <option>Partnership</option>
                  <option>Support</option>
                </select>
              </Field>
            </div>

            <Field label="Message">
              <textarea
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Tell us your dates, budget, group size, interests, and must-see places."
                rows="6"
                className={`${inputClass} py-3`}
              />
            </Field>

            <button className="mt-6 min-h-14 rounded-md bg-[#f0c94a] px-8 font-black text-[#1a0a00]" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

const Field = ({ label, children }) => (
  <label className="mt-5 block text-sm font-black text-white first:mt-0">
    {label}
    <div className="mt-2">{children}</div>
  </label>
);

const inputClass = "min-h-12 w-full rounded-md border border-white/15 bg-white/95 px-4 text-[#1a0a00] outline-none placeholder:text-[#7a6d64]";

export default ContactOwner;
