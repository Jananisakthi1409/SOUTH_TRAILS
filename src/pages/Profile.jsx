import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../features/auth/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile } = useAuthContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  //const [reviews, setReviews] = useState([]);
const [reviewText, setReviewText] = useState({});
const [reviewRating, setReviewRating] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      setForm({ fullName: user.fullName || "", email: user.email || "", phone: user.phone || "" });
    }

    const storedBookings = window.localStorage.getItem("southTrailsBookings");
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (error) {
        setBookings([]);
      }
    }
    const storedReviews =
  window.localStorage.getItem(
    "southTrailsReviews"
  );

if (storedReviews) {
  try {
    setReviews(JSON.parse(storedReviews));
  } catch {
    setReviews([]);
  }
}
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
  const updatedReviews =
    reviews.filter(
      (review) => review.id !== id
    );

  setReviews(updatedReviews);

  window.localStorage.setItem(
    "southTrailsReviews",
    JSON.stringify(updatedReviews)
  );
};

  const profileBookings = bookings.length ? bookings : [];
  const handleReviewSubmit = (booking) => {
  if (!reviewText[booking.id]?.trim()) {
    alert("Please write a review");
    return;
  }

  const review = {
    id: Date.now(),
    userName: user?.fullName,
    packageName: booking.packageName,
    packageImage: booking.packageImage,
    rating: reviewRating[booking.id] || 5,
    comment: reviewText[booking.id],
    createdAt: new Date().toLocaleDateString(),
  };

  const updatedReviews = [review, ...reviews];

  setReviews(updatedReviews);

  localStorage.setItem(
    "southTrailsReviews",
    JSON.stringify(updatedReviews)
  );

  setReviewText((prev) => ({
    ...prev,
    [booking.id]: "",
  }));

  alert("Review submitted successfully!");
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

        <div className="profile-card glass-card">
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
                    <strong>{booking.packageName}</strong>
                    {booking.packageImage && (
                      <div style={{ marginTop: 8 }}>
                        <img src={booking.packageImage} alt={booking.packageName} style={{ width: 160, borderRadius: 12 }} />
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
                    <strong>{booking.travelDate || "—"}</strong>
                  </div>
                  <div>
                    <p className="booking-label">Travelers</p>
                    <strong>{booking.travelers || "—"}</strong>
                  </div>
                  <div>
                    <p className="booking-label">Price</p>
                    <strong>{booking.price || "—"}</strong>
                  </div>
                  <div>
                    <p className="booking-label">Status</p>
                    <strong>{booking.status}</strong>
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
