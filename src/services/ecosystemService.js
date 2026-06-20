import { apiRequest, isBackendEnabled, toBackendAssetUrl } from "./backendApi";

const localFallback = {
  guides: [],
  homestays: [],
  events: [],
  handicrafts: [],
  "eco-scores": [],
  "ar-vr": [],
};

const normalizeItem = (item) => ({
  ...item,
  image1: toBackendAssetUrl(item?.image1),
  media: Array.isArray(item?.media) ? item.media.map(toBackendAssetUrl) : [],
});

export const getEcosystemCollection = async (collection) => {
  if (!isBackendEnabled) {
    return { data: localFallback[collection] || [], error: null };
  }

  try {
    const data = await apiRequest(`/ecosystem/${collection}`);
    return {
      data: Array.isArray(data) ? data.map(normalizeItem) : data,
      error: null,
    };
  } catch (error) {
    return { data: localFallback[collection] || [], error };
  }
};

export const getStartupFeatures = async () => {
  if (!isBackendEnabled) {
    return { data: null, error: null };
  }

  try {
    return { data: await apiRequest("/ecosystem/startup-features"), error: null };
  } catch (error) {
    return { data: null, error };
  }
};
