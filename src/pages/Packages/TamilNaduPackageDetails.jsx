import StatePackageDetails, { buildDestinationImages } from "./StatePackageDetails";
import "./TamilNaduPackageDetails.css";

const imageModules = import.meta.glob("../state/tamilnadu/**/*.{webp,avif}");
const destinationImages = buildDestinationImages(imageModules, "tamilnadu");

const TamilNaduPackageDetails = () => (
  <StatePackageDetails
    backPath="/tamil-nadu-packages"
    classPrefix="tnpd"
    destinationImages={destinationImages}
  />
);

export default TamilNaduPackageDetails;
