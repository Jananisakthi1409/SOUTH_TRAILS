import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import { getBookingsByCustomer } from "../../services/bookingService";
import { getWishlist } from "../../services/wishlistService";
import "./AdvancedUI.css";

const PersonalizedDashboard = () => {
  const { user, isAuthenticated } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    getBookingsByCustomer(user.id).then((items) => setBookings(items || []));
    getWishlist(user.id).then((result) => setWishlist(result.data || []));
  }, [isAuthenticated, user?.id]);

  if (!isAuthenticated) {
    return (
      <section className="personal-dashboard">
        <div className="advanced-panel personal-card">
          <h3>Plan with smarter tools</h3>
          <p>Use the trip builder, map explorer, mood quiz, and package comparison to find the right South India route.</p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <Link className="button button-primary" to="/trip-builder">Start Trip Builder</Link>
            <Link className="button button-secondary" to="/map">Open Map</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="personal-dashboard">
      <div className="personal-dashboard-grid">
        <div className="advanced-panel personal-card">
          <h3>Welcome back, {user.fullName?.split(" ")[0] || "Traveler"}</h3>
          <p>Continue planning from your saved packages and active booking history.</p>
        </div>
        <div className="advanced-panel personal-card">
          <h4>Saved</h4>
          <p>{wishlist.length} packages</p>
        </div>
        <div className="advanced-panel personal-card">
          <h4>Bookings</h4>
          <p>{bookings.length} trips</p>
        </div>
        <div className="advanced-panel personal-card">
          <h4>Next Step</h4>
          <Link to={wishlist[0]?.id ? `/package/${wishlist[0].id}` : "/packages"}>Continue planning</Link>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedDashboard;
