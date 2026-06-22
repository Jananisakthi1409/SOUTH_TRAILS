import { apiRequest, isBackendEnabled, isLocalFallbackEnabled, toBackendAssetUrl } from "./backendApi";

const normalizePackage = (pkg) => ({
  ...pkg,
  image1: toBackendAssetUrl(pkg?.image1),
  price: Number(pkg?.price || 0),
  days: Number(pkg?.days || 0),
  nights: Number(pkg?.nights || 0),
  rating: Number(pkg?.rating || 0),
});

export const generateAiItinerary = async (preferences) => {
  if (!isBackendEnabled || isLocalFallbackEnabled) {
    return {
      data: null,
      error: { message: "Using local planner matches while AI endpoints are unavailable." },
    };
  }

  try {
    const data = await apiRequest("/ai/itinerary", {
      method: "POST",
      body: preferences,
    });
    return {
      data: {
        ...data,
        matchedPackages: (data?.matched_packages || data?.matchedPackages || []).map(normalizePackage),
        dayPlan: data?.day_plan || data?.dayPlan || [],
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

export const chatWithOracle = async ({ message, language = "English", budget }) => {
  if (!isBackendEnabled) {
    return {
      data: null,
      error: { message: "Spring Boot AI endpoints are not configured." },
    };
  }

  try {
    const data = await apiRequest("/ai/oracle/chat", {
      method: "POST",
      body: { message, language, budget },
    });
    return {
      data: {
        ...data,
        suggestedPackages: (data?.suggested_packages || data?.suggestedPackages || []).map(normalizePackage),
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

export const getAiRecommendations = async (customerId) => {
  if (!isBackendEnabled) {
    return { data: null, error: { message: "Spring Boot AI endpoints are not configured." } };
  }

  try {
    const data = await apiRequest("/ai/recommendations", { params: { customerId } });
    return {
      data: {
        ...data,
        recommendedPackages: (data?.recommended_packages || data?.recommendedPackages || []).map(normalizePackage),
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

export const getReviewSentiment = async ({ packageId } = {}) => {
  if (!isBackendEnabled) {
    return { data: null, error: { message: "Spring Boot AI endpoints are not configured." } };
  }

  try {
    const data = await apiRequest("/ai/sentiment/reviews", { params: { packageId } });
    return {
      data: {
        ...data,
        totalReviews: data?.total_reviews || data?.totalReviews || 0,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

export const getCustomerNotifications = async (customerId) => {
  if (!isBackendEnabled || !customerId) {
    return { data: [], error: null };
  }

  try {
    return { data: await apiRequest(`/ai/notifications/${customerId}`), error: null };
  } catch (error) {
    return { data: [], error };
  }
};
