import { supabase } from "./supabase";
import { apiRequest, isBackendEnabled, shouldUseFallback, toBackendAssetUrl } from "./backendApi";
import tamilNaduPackages from "../pages/Packages/tamilNaduPackageData";
import keraPackages from "../pages/Packages/keraPackageData";
import karnatakaPackages from "../pages/Packages/karnatakaPackageData";
import andhraPradeshPackages from "../pages/Packages/andhraPradeshPackageData";

const fallbackPackages = {
  "Tamil Nadu": tamilNaduPackages.map((pkg) => ({ ...pkg, state: "Tamil Nadu" })),
  Kerala: keraPackages.map((pkg) => ({ ...pkg, state: "Kerala" })),
  Karnataka: karnatakaPackages.map((pkg) => ({ ...pkg, state: "Karnataka" })),
  "Andhra Pradesh": andhraPradeshPackages.map((pkg) => ({ ...pkg, state: "Andhra Pradesh" })),
};

const normalizePackage = (pkg) => {
  const imageFolder = pkg.imageFolder || pkg.image_folder || pkg.imagefolder || (typeof pkg.id === "string" ? pkg.id.split("-")[0] : "") || "";
  return {
    ...pkg,
    id: pkg.id || String(pkg.id),
    price: typeof pkg.price === "string" ? Number(pkg.price.replace(/[^0-9.]/g, "")) : pkg.price,
    days: Number(pkg.days || 0),
    nights: Number(pkg.nights || 0),
    rating: pkg.rating || null,
    imageFolder,
    image1: toBackendAssetUrl(pkg.image1),
    image2: toBackendAssetUrl(pkg.image2),
    image3: toBackendAssetUrl(pkg.image3),
    places: Array.isArray(pkg.places) ? pkg.places : pkg.places ? JSON.parse(pkg.places) : [],
    included: Array.isArray(pkg.included) ? pkg.included : pkg.included ? JSON.parse(pkg.included) : [],
    highlights: Array.isArray(pkg.highlights) ? pkg.highlights : pkg.highlights ? JSON.parse(pkg.highlights) : [],
  };
};

export const getPackages = async ({ state, category, search, minPrice, maxPrice, minDays, maxDays, minRating } = {}) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest("/packages", { params: { state, category, search, minPrice, maxPrice, minDays, maxDays, minRating } });
      if (data?.length) return data.map(normalizePackage);
    } catch (error) {
      console.error("getPackages", error);
      if (!shouldUseFallback(error)) return [];
    }
  }

  if (!supabase) {
    const statePackages = state ? fallbackPackages[state] || [] : Object.values(fallbackPackages).flat();
    let packages = statePackages;

    if (category) {
      packages = packages.filter((pkg) => pkg.category === category);
    }
    if (search) {
      const query = search.toLowerCase();
      packages = packages.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(query) ||
          pkg.destination.toLowerCase().includes(query) ||
          pkg.category.toLowerCase().includes(query)
      );
    }

    return packages.map(normalizePackage);
  }

  let query = supabase.from("packages").select("*");
  if (state) query = query.eq("state", state);
  if (category) query = query.eq("category", category);
  if (search) query = query.ilike("title", `%${search}%`);
  
  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) {
    console.error("getPackages", error);
    return [];
  }
  return data.map(normalizePackage);
};

export const getPackageById = async (id) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest(`/packages/${id}`);
      if (data) return normalizePackage(data);
    } catch (error) {
      console.error("getPackageById", error);
      if (!shouldUseFallback(error)) return null;
    }
  }

  if (!supabase) {
    const all = Object.values(fallbackPackages).flat();
    const pkg = all.find((item) => item.id === id || String(item.id) === String(id));
    return pkg ? normalizePackage(pkg) : null;
  }

  const { data, error } = await supabase.from("packages").select("*").eq("id", id).single();
  if (error) {
    console.error("getPackageById", error);
    return null;
  }

  return data ? normalizePackage(data) : null;
};

export const createPackage = async (packageData) => {
  const payload = {
    ...packageData,
    id: packageData.id || String(Date.now()),
    price: Number(packageData.price),
    days: Number(packageData.days),
    nights: Number(packageData.nights),
    rating: packageData.rating || null,
    image_folder: packageData.imageFolder || packageData.image_folder || "",
    places: Array.isArray(packageData.places) ? packageData.places : [],
    included: Array.isArray(packageData.included) ? packageData.included : [],
    highlights: Array.isArray(packageData.highlights) ? packageData.highlights : [],
  };
  if (isBackendEnabled) {
    try {
      const data = await apiRequest("/packages", { method: "POST", body: payload });
      return { data, error: null };
    } catch (error) {
      if (!shouldUseFallback(error)) return { data: null, error };
      return { data: null, error };
    }
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }

  try {
    return await supabase.from("packages").insert(payload);
  } catch (error) {
    return { data: null, error: { message: error?.message || "Supabase request failed" } };
  }
};

