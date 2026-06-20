import "./AdvancedUI.css";

const states = ["All", "Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"];

const SmartFilterDrawer = ({ open, filters, onChange, onClose, onReset }) => {
  if (!open) return null;

  return (
    <div className="smart-drawer-backdrop">
      <aside className="smart-drawer" aria-label="Smart filters">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Smart Filters</h2>
          <button className="smart-filter-toggle" type="button" onClick={onClose}>Close</button>
        </div>

        <div className="drawer-group">
          <label>Search</label>
          <input value={filters.searchTerm} onChange={(event) => onChange("searchTerm", event.target.value)} placeholder="Package, place, mood..." />
        </div>

        <div className="drawer-group">
          <label>State</label>
          <select value={filters.selectedState} onChange={(event) => onChange("selectedState", event.target.value)}>
            {states.map((state) => <option key={state}>{state}</option>)}
          </select>
        </div>

        <div className="drawer-group">
          <label>Budget</label>
          <select value={filters.selectedBudget} onChange={(event) => onChange("selectedBudget", event.target.value)}>
            {["All", "Under 8000", "8000-12000", "Above 12000"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        <div className="drawer-group">
          <label>Duration</label>
          <select value={filters.selectedDuration} onChange={(event) => onChange("selectedDuration", event.target.value)}>
            {["All", "1-2 Days", "3-4 Days", "5+ Days"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        <div className="drawer-group">
          <p>Minimum Rating: {Number(filters.minRating).toFixed(1)}</p>
          <input type="range" min="0" max="5" step="0.1" value={filters.minRating} onChange={(event) => onChange("minRating", Number(event.target.value))} />
        </div>

        <button className="button button-primary" type="button" onClick={onClose} style={{ width: "100%", marginBottom: "0.75rem" }}>
          Apply Filters
        </button>
        <button className="button button-secondary" type="button" onClick={onReset} style={{ width: "100%" }}>
          Reset
        </button>
      </aside>
    </div>
  );
};

export default SmartFilterDrawer;
