import StatePackageDetails, { buildDestinationImages } from "./StatePackageDetails";
import "./KarnatakaPackageDetails.css";

const imageModules = import.meta.glob("../state/karnataka/**/*.{webp,avif}");
const destinationImages = buildDestinationImages(imageModules, "karnataka");

const KarnatakaPackageDetails = () => (
  <StatePackageDetails
    backPath="/karnataka-packages"
    classPrefix="kapd"
    destinationImages={destinationImages}
  />
);

export default KarnatakaPackageDetails;
