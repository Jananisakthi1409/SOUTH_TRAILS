#!/usr/bin/env node

import tamilNaduPackages from "../src/pages/Packages/tamilNaduPackageData.js";
import keraPackages from "../src/pages/Packages/keraPackageData.js";
import karnatakaPackages from "../src/pages/Packages/karnatakaPackageData.js";
import andhraPradeshPackages from "../src/pages/Packages/andhraPradeshPackageData.js";

const API_BASE = process.env.VITE_API_BASE_URL || process.env.API_BASE_URL || "http://127.0.0.1:8080/api";

const collections = [
  ["Tamil Nadu", tamilNaduPackages],
  ["Kerala", keraPackages],
  ["Karnataka", karnatakaPackages],
  ["Andhra Pradesh", andhraPradeshPackages],
];

const normalize = (pkg, state) => ({
  id: String(pkg.id),
  title: pkg.title,
  destination: pkg.destination,
  state,
  category: pkg.category,
  days: Number(pkg.days || 0),
  nights: Number(pkg.nights || 0),
  price: Number(pkg.price || 0),
  description: pkg.description || "Curated South India itinerary with premium stays and guided local experiences.",
  rating: Number(pkg.rating || 4.7),
  image_folder: pkg.imageFolder || pkg.image_folder || "",
  status: pkg.status || "Active",
  places: Array.isArray(pkg.places) ? pkg.places : [],
  included: Array.isArray(pkg.included) ? pkg.included : [],
  highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
});

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok && response.status !== 404) {
    const body = await response.text();
    throw new Error(`${options.method || "GET"} ${path} failed with ${response.status}: ${body}`);
  }

  if (response.status === 404 || response.status === 204) return null;
  return response.json();
};

const upsertPackage = async (pkg) => {
  const existing = await requestJson(`/packages/${encodeURIComponent(pkg.id)}`);
  const method = existing ? "PUT" : "POST";
  const path = existing ? `/packages/${encodeURIComponent(pkg.id)}` : "/packages";
  return requestJson(path, { method, body: JSON.stringify(pkg) });
};

const seedPackages = async () => {
  const health = await requestJson("/health");
  if (health?.status !== "UP") {
    throw new Error(`Backend health check failed at ${API_BASE}/health`);
  }

  const payload = collections.flatMap(([state, packages]) => packages.map((pkg) => normalize(pkg, state)));
  let createdOrUpdated = 0;

  for (const pkg of payload) {
    await upsertPackage(pkg);
    createdOrUpdated += 1;
  }

  console.log(`Seeded ${createdOrUpdated} Spring Boot packages at ${API_BASE}.`);
};

seedPackages().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
