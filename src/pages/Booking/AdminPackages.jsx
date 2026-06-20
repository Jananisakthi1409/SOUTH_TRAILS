
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import { useToast } from "../../components/ui/Toast";
import { getPackages, createPackage, updatePackage, deletePackage, uploadPackageImages } from "../../services/packageService";
import { validatePackageForm } from "../../utils/validation";

const AdminPackages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AdminContext);
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(() => location.pathname.endsWith("/new"));
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    destination: "",
    price: "",
    days: "",
    nights: "",
    category: "",
    description: "",
    state: "Kerala",
    images: []
  });

  const [packages, setPackages] = useState([]);
  const [filterState, setFilterState] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  
  // UI Hover States
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadPackages = async () => {
      setLoading(true);
      const state = filterState === "All" ? undefined : filterState;
      const data = await getPackages({ state, search: searchTerm });
      setPackages(data || []);
      setLoading(false);
    };

    loadPackages();
  }, [filterState, searchTerm, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoading(true);
    try {
      const { data, error } = await uploadPackageImages(files);
      if (error) throw error;
      setFormData({ ...formData, images: data?.urls || [] });
      showToast("Images uploaded successfully.", "success");
    } catch (err) {
      console.error("Failed to read files", err);
      showToast(err?.message || "Image upload failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      id: "",
      title: "",
      destination: "",
      state: "Kerala",
      price: "",
      days: "",
      nights: "",
      category: "",
      description: "",
      images: [],
    });
    setEditingId(null);
  };

  const refreshPackages = async () => {
    const state = filterState === "All" ? undefined : filterState;
    const data = await getPackages({ state, search: searchTerm });
    setPackages(data || []);
  };

  const handleAddPackage = async () => {
    setErrorMessage("");
    const validationError = validatePackageForm(formData);
    if (validationError) {
      setErrorMessage(validationError);
      showToast(validationError, "error");
      return;
    }

    const payload = {
      title: formData.title,
      destination: formData.destination,
      state: formData.state,
      price: formData.price,
      days: formData.days,
      nights: formData.nights,
      category: formData.category,
      description: formData.description,
      image1: formData.images[0] || null,
      image2: formData.images[1] || null,
      image3: formData.images[2] || null,
      status: "Active",
    };

    setLoading(true);
    try {
      const result = editingId
        ? await updatePackage(editingId, payload)
        : await createPackage(payload);

      if (result?.error) {
        setErrorMessage(result.error.message || "Unable to save package");
      } else if (result?.data) {
        clearForm();
        setShowForm(false);
        showToast(editingId ? "Package updated successfully." : "Package created successfully.", "success");
        await refreshPackages();
      } else {
        setErrorMessage("Unable to save package. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Failed to save package");
      console.error("Package save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg) => {
    setFormData({
      id: pkg.id,
      title: pkg.title,
      destination: pkg.destination,
      state: pkg.state || "Kerala",
      price: pkg.price,
      days: pkg.days,
      nights: pkg.nights,
      category: pkg.category,
      description: pkg.description,
      images: [pkg.image1, pkg.image2, pkg.image3].filter(Boolean),
    });
    setEditingId(pkg.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = async () => {
    const id = pendingDeleteId;
    if (!id) return;
    setPendingDeleteId(null);
    const { error } = await deletePackage(id);
    if (error) {
      showToast(error.message || "Unable to delete package", "error");
      return;
    }
    setPackages(packages.filter(p => p.id !== id));
    showToast("Package deleted successfully.", "success");
  };

  const statesList = ["All", "Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"];

  return (
    <div style={{ display: "flex", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      
      {/* Fixed Sidebar */}
      <aside style={{ width: "260px", backgroundColor: "#ffffff", borderRight: "1px solid #e2e8f0", position: "fixed", top: 0, bottom: 0, left: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px 24px", zIndex: 100 }}>
        <div>
          <div style={{ paddingBottom: "32px", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f766e", margin: 0, letterSpacing: "-0.025em" }}>SOUTH TRAILS</h2>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0 0", fontWeight: "500", letterSpacing: "0.05em", textTransform: "uppercase" }}>Premium Travel Admin</p>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "32px" }}>
            <Link to="/admin/dashboard" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Dashboard</Link>
            <Link to="/admin/packages" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", backgroundColor: "#f0fdfa", color: "#0f766e", fontWeight: "600", fontSize: "14px" }}>Packages</Link>
            <Link to="/admin/customers" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Customers</Link>
            <Link to="/admin/bookings" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Bookings</Link>
            <Link to="/admin/reviews" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Reviews</Link>
            <Link to="/admin/analytics" style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderRadius: "8px", textDecoration: "none", color: "#64748b", fontWeight: "500", fontSize: "14px" }}>Analytics</Link>
          </nav>
        </div>

        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
          <button 
            onClick={() => { logout(); navigate("/admin/login"); }}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#ffffff", color: "#dc2626", fontWeight: "600", fontSize: "14px", cursor: "pointer", transition: "all 0.2s" }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: "260px", flex: 1, padding: "40px 48px", minHeight: "100vh", boxSizing: "border-box" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.025em" }}>Package Management</h1>
            <p style={{ fontSize: "15px", color: "#64748b", margin: "6px 0 0 0" }}>Create, edit, and manage your premium custom itineraries.</p>
          </div>
          
          <button 
            onClick={() => { setShowForm(!showForm); clearForm(); }}
            style={{ padding: "12px 24px", borderRadius: "8px", backgroundColor: showForm ? "#ffffff" : "#14b8a6", color: showForm ? "#475569" : "#ffffff", border: showForm ? "1px solid #cbd5e1" : "none", fontWeight: "600", fontSize: "14px", cursor: "pointer", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", transition: "all 0.2s" }}
          >
            {showForm ? "Cancel Operation" : "Create New Package"}
          </button>
        </div>

        {/* Error Announcement */}
        {errorMessage && (
          <div style={{ padding: "16px", backgroundColor: "#fef2f2", borderLeft: "4px solid #ef4444", borderRadius: "6px", color: "#991b1b", fontSize: "14px", fontWeight: "500", marginBottom: "24px" }}>
            {errorMessage}
          </div>
        )}

        {pendingDeleteId && (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "grid", placeItems: "center", backgroundColor: "rgba(15, 23, 42, 0.36)", padding: "1rem" }}>
            <div style={{ width: "min(420px, 100%)", backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 24px 80px rgba(15,23,42,0.24)" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#0f172a" }}>Delete package?</h3>
              <p style={{ margin: "0 0 20px 0", color: "#64748b", lineHeight: 1.5 }}>This removes the package from the Spring Boot catalog.</p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={() => setPendingDeleteId(null)} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#334155", fontWeight: 600 }}>
                  Cancel
                </button>
                <button type="button" onClick={confirmDelete} style={{ padding: "10px 16px", borderRadius: "8px", border: "none", background: "#dc2626", color: "#ffffff", fontWeight: 700 }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create / Edit Form Section */}
        {showForm && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "32px", marginBottom: "40px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", margin: "0 0 24px 0", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
              {editingId ? "Modify Existing Experience" : "Design New Experience Package"}
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "24px" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Package Title</label>
                <input type="text" placeholder="e.g., Luxury Backwaters Premium Cruise" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Destination Spotlight</label>
                <input type="text" placeholder="e.g., Alleppey, Kumarakom" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Price (₹)</label>
                <input type="number" placeholder="e.g., 45000" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Duration Days</label>
                <input type="number" placeholder="Days" value={formData.days} onChange={(e) => setFormData({...formData, days: e.target.value})} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Duration Nights</label>
                <input type="number" placeholder="Nights" value={formData.nights} onChange={(e) => setFormData({...formData, nights: e.target.value})} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Category Classification</label>
                <input type="text" placeholder="e.g., Honeymoon, Wildlife, Heritage" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Regional State Territory</label>
                <select value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} style={{ padding: "11px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none", backgroundColor: "#fff" }}>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Expedition Description & Narrative</label>
              <textarea placeholder="Outline the experiential route, premium stays, inclusions and highlights..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="4" style={{ padding: "12px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", outline: "none", fontFamily: "inherit", resize: "vertical" }}></textarea>
            </div>

            <div style={{ marginBottom: "32px", padding: "20px", border: "1px dashed #cbd5e1", borderRadius: "8px", backgroundColor: "#f8fafc" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>Media Gallery Assets (Max 3 Images)</label>
              <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ fontSize: "14px", color: "#475569" }} />
              
              {formData.images && formData.images.length > 0 && (
                <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
                  {formData.images.map((src, i) => (
                    <div key={i} style={{ position: "relative", width: "100px", height: "75px", borderRadius: "6px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                      <img src={src} alt={`Upload Preview ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={handleAddPackage} 
              disabled={loading}
              style={{ padding: "12px 32px", borderRadius: "8px", backgroundColor: "#0f766e", color: "#ffffff", border: "none", fontWeight: "600", fontSize: "14px", cursor: "pointer", boxShadow: "0 2px 4px rgba(15, 118, 110, 0.15)" }}
            >
              {loading ? "Processing Pipeline..." : editingId ? "Commit Strategy Updates" : "Deploy Live Package"}
            </button>
          </div>
        )}

        {/* Dynamic Controls Bar: Tab Switching & Real-Time Searching */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", marginBottom: "32px", flexWrap: "wrap", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px" }}>
          
          {/* Custom Clean Minimalist Tab Track Layout */}
          <div style={{ display: "flex", gap: "4px", backgroundColor: "#f1f5f9", padding: "4px", borderRadius: "8px" }}>
            {statesList.map((st) => (
              <button
                key={st}
                onClick={() => setFilterState(st)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: filterState === st ? "600" : "500",
                  backgroundColor: filterState === st ? "#ffffff" : "transparent",
                  color: filterState === st ? "#0f766e" : "#64748b",
                  cursor: "pointer",
                  boxShadow: filterState === st ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                {st === "All" ? "All Experiences" : st}
              </button>
            ))}
          </div>

          {/* Clean Modern Input Context */}
          <div style={{ position: "relative", minWidth: "280px" }}>
            <input 
              type="text"
              placeholder="Search catalog by title or keyword..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ width: "100%", padding: "10px 16px", paddingLeft: "16px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#0f172a", backgroundColor: "#ffffff", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>

        {/* Production Level Grid Layout for Experiences Catalog */}
        {loading && packages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#64748b", fontSize: "15px" }}>Synchronizing catalogs secure layer...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "32px" }}>
            {packages
              .filter(p => (filterState === 'All' ? true : p.state === filterState))
              .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.destination.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((pkg) => {
                const displayImg = pkg.image1 || pkg.image2 || pkg.image3;
                return (
                  <div
                    key={pkg.id}
                    onMouseEnter={() => setHoveredCard(pkg.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: hoveredCard === pkg.id ? "0 12px 20px -3px rgba(15, 118, 110, 0.08)" : "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
                      transform: hoveredCard === pkg.id ? "translateY(-4px)" : "none",
                      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    <div>
                      {/* Premium Card Header / Visual Area */}
                      <div style={{ width: "100%", height: "190px", backgroundColor: "#f1f5f9", position: "relative" }}>
                        {displayImg ? (
                          <img src={displayImg} alt={pkg.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "14px", fontWeight: "500", backgroundColor: "#e2e8f0" }}>No Asset Media Uploaded</div>
                        )}
                        <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", fontWeight: "700", color: "#0f766e", letterSpacing: "0.02em", textTransform: "uppercase", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                          {pkg.state || "South India"}
                        </div>
                        <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#dcfce7", padding: "4px 10px", borderRadius: "9999px", fontSize: "11px", fontWeight: "700", color: "#15803d" }}>
                          {pkg.status || "Active"}
                        </div>
                      </div>

                      {/* Package Meta Info Block */}
                      <div style={{ padding: "20px 24px" }}>
                        <p style={{ margin: "0 0 6px 0", fontSize: "12px", fontWeight: "600", color: "#14b8a6", textTransform: "uppercase", letterSpacing: "0.05em" }}>{pkg.category || "General Experience"}</p>
                        <h4 style={{ margin: 0, fontSize: "17px", fontWeight: "700", color: "#0f172a", lineHeight: "1.4", height: "48px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{pkg.title}</h4>
                        <p style={{ margin: "8px 0 16px 0", fontSize: "13px", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>📍 {pkg.destination}</p>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0 0 0", borderTop: "1px solid #f1f5f9" }}>
                          <div>
                            <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Duration Track</span>
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>{pkg.days} Days / {pkg.nights || Number(pkg.days) - 1} Nights</span>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>Tariff Matrix</span>
                            <span style={{ fontSize: "16px", fontWeight: "700", color: "#0f766e" }}>₹{Number(pkg.price).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operational Actions Context Bar */}
                    <div style={{ display: "flex", borderTop: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                      <button 
                        onClick={() => handleEdit(pkg)}
                        onMouseEnter={() => setHoveredBtn(`ed-${pkg.id}`)}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{ flex: 1, padding: "14px", border: "none", backgroundColor: hoveredBtn === `ed-${pkg.id}` ? "#f0fdfa" : "transparent", color: "#0f766e", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", borderRight: "1px solid #e2e8f0" }}
                      >
                        Modify Config
                      </button>
                      <button 
                        onClick={() => handleDelete(pkg.id)}
                        onMouseEnter={() => setHoveredBtn(`del-${pkg.id}`)}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{ flex: 1, padding: "14px", border: "none", backgroundColor: hoveredBtn === `del-${pkg.id}` ? "#fef2f2" : "transparent", color: "#dc2626", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s" }}
                      >
                        Purge Catalog
                      </button>
                    </div>

                  </div>
                );
              })}
          </div>
        )}

        {/* Fallback Display State */}
        {!loading && packages.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px dashed #cbd5e1", marginTop: "24px" }}>
            <p style={{ margin: 0, fontSize: "15px", color: "#64748b", fontWeight: "500" }}>No product configurations found matching current filtering settings.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPackages;
