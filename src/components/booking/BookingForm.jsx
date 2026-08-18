import "./BookingForm.css";

const BookingForm = ({
  form,
  price,
  totalAmount,
  error,
  isSubmitting,
  onChange,
  onSubmit,
  onBack,
}) => (
  <div className="booking-form booking-form-shared">
    <div className="form-group">
      <label htmlFor="travelers">Number of Travelers</label>
      <input
        id="travelers"
        type="number"
        min="1"
        value={form.travelers}
        onChange={(event) => onChange("travelers", event.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="travel-date">Travel Date</label>
      <input
        id="travel-date"
        type="date"
        value={form.travelDate}
        onChange={(event) => onChange("travelDate", event.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="traveler-name">Full Name</label>
      <input
        id="traveler-name"
        type="text"
        placeholder="Your name"
        value={form.fullName}
        onChange={(event) => onChange("fullName", event.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="traveler-email">Email</label>
      <input
        id="traveler-email"
        type="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={(event) => onChange("email", event.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="traveler-phone">Phone</label>
      <input
        id="traveler-phone"
        type="tel"
        placeholder="+91 XXXXXXXXXX"
        value={form.phone}
        onChange={(event) => onChange("phone", event.target.value)}
      />
    </div>
    <div className="payment-section">
      <label>Payment Method</label>
      <div className="payment-options">
        {["online", "arrival"].map((method) => (
          <label key={method} className="payment-option">
            <input
              type="radio"
              name="payment"
              value={method}
              checked={form.paymentMethod === method}
              onChange={(event) => onChange("paymentMethod", event.target.value)}
            />
            <span>{method === "online" ? "Online Payment" : "Cash On Arrival"}</span>
          </label>
        ))}
      </div>
    </div>
    <div className="price-breakdown">
      <div className="breakdown-item">
        <span>Package Price (per person)</span>
        <span>{price}</span>
      </div>
      <div className="breakdown-item">
        <span>Number of Persons</span>
        <span>{Math.max(Number(form.travelers) || 1, 1)}</span>
      </div>
      <div className="breakdown-total">
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
    </div>
    {error && <p className="booking-error">{error}</p>}
    <button type="button" className="book-btn" onClick={onSubmit} disabled={isSubmitting}>
      {isSubmitting ? "Saving..." : "Proceed to Booking"}
    </button>
    <button type="button" className="back-btn" onClick={onBack}>
      Back to Packages
    </button>
  </div>
);

export default BookingForm;
