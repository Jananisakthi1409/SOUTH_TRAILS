import { apiRequest, isBackendEnabled } from "./backendApi";

export const getAnalyticsOverview = async () => {
  if (!isBackendEnabled) {
    return { data: null, error: { message: "Spring Boot API is not configured." } };
  }

  try {
    return { data: await apiRequest("/analytics"), error: null };
  } catch (error) {
    return { data: null, error };
  }
};
