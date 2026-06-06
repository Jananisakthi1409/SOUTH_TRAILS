// src/hooks/useOracle.js
import { useState } from "react";

const useOracle = () => {
  const [response, setResponse] = useState(null);
  return { response, setResponse };
};

export default useOracle;
