import "./PackageCard.css";

const formatPrice = (price) => `Rs. ${Number(price || 0).toLocaleString("en-IN")}`;

const PackageCard = ({ pkg, image, actions }) => (
  <article className="package-card-shared">
    <div className="package-card-media">
      {image ? (
        <img src={image} alt={pkg.title} loading="lazy" />
      ) : (
        <div className="package-card-placeholder">No image</div>
      )}
      <span>{pkg.state || "South India"}</span>
    </div>
    <div className="package-card-copy">
      <p>{pkg.category || "Experience"}</p>
      <h3>{pkg.title}</h3>
      <div className="package-card-meta">
        <span>{pkg.destination}</span>
        <strong>{formatPrice(pkg.price)}</strong>
      </div>
      <div className="package-card-meta">
        <span>{pkg.days} Days / {pkg.nights} Nights</span>
        {pkg.rating && <span>{pkg.rating}/5</span>}
      </div>
    </div>
    {actions && <div className="package-card-actions">{actions}</div>}
  </article>
);

export default PackageCard;
