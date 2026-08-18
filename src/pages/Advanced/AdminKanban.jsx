import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../Booking/AdminContext";
import { getBookings, updateBookingStatus } from "../../services/bookingService";
import "../../components/advanced/AdvancedUI.css";

const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

const getPackageName = (booking) =>
  booking.packageName || booking.package_snapshot?.title || booking.packageSnapshot?.title || booking.package?.title || "South India Package";

const AdminKanban = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AdminContext);
  const [bookings, setBookings] = useState([]);
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    getBookings().then((items) => setBookings(items || []));
  }, []);

  const grouped = useMemo(() => {
    return statuses.reduce((map, status) => {
      map[status] = bookings.filter((booking) => (booking.status || "Pending") === status);
      return map;
    }, {});
  }, [bookings]);

  const moveBooking = async (status) => {
    if (!draggingId) return;
    const previous = bookings;
    setBookings((current) => current.map((booking) => (booking.id === draggingId ? { ...booking, status } : booking)));
    const result = await updateBookingStatus(draggingId, status);
    if (result.error) setBookings(previous);
    setDraggingId(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#ffffff" }}>
      <aside style={{ width: 260, background: "#ffffff", borderRight: "1px solid #d8efe5", padding: "32px 24px" }}>
        <h2 style={{ color: "#0f766e", marginTop: 0 }}>SOUTH TRAILS</h2>
        <nav style={{ display: "grid", gap: 8 }}>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/packages">Packages</Link>
          <Link to="/admin/customers">Customers</Link>
          <Link to="/admin/bookings">Bookings</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/ecosystem">Ecosystem</Link>
          <Link to="/admin/reviews">Reviews</Link>
          <Link to="/admin/analytics">Analytics</Link>
          <Link to="/admin/kanban">Kanban Board</Link>
        </nav>
        <button
          className="button button-secondary"
          style={{ width: "100%", marginTop: 32 }}
          type="button"
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
        >
          Logout
        </button>
      </aside>

      <main className="advanced-page" style={{ flex: 1 }}>
        <div className="advanced-page-inner">
          <section className="advanced-hero">
            <div className="advanced-hero-copy advanced-panel">
              <p className="eyebrow">Booking Operations</p>
              <h1>Admin Kanban Board</h1>
              <p>Drag bookings between status columns to keep the travel operations pipeline updated.</p>
            </div>
            <div className="advanced-panel" style={{ padding: "1.5rem" }}>
              <p className="eyebrow">Live Bookings</p>
              <h2 style={{ marginTop: 0 }}>{bookings.length}</h2>
              <Link to="/admin/bookings">Open booking table</Link>
            </div>
          </section>

          <section className="kanban-board">
            {statuses.map((status) => (
              <div
                key={status}
                className="kanban-column advanced-panel"
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => moveBooking(status)}
              >
                <h3 style={{ marginTop: 0 }}>{status}</h3>
                {(grouped[status] || []).map((booking) => (
                  <article
                    key={booking.id}
                    className="kanban-card"
                    draggable
                    onDragStart={() => setDraggingId(booking.id)}
                    onDragEnd={() => setDraggingId(null)}
                  >
                    <strong>{getPackageName(booking)}</strong>
                    <p style={{ margin: "0.35rem 0", color: "#35705c" }}>
                      {booking.travelDate || booking.travel_date || "Flexible date"}
                    </p>
                    <p style={{ margin: 0, color: "#0f766e", fontWeight: 800 }}>
                      Rs. {Number(booking.totalAmount || booking.total_amount || 0).toLocaleString("en-IN")}
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminKanban;
