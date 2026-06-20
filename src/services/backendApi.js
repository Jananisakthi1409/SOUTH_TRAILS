export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export const isBackendEnabled = Boolean(API_BASE_URL);
export const isLocalFallbackEnabled =
  !isBackendEnabled ||
  import.meta.env.VITE_ENABLE_LOCAL_FALLBACK === "true" ||
  (import.meta.env.DEV && !isBackendEnabled && import.meta.env.VITE_ENABLE_LOCAL_FALLBACK !== "false");

export class BackendApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "BackendApiError";
    this.status = status;
  }
}

const buildUrl = (path, params = {}) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

export const toBackendAssetUrl = (url) => {
  if (!url || typeof url !== "string") return url;
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  if (!API_BASE_URL) return url;
  return `${API_BASE_URL.replace(/\/api$/, "")}${url.startsWith("/") ? url : `/${url}`}`;
};

const readStoredToken = () => {
  if (typeof window === "undefined") return "";
  for (const key of ["southTrailsAdmin", "southTrailsUser"]) {
    try {
      const raw = window.localStorage.getItem(key);
      const session = raw ? JSON.parse(raw) : null;
      if (session?.token) return session.token;
    } catch {
      return "";
    }
  }
  return "";
};

export const apiRequest = async (path, { method = "GET", body, params } = {}) => {
  if (!isBackendEnabled) {
    throw new BackendApiError("Spring Boot API is not configured.", 0);
  }

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const token = readStoredToken();
  const headers = {};
  if (body !== undefined && !isFormData) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(buildUrl(path, params), {
    method,
    headers: Object.keys(headers).length ? headers : undefined,
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new BackendApiError(payload?.message || `API request failed with status ${response.status}`, response.status);
  }

  return payload;
};

export const shouldUseFallback = (error) => {
  if (isLocalFallbackEnabled) return true;
  console.error("Spring Boot API request failed and local fallback is disabled.", error);
  return false;
};
