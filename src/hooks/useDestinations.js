// src/hooks/useDestinations.js
import { useState } from "react";

const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  return { destinations, setDestinations };
};

export default useDestinations;
