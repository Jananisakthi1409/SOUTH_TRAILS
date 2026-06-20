import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingTimeline from "../components/advanced/BookingTimeline";
import { useToast } from "../components/ui/Toast";
import { useAuthContext } from "../features/auth/AuthContext";
import { getBookingsByCustomer } from "../services/bookingService";
import { getReviews, createReview } from "../services/reviewService";
import { getWishlist, removeWishlistPackage } from "../services/wishlistService";

const createReviewId = () => `RV-${Date.now()}`;

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { user, isAuthenticated, logout, updateProfile } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
  //const [reviews, setReviews] = useState([]);
const [reviewText, setReviewText] = useState({});
const [reviewRating, setReviewRating] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadProfileData = async () => {
      if (user) {
        setForm({ fullName: user.fullName || "", email: user.email || "", phone: user.phone || "" });
      }

      if (user?.id) {
        try {
          const bookingsData = await getBookingsByCustomer(user.id);
          setBookings(bookingsData || []);

          const reviewsData = await getReviews({ customerId: user.id });
          setReviews(reviewsData || []);

          const wishlistData = await getWishlist(user.id);
          setWishlist(wishlistData.data || []);
          return;
        } catch (error) {
          console.error("Error loading profile data:", error);
        }
      }

      const storedBookings = window.localStorage.getItem("southTrailsBookings");
      if (storedBookings) {
        try {
          setBookings(JSON.parse(storedBookings));
        } catch {
          setBookings([]);
        }
      }

      const storedReviews = window.localStorage.getItem("southTrailsReviews");
      if (storedReviews) {
        try {
          setReviews(JSON.parse(storedReviews));
        } catch {
          setReviews([]);
        }
      }

      const storedWishlist = window.localStorage.getItem("southTrailsWishlist");
      if (storedWishlist) {
        try {
          setWishlist(JSON.parse(storedWishlist));
        } catch {
          setWishlist([]);
        }
      }
    };

    loadProfileData();
  }, [isAuthenticated, navigate, user]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleEdit = () => {
    setEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    if (user) {
      setForm({ fullName: user.fullName || "", email: user.email || "", phone: user.phone || "" });
    }
    setEditing(false);
    setMessage("");
  };

  const handleSave = async () => {
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setMessage("Please fill in all profile fields.");
      return;
    }
    const saved = await updateProfile(form);
    if (saved) {
      setEditing(false);
      setMessage("Profile updated successfully.");
    } else {
      setMessage("Unable to update profile. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleDeleteReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const profileBookings = bookings.length ? bookings : [];

  const handleRemoveWishlist = async (packageId) => {
    const result = await removeWishlistPackage({ customerId: user?.id, packageId });
    if (result.error) {
      showToast(result.error.message || "Unable to remove saved package.", "error");
      return;
    }
    setWishlist((current) => current.filter((item) => item.id !== packageId));
    showToast("Removed from wishlist.", "success");
  };

  useEffect(() => {
    if (location.pathname === "/profile/bookings") {
      window.setTimeout(() => {
        document.getElementById("my-bookings")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [location.pathname, profileBookings.length]);

  const getBookingSnapshot = (booking) => booking.package_snapshot || booking.packageSnapshot || {};
  const getBookingPackageName = (booking) =>
    booking.packageName || getBookingSnapshot(booking).title || booking.package?.title || "South India Package";
  const getBookingPrice = (booking) => {
    const amount = booking.totalAmount || booking.total_amount || booking.price;
    const numeric = Number(String(amount || "").replace(/[^0-9.]/g, ""));
    return numeric ? `Rs. ${numeric.toLocaleString("en-IN")}` : "Pending";
  };
  const wishlistBoard = {
    Maybe: wishlist.filter((_, index) => index % 3 === 0),
    Shortlisted: wishlist.filter((_, index) => index % 3 === 1),
    "Ready to Book": wishlist.filter((_, index) => index % 3 === 2),
  };

  const handleReviewSubmit = async (booking) => {
    if (!reviewText[booking.id]?.trim()) {
      showToast("Please write a review before submitting.", "error");
      return;
    }

    const reviewPayload = {
      customer_id: user?.id || null,
      package_id: booking.package_id || booking.packageId || booking.package?.id || null,
      rating: reviewRating[booking.id] || 5,
      text: reviewText[booking.id],
    };

    let newReview = {
      id: createReviewId(),
      userName: user?.fullName,
      packageName: getBookingPackageName(booking),
      rating: reviewPayload.rating,
      comment: reviewPayload.text,
      createdAt: new Date().toLocaleDateString(),
    };

    if (user?.id) {
      const result = await createReview(reviewPayload);
      if (result.error) {
        showToast(result.error.message || "Reviews are available after booking this package.", "error");
        return;
      }
      const data = Array.isArray(result.data) ? result.data[0] : result.data;
      newReview = {
        ...newReview,
        id: data?.id || newReview.id,
        createdAt: data?.created_at ? new Date(data.created_at).toLocaleDateString() : newReview.createdAt,
      };
    }

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    setReviewText((prev) => ({
      ...prev,
      [booking.id]: "",
    }));

    showToast("Review submitted successfully.", "success");
  };

  return (
    <main className="app-shell profile-page">
      <section className="section profile-hero glass-card">
        <div className="profile-hero-copy">
          <p className="eyebrow accent-light">Traveler Profile</p>
          <h1>Welcome back, {user?.fullName?.split(" ")[0] || "Traveler"}</h1>
          <p>Manage your account, booking history, and next adventure from one place.</p>
        </div>
        <div className="profile-hero-actions">
          <button className="button button-primary" type="button" onClick={handleEdit}>
            Edit Profile
          </button>
          <button className="button button-secondary" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

       <section
  className="section"
  style={{
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "24px",
    alignItems: "start",
  }}
>
        <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  }}
>
  <div
    className="profile-card glass-card"
    style={{
      height: "fit-content",
    }}
  >
          <div className="section-heading">
            <p className="eyebrow accent-light">Account Information</p>
            <h2>My Profile</h2>
          </div>
          {message && <div className="auth-alert auth-alert-success">{message}</div>}
          {editing ? (
            <div className="profile-form">
              <label>
                Full Name
                <input type="text" value={form.fullName} onChange={handleChange("fullName")} />
              </label>
              <label>
                Email
                <input type="email" value={form.email} onChange={handleChange("email")} />
              </label>
              <label>
                Phone
                <input type="tel" value={form.phone} onChange={handleChange("phone")} />
              </label>
              <div className="profile-form-actions">
                <button className="button button-primary" type="button" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="button button-secondary" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="profile-row">
                <span>Name</span>
                <strong>{user?.fullName || "—"}</strong>
              </div>
              <div className="profile-row">
                <span>Email</span>
                <strong>{user?.email || "—"}</strong>
              </div>
              <div className="profile-row">
                <span>Phone</span>
                <strong>{user?.phone || "—"}</strong>
              </div>
            </div>
          )}
        </div>
         <div
  className="profile-card glass-card"
  style={{ marginTop: "24px" }}
>
  <div className="section-heading">
    <p className="eyebrow accent-light">Saved Packages</p>
    <h2>My Wishlist</h2>
  </div>

  {wishlist.length > 0 ? (
    <>
      <div className="advanced-grid" style={{ marginBottom: "16px" }}>
        {Object.entries(wishlistBoard).map(([column, items]) => (
          <div key={column} className="itinerary-day">
            <p className="eyebrow" style={{ margin: 0 }}>{column}</p>
            <strong>{items.length} package{items.length === 1 ? "" : "s"}</strong>
            {items.slice(0, 3).map((item) => (
              <p key={item.id} style={{ margin: "8px 0 0", color: "#64748b" }}>{item.title}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="booking-history">
        {wishlist.map((item) => (
          <div key={item.id} className="booking-history-item">
          <div>
            <p className="booking-label">{item.state || "South India"}</p>
            <strong>{item.title}</strong>
            <p style={{ margin: "6px 0 0", color: "#64748b" }}>{item.destination}</p>
          </div>
          <div>
            <p className="booking-label">Price</p>
            <strong>Rs. {Number(item.price || 0).toLocaleString("en-IN")}</strong>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="button button-primary" type="button" onClick={() => navigate(`/package/${item.id}`)}>
              View
            </button>
            <button className="button button-secondary" type="button" onClick={() => handleRemoveWishlist(item.id)}>
              Remove
            </button>
          </div>
        </div>
        ))}
      </div>
    </>
  ) : (
    <div className="booking-empty">
      <p>No saved packages yet.</p>
      <p>Save packages from the browse page to plan your next trip.</p>
    </div>
  )}
</div>
         <div
  className="profile-card glass-card"
  style={{ marginTop: "24px" }}
>
  <div className="section-heading">
    <p className="eyebrow accent-light">
      Traveler Reviews
    </p>

    <h2>My Reviews</h2>
  </div>

  {reviews.length > 0 ? (
    <div className="booking-history">

      {reviews.map((review) => (
        <div
          key={review.id}
          className="booking-history-item"
        >
          <div>
            <p className="booking-label">
              Package
            </p>

            <strong>
              {review.packageName}
            </strong>
          </div>

          <div>
            <p className="booking-label">
              Rating
            </p>

            <strong>
              {"⭐".repeat(
                review.rating
              )}
            </strong>
          </div>

          <div>
            <p className="booking-label">
              Review
            </p>

            <strong>
              {review.comment}
            </strong>
          </div>

          <div>
            <button
              className="button button-secondary"
              onClick={() =>
                handleDeleteReview(
                  review.id
                )
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}

    </div>
  ) : (
    <div className="booking-empty">
      <p>No reviews submitted yet.</p>
      <p>
        Share your travel
        experience after your trip.
      </p>
    </div>
  )}
</div>
        </div>

        <div id="my-bookings" className="profile-card glass-card">
          <div className="section-heading">
            <p className="eyebrow accent-light">Travel History</p>
            <h2>My Bookings</h2>
          </div>
          {profileBookings.length > 0 ? (
            <div className="booking-history">
              {profileBookings.map((booking) => (
                <div key={booking.id} className="booking-history-item">
                  <div>
                    <p className="booking-label">Package</p>
                    <strong>{getBookingPackageName(booking)}</strong>
                    {(booking.packageImage || getBookingSnapshot(booking).image) && (
                      <div style={{ marginTop: 8 }}>
                        <img src={booking.packageImage || getBookingSnapshot(booking).image} alt={getBookingPackageName(booking)} style={{ width: 160, borderRadius: 12 }} />
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: "16px", width: "100%" }}>
  <p className="booking-label">
    Rating
  </p>

  <select
    value={reviewRating[booking.id] || 5}
    onChange={(e) =>
      setReviewRating((prev) => ({
        ...prev,
        [booking.id]: Number(e.target.value),
      }))
    }
    style={{
      padding: "10px",
      borderRadius: "10px",
      width: "100%",
      marginBottom: "10px",
    }}
  >
    <option value="5">⭐⭐⭐⭐⭐</option>
    <option value="4">⭐⭐⭐⭐</option>
    <option value="3">⭐⭐⭐</option>
    <option value="2">⭐⭐</option>
    <option value="1">⭐</option>
  </select>

  <textarea
    placeholder="Share your travel experience..."
    value={reviewText[booking.id] || ""}
    onChange={(e) =>
      setReviewText((prev) => ({
        ...prev,
        [booking.id]: e.target.value,
      }))
    }
    style={{
      width: "100%",
      minHeight: "90px",
      padding: "12px",
      borderRadius: "12px",
      border: "1px solid #d1d5db",
      resize: "vertical",
    }}
  />

  <button
    className="button button-primary"
    style={{ marginTop: "10px" }}
    onClick={() =>
      handleReviewSubmit(booking)
    }
  >
    Submit Review
  </button>
</div>
                  <div>
                    <p className="booking-label">Travel Date</p>
                    <strong>{booking.travelDate || booking.travel_date || "Flexible"}</strong>
                  </div>
                  <div>
                    <p className="booking-label">Travelers</p>
                    <strong>{booking.travelers || "—"}</strong>
                  </div>
                  <div>
                    <p className="booking-label">Price</p>
                    <strong>{getBookingPrice(booking)}</strong>
                  </div>
                  <div>
                    <p className="booking-label">Status</p>
                    <strong>{booking.status}</strong>
                  </div>
                  <div style={{ width: "100%", marginTop: "12px" }}>
                    <BookingTimeline status={booking.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="booking-empty">
              <p>No bookings found yet.</p>
              <p>Explore packages and confirm your first trip.</p>
            </div>
          )}
        </div>
       
      </section>
    </main>
  );
};

export default Profile;
