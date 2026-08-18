import { apiRequest, isBackendEnabled } from "./backendApi";

const STORAGE_KEY = "southTrailsWishlist";

const readLocalWishlist = () => {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeLocalWishlist = (items) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const getWishlist = async (customerId) => {
  if (isBackendEnabled && customerId) {
    try {
      return { data: await apiRequest(`/wishlist/${customerId}`), error: null };
    } catch (error) {
      return { data: [], error };
    }
  }

  return { data: readLocalWishlist(), error: null };
};

export const saveWishlistPackage = async ({ customerId, packageId, packageItem }) => {
  if (isBackendEnabled && customerId) {
    try {
      return { data: await apiRequest("/wishlist", { method: "POST", body: { customer_id: customerId, package_id: packageId } }), error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  const items = readLocalWishlist();
  if (!items.some((item) => item.id === packageId)) {
    writeLocalWishlist([packageItem, ...items]);
  }
  return { data: packageItem, error: null };
};

export const removeWishlistPackage = async ({ customerId, packageId }) => {
  if (isBackendEnabled && customerId) {
    try {
      await apiRequest(`/wishlist/${customerId}/${packageId}`, { method: "DELETE" });
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  writeLocalWishlist(readLocalWishlist().filter((item) => item.id !== packageId));
  return { error: null };
};
