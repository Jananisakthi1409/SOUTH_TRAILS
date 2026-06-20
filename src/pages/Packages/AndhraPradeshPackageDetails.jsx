import StatePackageDetails, { buildDestinationImages } from "./StatePackageDetails";
import "./AndhraPradeshPackageDetails.css";

const imageModules = import.meta.glob("../state/andhra/**/*.{webp,avif}");
const destinationImages = buildDestinationImages(imageModules, "andhra");

const AndhraPradeshPackageDetails = () => (
  <StatePackageDetails
    backPath="/andhra-packages"
    classPrefix="aapd"
    destinationImages={destinationImages}
  />
);

export default AndhraPradeshPackageDetails;
