import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const storedBookings = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
    if (storedBookings.length) {
      setBooking(storedBookings[storedBookings.length - 1]);
    }
  }, []);

  const handlePayNow = () => {
    if (!booking) {
      return;
    }
    const storedBookings = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
    const updatedBookings = storedBookings.map((item, index) =>
      index === storedBookings.length - 1 ? { ...item, status: "Confirmed" } : item
    );
    window.localStorage.setItem("southTrailsBookings", JSON.stringify(updatedBookings));
    navigate("/profile");
  };

  return (
    <main className="app-shell payment-page">
      <section className="section payment-panel glass-card">
        <div className="section-heading">
          <p className="eyebrow accent-light">Payment</p>
          <h1>Secure your booking</h1>
        </div>
        <div className="payment-summary">
          <div>
            <p className="summary-label">Package Summary</p>
            <h2>{booking?.packageName || "South Trails Package"}</h2>
          </div>
          <div className="summary-details">
            <span>Travelers: {booking?.travelers || "—"}</span>
            <span>Total: {booking?.price || "₹59,996"}</span>
          </div>
        </div>
        <button className="button button-primary payment-button" type="button" onClick={handlePayNow}>
          Pay Now
        </button>
      </section>
      <section className="section payment-note">
        <p>After payment, you will receive a booking confirmation email with your itinerary details.</p>
      </section>
    </main>
  );
};

export default Payment;
