import axios from "axios";

// Generic function to hit any endpoint with a payload generator
export const createEndpointHitter = (apiUrl, generatePayload) => {
  const hitEndpoint = async () => {
    const payload = generatePayload();
    try {
      const response = await axios.post(apiUrl, payload);
      console.log("Success:", response.data);
      console.log("Sent payload:", payload);
      return true;
    } catch (error) {
      if (
        error.code === "ECONNRESET" ||
        (error.response && error.response.status >= 400)
      ) {
        console.error("Critical error encountered:");
        console.error("Error Code:", error.code || error.response.status);
        console.error("Error Message:", error.message);
        if (error.response && error.response.data) {
          console.error("Response Data:", error.response.data);
        }
        console.error("Failed payload:", payload);
        return false;
      }
      console.error("Non-critical error:", error.message);
      console.log("Failed payload:", payload);
      return true;
    }
  };

  return hitEndpoint;
};

// Generic function to start continuous requests
export const startAttack = async (hitEndpoint, delay = 1000) => {
  console.log("Starting to hit the endpoint...");
  while (true) {
    const shouldContinue = await hitEndpoint();
    if (!shouldContinue) {
      console.log("Stopping attack due to critical error...");
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};
