import "./AdvancedUI.css";

const ItineraryTimeline = ({ places = [], days = 3 }) => {
  const safePlaces = places.length ? places : ["Arrival", "Local Experience", "Return"];
  const items = Array.from({ length: Math.max(1, Number(days || 3)) }).map((_, index) => ({
    day: index + 1,
    place: safePlaces[index % safePlaces.length],
    time: index === 0 ? "Arrival window" : index === safePlaces.length - 1 ? "Flexible checkout" : "Morning to evening",
  }));

  return (
    <div className="itinerary-timeline">
      {items.map((item) => (
        <article key={item.day} className="itinerary-day">
          <p className="eyebrow" style={{ margin: 0 }}>Day {item.day}</p>
          <strong style={{ display: "block", margin: "0.35rem 0", color: "#022c22", fontSize: "1.05rem" }}>{item.place}</strong>
          <p style={{ margin: 0, color: "#35705c" }}>{item.time} · guided route, local food stop, and scenic photo pause.</p>
        </article>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
