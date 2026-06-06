import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import "./AdminAuth.css";

const AdminUsers = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AdminContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/admin/login");
    }
  }, [shouldRedirect, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const users = [
    { id: "U-001", name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", joined: "2026-01-15", bookings: 3, status: "Active" },
    { id: "U-002", name: "Jane Smith", email: "jane@example.com", phone: "+91 87654 32109", joined: "2026-02-20", bookings: 5, status: "Active" },
    { id: "U-003", name: "Mike Johnson", email: "mike@example.com", phone: "+91 76543 21098", joined: "2026-03-10", bookings: 1, status: "Active" },
    { id: "U-004", name: "Sarah Williams", email: "sarah@example.com", phone: "+91 65432 10987", joined: "2026-04-05", bookings: 2, status: "Blocked" },
    { id: "U-005", name: "Tom Brown", email: "tom@example.com", phone: "+91 54321 09876", joined: "2026-05-12", bookings: 4, status: "Active" },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🏛️ South Trails</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="nav-item">📊 Dashboard</Link>
          <Link to="/admin/bookings" className="nav-item">📅 Bookings</Link>
          <Link to="/admin/packages" className="nav-item">📦 Packages</Link>
          <Link to="/admin/users" className="nav-item active">👥 Users</Link>
          <Link to="/admin/analytics" className="nav-item">📈 Analytics</Link>
        </nav>

        <div className="admin-user-card">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <p className="user-name">Admin User</p>
            <p className="user-email">admin@southtrails.com</p>
          </div>
          <button className="logout-btn" onClick={() => { logout(); navigate("/admin/login"); }}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <div className="admin-header">
          <h1>👥 User Management</h1>
          <p>View and manage customer accounts</p>
        </div>

        <div className="section">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Bookings</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="code">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.joined}</td>
                  <td><strong>{user.bookings}</strong></td>
                  <td><span className={`status-badge status-${user.status.toLowerCase()}`}>{user.status}</span></td>
                  <td className="action-cell">
                    <button className="btn-info">👁️ View</button>
                    <button className="btn-warning">📝 Edit</button>
                    {user.status === "Active" ? (
                      <button className="btn-danger">🚫 Block</button>
                    ) : (
                      <button className="btn-success">✓ Unblock</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminUsers;
