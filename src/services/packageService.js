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
  price: typeof pkg.price === "string" ? Number(pkg.price.replace(/[^0-9.]/g, "")) : pkg.price,
  days: Number(pkg.days || 0),
  nights: Number(pkg.nights || 0),
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
    price: Number(packageData.price),
    days: Number(packageData.days),
    nights: Number(packageData.nights),
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

export const updatePackage = async (id, packageData) => {
  const payload = {
    ...packageData,
    price: Number(packageData.price),
    days: Number(packageData.days),
    nights: Number(packageData.nights),
  };
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }

  try {
    return await supabase.from("packages").update(payload).eq("id", id);
  } catch (error) {
    return { data: null, error: { message: error?.message || "Supabase request failed" } };
  }
};

export const deletePackage = async (id) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }

  try {
    return await supabase.from("packages").delete().eq("id", id);
  } catch (error) {
    return { data: null, error: { message: error?.message || "Supabase request failed" } };
  }
};