export const updatePackage = async (id, payload) => {
  if (isBackendEnabled) {
    try {
      const body = {
        ...payload,
        price: Number(payload.price),
        days: Number(payload.days),
        nights: Number(payload.nights),
        image_folder: payload.imageFolder || payload.image_folder || "",
        places: Array.isArray(payload.places) ? payload.places : [],
        included: Array.isArray(payload.included) ? payload.included : [],
        highlights: Array.isArray(payload.highlights) ? payload.highlights : [],
      };
      delete body.imageFolder;
      const data = await apiRequest(`/packages/${id}`, { method: "PUT", body });
      return { data, error: null };
    } catch (error) {
      if (!shouldUseFallback(error)) return { data: null, error };
      return { data: null, error };
    }
  }

  const { data, error } = await supabase
    .from("packages")
    .update(payload)
    .eq("id", id)
    .select();

  return { data, error };
};

export const deletePackage = async (id) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest(`/packages/${id}`, { method: "DELETE" });
      return { data, error: null };
    } catch (error) {
      if (!shouldUseFallback(error)) return { data: null, error };
      return { data: null, error };
    }
  }

  const { error } = await supabase
    .from("packages")
    .delete()
    .eq("id", id);

  return { error };
};

// --- Seed function safely isolated at the bottom ---
/**
 * One-time execution utility to seed raw packages into Supabase.
 * Maps exact database columns and strips client-side visual extensions.
 */
export const seedPackagesToSupabase = async () => {
  try {
    console.log("Preparing payload for database seeding...");

    // 1. Process and format datasets to strict database schema targets
    const tnPayload = tamilNaduPackages.map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      destination: pkg.destination,
      state: "Tamil Nadu",
      category: pkg.category,
      days: Number(pkg.days || 0),
      nights: Number(pkg.nights || 0),
      price: typeof pkg.price === "string" ? Number(pkg.price.replace(/[^0-9.]/g, "")) : Number(pkg.price || 0),
      description: pkg.description || "",
      rating: pkg.rating || null,
      imageFolder: pkg.imageFolder || "",
      places: pkg.places || [],
      included: pkg.included || [],
      highlights: pkg.highlights || [],
      status: pkg.status || "active",
    }));

    const keralaPayload = keraPackages.map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      destination: pkg.destination,
      state: "Kerala",
      category: pkg.category,
      days: Number(pkg.days || 0),
      nights: Number(pkg.nights || 0),
      price: typeof pkg.price === "string" ? Number(pkg.price.replace(/[^0-9.]/g, "")) : Number(pkg.price || 0),
      description: pkg.description || "",
      rating: pkg.rating || null,
      imageFolder: pkg.imageFolder || "",
      places: pkg.places || [],
      included: pkg.included || [],
      highlights: pkg.highlights || [],
      status: pkg.status || "active",
    }));

    const karnatakaPayload = karnatakaPackages.map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      destination: pkg.destination,
      state: "Karnataka",
      category: pkg.category,
      days: Number(pkg.days || 0),
      nights: Number(pkg.nights || 0),
      price: typeof pkg.price === "string" ? Number(pkg.price.replace(/[^0-9.]/g, "")) : Number(pkg.price || 0),
      description: pkg.description || "",
      rating: pkg.rating || null,
      imageFolder: pkg.imageFolder || "",
      places: pkg.places || [],
      included: pkg.included || [],
      highlights: pkg.highlights || [],
      status: pkg.status || "active",
    }));

    const andhraPayload = andhraPradeshPackages.map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      destination: pkg.destination,
      state: "Andhra Pradesh",
      category: pkg.category,
      days: Number(pkg.days || 0),
      nights: Number(pkg.nights || 0),
      price: typeof pkg.price === "string" ? Number(pkg.price.replace(/[^0-9.]/g, "")) : Number(pkg.price || 0),
      description: pkg.description || "",
      rating: pkg.rating || null,
      imageFolder: pkg.imageFolder || "",
      places: pkg.places || [],
      included: pkg.included || [],
      highlights: pkg.highlights || [],
      status: pkg.status || "active",
    }));

    // 2. Concat into a single integrated array structure using corrected variables
    const payload = [
      ...tnPayload,
      ...keralaPayload,
      ...karnatakaPayload,
      ...andhraPayload
    ];

    console.log(`Sending a single payload block containing ${payload.length} records to Supabase...`);

    // 3. Perform a single batch database insert transaction
    const { data, error } = await supabase
      .from("packages")
      .insert(payload)
      .select();

    // 4. Console log output targets per requirements
    console.log("Inserted:", data);
    console.log("Error:", error);

    if (error) {
      console.error(`Seed processed with errors: ${error.message}`);
    } else {
      console.info(`Successfully seeded ${data?.length || payload.length} items to Supabase.`);
    }

  } catch (err) {
    console.error("Catch Error during database seeding operations:", err);
  }
};

export const uploadPackageImages = async (files) => {
  if (!isBackendEnabled) {
    return { data: null, error: { message: "Spring Boot API is not configured." } };
  }
  try {
    const formData = new FormData();
    Array.from(files).slice(0, 5).forEach((file) => formData.append("files", file));
    const data = await apiRequest("/uploads/packages", { method: "POST", body: formData });
    return { data: { urls: (data?.urls || []).map(toBackendAssetUrl) }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
