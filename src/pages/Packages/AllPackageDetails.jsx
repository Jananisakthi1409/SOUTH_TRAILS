import StatePackageDetails, { buildDestinationImages } from "./StatePackageDetails";
import "./StatePackageDetails.css";

const imageModules = import.meta.glob("../state/**/*.{webp,avif}");

const allDestinationImages = {
  ...buildDestinationImages(imageModules, "tamilnadu"),
};

const AllPackageDetails = () => (
  <StatePackageDetails
    backPath="/packages"
    classPrefix="package-detail"
    destinationImages={allDestinationImages}
  />
);

export default AllPackageDetails;
