import { supabase } from "./supabase";
import tamilNaduPackages from "../pages/Packages/tamilNaduPackageData";
import keraPackages from "../pages/Packages/keraPackageData";
import karnatakaPackages from "../pages/Packages/karnatakaPackageData";
import andhraPradeshPackages from "../pages/Packages/andhraPradeshPackageData";
import packagesData from "../pages/Packages/packages";

const fallbackPackages = {
  "Tamil Nadu": tamilNaduPackages.map((pkg) => ({ ...pkg, state: "Tamil Nadu" })),
  Kerala: keraPackages.map((pkg) => ({ ...pkg, state: "Kerala" })),
  Karnataka: karnatakaPackages.map((pkg) => ({ ...pkg, state: "Karnataka" })),
  "Andhra Pradesh": andhraPradeshPackages.map((pkg) => ({ ...pkg, state: "Andhra Pradesh" })),
};

const normalizePackage = (pkg) => ({
  ...pkg,
  id: pkg.id || String(pkg.id),
  price: typeof pkg.price === "string" ? Number(pkg.price.replace(/[^0-9.]/g, "")) : pkg.price,
  days: Number(pkg.days || 0),
  nights: Number(pkg.nights || 0),
  rating: pkg.rating || null,
  imageFolder: pkg.imageFolder || "",
  places: Array.isArray(pkg.places) ? pkg.places : pkg.places ? JSON.parse(pkg.places) : [],
  included: Array.isArray(pkg.included) ? pkg.included : pkg.included ? JSON.parse(pkg.included) : [],
  highlights: Array.isArray(pkg.highlights) ? pkg.highlights : pkg.highlights ? JSON.parse(pkg.highlights) : [],
});

export const getPackages = async ({ state, category, search } = {}) => {
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
    imageFolder: packageData.imageFolder || "",
    places: Array.isArray(packageData.places) ? packageData.places : [],
    included: Array.isArray(packageData.included) ? packageData.included : [],
    highlights: Array.isArray(packageData.highlights) ? packageData.highlights : [],
  };
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
  const { data, error } = await supabase
    .from("packages")
    .update(payload)
    .eq("id", id)
    .select();

  return { data, error };
};

export const deletePackage = async (id) => {
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
      alert(`Seed processed with errors: ${error.message}`);
    } else {
      alert(`Success! Successfully seeded ${data?.length || payload.length} items to Supabase.`);
    }

  } catch (err) {
    console.error("Catch Error during database seeding operations:", err);
    alert(`Exception captured during seeding runtime: ${err.message}`);
  }
};