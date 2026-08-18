import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPackages } from "../../services/packageService";
import "./AdvancedUI.css";

const staticCommands = [
  { title: "AI Trip Builder", meta: "Plan a trip", path: "/trip-builder" },
  { title: "AI Travel Oracle", meta: "Ask for package-aware guidance", path: "/oracle" },
  { title: "Smart Recommendations", meta: "Personalized package picks", path: "/recommendations" },
  { title: "Notifications", meta: "Booking and travel alerts", path: "/notifications" },
  { title: "Local Guides", meta: "Verified guide marketplace", path: "/guides" },
  { title: "Homestays", meta: "Community-driven stays", path: "/homestays" },
  { title: "Local Events", meta: "Festivals and seasonal attractions", path: "/events" },
  { title: "Handicraft Marketplace", meta: "Artisans and cultural products", path: "/marketplace" },
  { title: "Eco Tourism", meta: "Sustainability and impact scores", path: "/eco-tourism" },
  { title: "AR VR Previews", meta: "360 destination preview readiness", path: "/ar-vr" },
  { title: "Startup Features", meta: "Loyalty, referrals, communities", path: "/startup-features" },
  { title: "Map Explorer", meta: "Explore states", path: "/map" },
  { title: "Mood Quiz", meta: "Find your travel style", path: "/mood-quiz" },
  { title: "Website Flow", meta: "Customer and admin journey", path: "/flow" },
  { title: "Packages", meta: "Browse all packages", path: "/packages" },
  { title: "Profile", meta: "Bookings and wishlist", path: "/profile" },
  { title: "Admin Kanban", meta: "Booking board", path: "/admin/kanban" },
];

const CommandPalette = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    getPackages().then((items) => setPackages(items || []));
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const packageCommands = packages.slice(0, 80).map((pkg) => ({
      title: pkg.title,
      meta: `${pkg.state || "South India"} · ${pkg.destination}`,
      path: `/package/${pkg.id}`,
    }));
    const all = [...staticCommands, ...packageCommands];
    return q ? all.filter((item) => `${item.title} ${item.meta}`.toLowerCase().includes(q)).slice(0, 12) : all.slice(0, 12);
  }, [packages, query]);

  const go = (path) => {
    setOpen(false);
    setQuery("");
    navigate(path);
  };

  if (!open) return null;

  return (
    <div className="command-palette-backdrop" role="dialog" aria-modal="true">
      <div className="command-palette advanced-panel">
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search packages, pages, admin tools..."
          aria-label="Command search"
        />
        <div className="command-list">
          {results.map((item) => (
            <button key={`${item.title}-${item.path}`} type="button" className="command-item" onClick={() => go(item.path)}>
              <strong>{item.title}</strong>
              <span>{item.meta}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
