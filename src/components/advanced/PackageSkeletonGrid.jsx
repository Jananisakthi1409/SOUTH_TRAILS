import "./AdvancedUI.css";

const PackageSkeletonGrid = ({ count = 6 }) => (
  <div className="skeleton-grid" aria-label="Loading packages">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="skeleton-card" />
    ))}
  </div>
);

export default PackageSkeletonGrid;
