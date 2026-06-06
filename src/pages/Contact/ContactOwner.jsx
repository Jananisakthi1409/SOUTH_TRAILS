const ContactOwner = () => {
  return (
    <main className="app-shell contact-page">
      <section className="section contact-panel glass-card">
        <div className="section-heading">
          <p className="eyebrow accent-light">Contact Owner</p>
          <h1>Get in touch for custom tours and support</h1>
        </div>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Name
            <input type="text" placeholder="Your full name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Phone
            <input type="tel" placeholder="Phone number" />
          </label>
          <label>
            Message
            <textarea placeholder="How can we help you?" rows="5" />
          </label>
          <label>
            Request Type
            <select>
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
