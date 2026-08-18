import "./AdvancedUI.css";

const offers = [
  "Monsoon Kerala Deals: save on backwater escapes",
  "Weekend Getaways: Ooty, Coorg, Yercaud",
  "Temple Trails: Tirupati, Madurai, Rameswaram",
  "Luxury Couples: Alleppey, Hampi, Puducherry",
];

const OfferBanner = () => (
  <div className="offer-strip" aria-label="Current travel offers">
    <div className="offer-strip-track">
      {[...offers, ...offers].map((offer, index) => (
        <span key={`${offer}-${index}`}>{offer}</span>
      ))}
    </div>
  </div>
);

export default OfferBanner;
