import "./AdvancedUI.css";

const steps = ["Pending", "Confirmed", "Payment", "Trip Starts", "Completed"];

const getIndex = (status) => {
  if (status === "Confirmed") return 1;
  if (status === "Completed") return 4;
  if (status === "Cancelled") return 0;
  return 0;
};

const BookingTimeline = ({ status = "Pending" }) => {
  const activeIndex = getIndex(status);
  return (
    <div className="timeline" aria-label={`Booking status ${status}`}>
      {steps.map((step, index) => (
        <div key={step} className={`timeline-step ${index <= activeIndex ? "active" : ""}`}>
          <div className="timeline-dot">{index + 1}</div>
          <div className="timeline-copy">
            <strong>{step}</strong>
            <p style={{ margin: "0.2rem 0 0", color: "#35705c" }}>
              {index <= activeIndex ? "Completed or active" : "Upcoming"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingTimeline;
