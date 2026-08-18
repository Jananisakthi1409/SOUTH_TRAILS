import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import { useToast } from "../../components/ui/Toast";
import {
  createAdminEcosystemItem,
  deleteAdminEcosystemItem,
  getAdminEcosystemItems,
  updateAdminEcosystemItem,
} from "../../services/adminEcosystemService";

const modules = [
  {
    key: "guides",
    label: "Guides",
    titleField: "name",
    subtitleField: "baseLocation",
    fields: [
      ["name", "Guide Name"],
      ["state", "State"],
      ["baseLocation", "Base Location"],
      ["speciality", "Speciality"],
      ["languages", "Languages"],
      ["rating", "Rating", "number"],
      ["pricePerDay", "Price Per Day", "number"],
      ["packageId", "Linked Package ID"],
      ["verified", "Verified", "checkbox"],
    ],
  },
  {
    key: "homestays",
    label: "Homestays",
    titleField: "name",
    subtitleField: "location",
    fields: [
      ["name", "Homestay Name"],
      ["state", "State"],
      ["location", "Location"],
      ["host", "Host"],
      ["capacity", "Capacity", "number"],
      ["pricePerNight", "Price Per Night", "number"],
      ["communityScore", "Community Score", "number"],
      ["amenities", "Amenities"],
      ["packageId", "Linked Package ID"],
    ],
  },
  {
    key: "events",
    label: "Events",
    titleField: "title",
    subtitleField: "location",
    fields: [
      ["title", "Event Title"],
      ["state", "State"],
      ["location", "Location"],
      ["season", "Season"],
      ["category", "Category"],
      ["impact", "Impact", "textarea"],
      ["packageId", "Linked Package ID"],
    ],
  },
  {
    key: "handicrafts",
    label: "Handicrafts",
    titleField: "product",
    subtitleField: "artisan",
    fields: [
      ["product", "Product"],
      ["artisan", "Artisan"],
      ["state", "State"],
      ["origin", "Origin"],
      ["price", "Price", "number"],
      ["experience", "Experience", "textarea"],
      ["packageId", "Linked Package ID"],
    ],
  },
  {
    key: "eco-scores",
    label: "Eco Scores",
    titleField: "packageId",
    subtitleField: "greenIndicators",
    fields: [
      ["packageId", "Package ID"],
      ["sustainabilityScore", "Sustainability Score", "number"],
      ["communityImpactScore", "Community Impact Score", "number"],
      ["greenIndicators", "Green Indicators"],
    ],
  },
  {
    key: "notifications",
    label: "Notifications",
    titleField: "title",
    subtitleField: "type",
    fields: [
      ["customerId", "Customer ID"],
      ["type", "Type"],
      ["title", "Title"],
      ["message", "Message", "textarea"],
      ["readFlag", "Read", "checkbox"],
    ],
  },
  {
    key: "itineraries",
    label: "Itineraries",
    titleField: "title",
    subtitleField: "state",
    fields: [
      ["customerId", "Customer ID"],
      ["title", "Title"],
      ["state", "State"],
      ["travelStyle", "Travel Style"],
      ["budget", "Budget", "number"],
      ["duration", "Duration", "number"],
      ["travelers", "Travelers", "number"],
      ["interests", "Interests"],
      ["planJson", "Plan JSON", "textarea"],
    ],
  },
];

const emptyFor = (config) =>
  config.fields.reduce((acc, [name, , type]) => {
    acc[name] = type === "checkbox" ? false : "";
    return acc;
  }, {});

