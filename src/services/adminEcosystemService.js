import { apiRequest, isBackendEnabled } from "./backendApi";

const fallback = {
  guides: [],
  homestays: [],
  events: [],
  handicrafts: [],
  "eco-scores": [],
  notifications: [],
  itineraries: [],
};

const endpointFor = (moduleKey) => `/admin/ecosystem/${moduleKey}`;

export const getAdminEcosystemItems = async (moduleKey) => {
  if (!isBackendEnabled) return { data: fallback[moduleKey] || [], error: null };

  try {
    return { data: await apiRequest(endpointFor(moduleKey)), error: null };
  } catch (error) {
    return { data: fallback[moduleKey] || [], error };
  }
};

export const createAdminEcosystemItem = async (moduleKey, payload) => {
  try {
    const data = await apiRequest(endpointFor(moduleKey), {
      method: "POST",
      body: payload,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const updateAdminEcosystemItem = async (moduleKey, id, payload) => {
  try {
    const data = await apiRequest(`${endpointFor(moduleKey)}/${id}`, {
      method: "PUT",
      body: payload,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const deleteAdminEcosystemItem = async (moduleKey, id) => {
  try {
    await apiRequest(`${endpointFor(moduleKey)}/${id}`, { method: "DELETE" });
    return { error: null };
  } catch (error) {
    return { error };
  }
};
