import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const adminLinks = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Packages", to: "/admin/packages" },
  { label: "Customers", to: "/admin/customers" },
  { label: "Bookings", to: "/admin/bookings" },
  { label: "Users", to: "/admin/users" },
  { label: "Ecosystem", to: "/admin/ecosystem" },
  { label: "Reviews", to: "/admin/reviews" },
  { label: "Analytics", to: "/admin/analytics" },
  { label: "Kanban Board", to: "/admin/kanban" },
];

const AdminLayout = ({ title, subtitle, actions, onLogout, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout?.();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-brand">
            <h2>South Trails</h2>
            <p>Premium Travel Admin</p>
          </div>
          <nav className="admin-nav">
            {adminLinks.map((link) => (
              <Link
                key={link.to}
                className={location.pathname === link.to ? "active" : ""}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="admin-actions">{actions}</div>}
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
