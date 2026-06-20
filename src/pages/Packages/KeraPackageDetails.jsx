import StatePackageDetails, { buildDestinationImages } from "./StatePackageDetails";
import "./KeraPackageDetails.css";

const imageModules = import.meta.glob("../state/kerala/**/*.{webp,avif}");
const destinationImages = buildDestinationImages(imageModules, "kerala");

const KeraPackageDetails = () => (
  <StatePackageDetails
    backPath="/kerala-packages"
    classPrefix="kpd"
    destinationImages={destinationImages}
  />
);

export default KeraPackageDetails;