const AdminEcosystem = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AdminContext);
  const { showToast } = useToast();
  const [activeKey, setActiveKey] = useState("guides");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(() => emptyFor(modules[0]));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const activeModule = useMemo(() => modules.find((module) => module.key === activeKey) || modules[0], [activeKey]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin/login");
  }, [isAuthenticated, navigate]);

  const loadModule = useCallback(async (moduleKey = activeKey) => {
    setLoading(true);
    const { data, error } = await getAdminEcosystemItems(moduleKey);
    setItems(data || []);
    setLoading(false);
    if (error) showToast(error.message || "Unable to load ecosystem module.", "error");
  }, [activeKey, showToast]);

  useEffect(() => {
    let active = true;
    getAdminEcosystemItems(activeModule.key).then(({ data, error }) => {
      if (!active) return;
      setItems(data || []);
      setLoading(false);
      if (error) showToast(error.message || "Unable to load ecosystem module.", "error");
    });
    return () => {
      active = false;
    };
  }, [activeModule.key, showToast]);

  if (!isAuthenticated) return null;

  const changeModule = (module) => {
    setActiveKey(module.key);
    setForm(emptyFor(module));
    setEditingId(null);
    setLoading(true);
  };

  const updateField = (name, value, type) => {
    setForm((current) => ({
      ...current,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };

  const editItem = (item) => {
    setEditingId(item.id);
    setForm({ ...emptyFor(activeModule), ...item });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyFor(activeModule));
  };

  const saveItem = async (event) => {
    event.preventDefault();
    const result = editingId
      ? await updateAdminEcosystemItem(activeModule.key, editingId, form)
      : await createAdminEcosystemItem(activeModule.key, form);

    if (result.error) {
      showToast(result.error.message || "Unable to save ecosystem item.", "error");
      return;
    }

    showToast(editingId ? "Ecosystem item updated." : "Ecosystem item created.", "success");
    resetForm();
    await loadModule();
  };

  const removeItem = async (item) => {
    const { error } = await deleteAdminEcosystemItem(activeModule.key, item.id);
    if (error) {
      showToast(error.message || "Unable to delete ecosystem item.", "error");
      return;
    }
    showToast("Ecosystem item deleted.", "success");
    setItems((current) => current.filter((entry) => entry.id !== item.id));
  };

  return (
    <div style={pageStyle}>
      <aside style={sidebarStyle}>
        <div>
          <div style={brandStyle}>
            <h2 style={brandTitleStyle}>SOUTH TRAILS</h2>
            <p style={brandSubtitleStyle}>Admin Ecosystem</p>
          </div>
          <nav style={navStyle}>
            {[
              ["/admin/dashboard", "Dashboard"],
              ["/admin/packages", "Packages"],
              ["/admin/customers", "Customers"],
              ["/admin/bookings", "Bookings"],
              ["/admin/users", "Users"],
              ["/admin/ecosystem", "Ecosystem"],
              ["/admin/reviews", "Reviews"],
              ["/admin/analytics", "Analytics"],
              ["/admin/kanban", "Kanban Board"],
            ].map(([to, label]) => (
              <Link key={to} to={to} style={to === "/admin/ecosystem" ? activeNavLink : navLink}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <button type="button" style={logoutStyle} onClick={() => { logout(); navigate("/admin/login"); }}>
          Logout
        </button>
      </aside>

      <main style={mainStyle}>
        <header style={headerStyle}>
          <div>
            <h1 style={headingStyle}>Ecosystem Management</h1>
            <p style={copyStyle}>Manage every SIH marketplace and AI ecosystem data module from admin.</p>
          </div>
          <Link to="/guides" style={outlineButtonStyle}>View Public Ecosystem</Link>
        </header>

        <section style={tabGridStyle}>
          {modules.map((module) => (
            <button
              type="button"
              key={module.key}
              onClick={() => changeModule(module)}
              style={module.key === activeKey ? activeTabStyle : tabStyle}
            >
              {module.label}
            </button>
          ))}
        </section>

        <section style={panelStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={panelTitleStyle}>{editingId ? `Edit ${activeModule.label}` : `Create ${activeModule.label}`}</h2>
              <p style={copyStyle}>Records saved here power the public SIH ecosystem pages.</p>
            </div>
            {editingId && <button type="button" onClick={resetForm} style={outlineButtonStyle}>Cancel Edit</button>}
          </div>

          <form onSubmit={saveItem} style={formGridStyle}>
            {activeModule.fields.map(([name, label, type = "text"]) => (
              <label key={name} style={fieldStyle}>
                <span style={labelStyle}>{label}</span>
                {type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={form[name] || ""}
                    onChange={(event) => updateField(name, event.target.value, type)}
                    style={inputStyle}
                  />
                ) : type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={Boolean(form[name])}
                    onChange={(event) => updateField(name, event.target.checked, type)}
                    style={{ width: 18, height: 18, accentColor: "#0b6b43" }}
                  />
                ) : (
                  <input
                    type={type}
                    value={form[name] ?? ""}
                    onChange={(event) => updateField(name, event.target.value, type)}
                    style={inputStyle}
                  />
                )}
              </label>
            ))}
            <button type="submit" style={primaryButtonStyle}>
              {editingId ? "Update Record" : "Create Record"}
            </button>
          </form>
        </section>

        <section style={panelStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <h2 style={panelTitleStyle}>{activeModule.label} Records</h2>
              <p style={copyStyle}>{items.length} admin-managed records</p>
            </div>
            <button type="button" onClick={() => loadModule()} style={outlineButtonStyle}>Refresh</button>
          </div>

          {loading ? (
            <p style={copyStyle}>Loading records...</p>
          ) : items.length === 0 ? (
            <p style={copyStyle}>No records yet. Create one above to make this module admin-managed.</p>
          ) : (
            <div style={cardGridStyle}>
              {items.map((item) => (
                <article key={item.id} style={recordCardStyle}>
                  <p style={eyebrowStyle}>{item.state || item.type || activeModule.label}</p>
                  <h3 style={cardTitleStyle}>{item[activeModule.titleField] || item.id}</h3>
                  <p style={copyStyle}>{item[activeModule.subtitleField] || item.packageId || item.customerId || "South Trails ecosystem record"}</p>
                  <div style={metaStyle}>
                    <span>ID: {item.id}</span>
                    {item.packageId && <span>Package: {item.packageId}</span>}
                    {item.createdAt && <span>{new Date(item.createdAt).toLocaleDateString("en-IN")}</span>}
                  </div>
                  <div style={actionRowStyle}>
                    <button type="button" onClick={() => editItem(item)} style={outlineButtonStyle}>Edit</button>
                    <button type="button" onClick={() => removeItem(item)} style={dangerButtonStyle}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const pageStyle = { display: "flex", minHeight: "100vh", background: "#ffffff", color: "#022c22" };
const sidebarStyle = { position: "fixed", inset: "0 auto 0 0", width: 260, padding: "32px 24px", background: "#ffffff", borderRight: "1px solid #d8efe5", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "12px 0 40px rgba(6,78,59,0.04)", zIndex: 100 };
const brandStyle = { paddingBottom: 28, borderBottom: "1px solid #f0fdf4" };
const brandTitleStyle = { margin: 0, color: "#0b6b43", fontSize: 20, fontWeight: 900 };
const brandSubtitleStyle = { margin: "4px 0 0", color: "#35705c", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" };
const navStyle = { display: "grid", gap: 8, marginTop: 28 };
const navLink = { padding: "11px 14px", borderRadius: 8, color: "#35705c", fontWeight: 700, textDecoration: "none", fontSize: 14 };
const activeNavLink = { ...navLink, background: "#f0fdf4", color: "#0b6b43" };
const logoutStyle = { padding: 12, borderRadius: 8, border: "1px solid #d8efe5", background: "#ffffff", color: "#0b6b43", fontWeight: 800 };
const mainStyle = { flex: 1, marginLeft: 260, padding: "40px 48px", boxSizing: "border-box" };
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 28, flexWrap: "wrap" };
const headingStyle = { margin: 0, fontSize: 30, fontWeight: 900, color: "#022c22" };
const copyStyle = { margin: "6px 0 0", color: "#35705c", lineHeight: 1.6 };
const tabGridStyle = { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 };
const tabStyle = { padding: "10px 14px", borderRadius: 999, border: "1px solid #d8efe5", background: "#ffffff", color: "#35705c", fontWeight: 800 };
const activeTabStyle = { ...tabStyle, background: "#0b6b43", color: "#ffffff", borderColor: "#0b6b43" };
const panelStyle = { background: "#ffffff", border: "1px solid #d8efe5", borderRadius: 12, padding: 24, boxShadow: "0 18px 54px rgba(6,78,59,0.08)", marginBottom: 26 };
const sectionHeaderStyle = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 20, flexWrap: "wrap" };
const panelTitleStyle = { margin: 0, color: "#022c22", fontSize: 20, fontWeight: 900 };
const formGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, alignItems: "end" };
const fieldStyle = { display: "grid", gap: 7 };
const labelStyle = { color: "#164e36", fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em" };
const inputStyle = { width: "100%", minHeight: 42, border: "1px solid #afd6c3", borderRadius: 8, padding: "10px 12px", color: "#022c22", background: "#ffffff", font: "inherit" };
const primaryButtonStyle = { minHeight: 44, border: "none", borderRadius: 8, background: "#0b6b43", color: "#ffffff", fontWeight: 900, padding: "0 18px" };
const outlineButtonStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 38, padding: "8px 13px", borderRadius: 8, border: "1px solid #d8efe5", background: "#ffffff", color: "#0b6b43", fontWeight: 900, textDecoration: "none" };
const dangerButtonStyle = { ...outlineButtonStyle, color: "#064e3b" };
const cardGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 };
const recordCardStyle = { border: "1px solid #d8efe5", borderRadius: 12, padding: 18, background: "#ffffff", boxShadow: "0 10px 30px rgba(6,78,59,0.06)" };
const eyebrowStyle = { margin: "0 0 8px", color: "#0b6b43", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" };
const cardTitleStyle = { margin: 0, color: "#022c22", fontSize: 17, fontWeight: 900 };
const metaStyle = { display: "grid", gap: 4, marginTop: 12, color: "#35705c", fontSize: 12, fontWeight: 700 };
const actionRowStyle = { display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" };

export default AdminEcosystem;
