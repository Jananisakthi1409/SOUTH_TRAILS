import { useState } from "react";
import { createContactRequest } from "../../services/contactService";
import { validateContactForm } from "../../utils/validation";

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

    setStatus({ type: "success", text: "Message sent successfully! Our team will reach out soon." });
    setForm({ name: "", email: "", phone: "", message: "", requestType: "Request Custom Tour" });
  };

  return (
    <main className="app-shell contact-page">
      <section className="section contact-panel glass-card">
        <div className="section-heading">
          <p className="eyebrow accent-light">Contact Owner</p>
          <h1>Get in touch for custom tours and support</h1>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {status && (
            <div className={`auth-alert auth-alert-${status.type}`}>
              {status.text}
            </div>
          )}
          <label>
            Name
            <input type="text" value={form.name} onChange={handleChange("name")} placeholder="Your full name" />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={handleChange("email")} placeholder="you@example.com" />
          </label>
          <label>
            Phone
            <input type="tel" value={form.phone} onChange={handleChange("phone")} placeholder="Phone number" />
          </label>
          <label>
            Message
            <textarea value={form.message} onChange={handleChange("message")} placeholder="How can we help you?" rows="5" />
          </label>
          <label>
            Request Type
            <select value={form.requestType} onChange={handleChange("requestType")}> 
              <option>Request Custom Tour</option>
              <option>Business Enquiry</option>
              <option>Partnership</option>
              <option>Support</option>
            </select>
          </label>
          <button className="button button-primary contact-button" type="submit">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactOwner;
