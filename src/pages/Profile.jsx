import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BookingTimeline from "../components/advanced/BookingTimeline";
import { useToast } from "../components/ui/Toast";
import { useAuthContext } from "../features/auth/AuthContext";
import { getBookingsByCustomer } from "../services/bookingService";
import { getReviews, createReview } from "../services/reviewService";
import { getWishlist, removeWishlistPackage } from "../services/wishlistService";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import EmptyState from "../components/ui/EmptyState";

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
  const [reviewText, setReviewText] = useState({});
  const [reviewRating, setReviewRating] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadProfileData = async () => {
      setLoading(true);
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
        } catch (error) {
          console.error("Error loading profile data:", error);
        } finally {
          setLoading(false);
        }
        return;
      }

      // Fallbacks
      const storedBookings = window.localStorage.getItem("southTrailsBookings");
      if (storedBookings) {
        try { setBookings(JSON.parse(storedBookings)); } catch { setBookings([]); }
      }

      const storedReviews = window.localStorage.getItem("southTrailsReviews");
      if (storedReviews) {
        try { setReviews(JSON.parse(storedReviews)); } catch { setReviews([]); }
      }

      const storedWishlist = window.localStorage.getItem("southTrailsWishlist");
      if (storedWishlist) {
        try { setWishlist(JSON.parse(storedWishlist)); } catch { setWishlist([]); }
      }
      setLoading(false);
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
      showToast("Profile updated successfully", "success");
    } else {
      setMessage("Unable to update profile. Please try again.");
      showToast("Update failed", "error");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
    showToast("Review deleted", "success");
  };

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
    if (location.pathname === "/profile/bookings" && !loading) {
      window.setTimeout(() => {
        document.getElementById("my-bookings")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.pathname, loading]);

  const getBookingSnapshot = (booking) => booking.package_snapshot || booking.packageSnapshot || {};
  const getBookingPackageName = (booking) =>
    booking.packageName || getBookingSnapshot(booking).title || booking.package?.title || "South India Package";
  const getBookingPrice = (booking) => {
    const amount = booking.totalAmount || booking.total_amount || booking.price;
    const numeric = Number(String(amount || "").replace(/[^0-9.]/g, ""));
    return numeric ? `Rs. ${numeric.toLocaleString("en-IN")}` : "Pending";
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

    setReviews([newReview, ...reviews]);
    setReviewText((prev) => ({ ...prev, [booking.id]: "" }));
    showToast("Review submitted successfully.", "success");
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          <SkeletonLoader type="card" count={1} className="mb-8 h-48" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1"><SkeletonLoader type="card" count={2} /></div>
            <div className="lg:col-span-2"><SkeletonLoader type="card" count={2} /></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#07110f]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <section className="mb-8 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-[#030a0c] p-8 shadow-luxury md:flex-row md:items-center glass">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#f0c94a]">Traveler Profile</p>
            <h1 className="font-display text-3xl text-white md:text-5xl">Welcome back, {user?.fullName?.split(" ")[0] || "Traveler"}</h1>
            <p className="mt-2 text-[#f5efe6]/70">Manage your account, booking history, and next adventure.</p>
          </div>
          <div className="flex gap-4">
            <button className="rounded-md bg-[#2f7dd3] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#3d8ee9]" onClick={handleEdit}>
              Edit Profile
            </button>
            <button className="rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            {/* Account Info */}
            <div className="rounded-2xl border border-white/10 bg-[#12302d]/50 p-6 glass">
              <h2 className="mb-6 font-display text-2xl text-white">My Profile</h2>
              {message && <div className="mb-4 rounded border border-[#059669]/20 bg-[#059669]/10 p-3 text-sm text-[#34d399]">{message}</div>}
              
              {editing ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1 block text-sm text-white/70">Full Name</label>
                    <input type="text" value={form.fullName} onChange={handleChange("fullName")} className="w-full rounded-md border border-white/20 bg-[#030a0c] p-3 text-white focus:border-[#f0c94a] focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/70">Email</label>
                    <input type="email" value={form.email} onChange={handleChange("email")} className="w-full rounded-md border border-white/20 bg-[#030a0c] p-3 text-white focus:border-[#f0c94a] focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/70">Phone</label>
                    <input type="tel" value={form.phone} onChange={handleChange("phone")} className="w-full rounded-md border border-white/20 bg-[#030a0c] p-3 text-white focus:border-[#f0c94a] focus:outline-none" />
                  </div>
                  <div className="mt-2 flex gap-3">
                    <button className="flex-1 rounded-md bg-[#f0c94a] p-3 text-sm font-bold text-[#1a0a00] transition hover:bg-white" onClick={handleSave}>Save</button>
                    <button className="flex-1 rounded-md border border-white/20 bg-transparent p-3 text-sm font-bold text-white transition hover:bg-white/10" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col border-b border-white/10 pb-3">
                    <span className="text-sm text-white/50">Name</span>
                    <strong className="text-white">{user?.fullName || "—"}</strong>
                  </div>
                  <div className="flex flex-col border-b border-white/10 pb-3">
                    <span className="text-sm text-white/50">Email</span>
                    <strong className="text-white">{user?.email || "—"}</strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-white/50">Phone</span>
                    <strong className="text-white">{user?.phone || "—"}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <div className="rounded-2xl border border-white/10 bg-[#12302d]/50 p-6 glass">
              <h2 className="mb-6 font-display text-2xl text-white">My Wishlist</h2>
              {wishlist.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {wishlist.slice(0, 3).map((item) => (
                    <div key={item.id} className="rounded-xl border border-white/5 bg-[#030a0c] p-4">
                      <p className="text-xs font-bold uppercase text-[#f0c94a]">{item.state || "South India"}</p>
                      <strong className="mb-1 block text-white">{item.title}</strong>
                      <p className="mb-3 text-sm text-white/50">{item.destination}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">Rs. {Number(item.price || 0).toLocaleString("en-IN")}</span>
                        <div className="flex gap-2">
                          <button onClick={() => navigate(`/package/${item.id}`)} className="rounded bg-white/10 px-3 py-1 text-xs text-white hover:bg-[#2f7dd3]">View</button>
                          <button onClick={() => handleRemoveWishlist(item.id)} className="rounded border border-red-500/30 px-3 py-1 text-xs text-red-400 hover:bg-red-500/20">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {wishlist.length > 3 && (
                    <button className="mt-2 w-full text-center text-sm text-[#f0c94a] hover:text-white transition">View all {wishlist.length} saved packages</button>
                  )}
                </div>
              ) : (
                <EmptyState icon="❤️" title="Empty Wishlist" description="Save packages you love." />
              )}
            </div>
            
            {/* Reviews */}
            <div className="rounded-2xl border border-white/10 bg-[#12302d]/50 p-6 glass">
              <h2 className="mb-6 font-display text-2xl text-white">My Reviews</h2>
              {reviews.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="rounded-xl border border-white/5 bg-[#030a0c] p-4">
                      <strong className="mb-1 block text-white">{review.packageName}</strong>
                      <div className="mb-2 text-[#f0c94a]">{"⭐".repeat(review.rating)}</div>
                      <p className="mb-3 text-sm italic text-white/70">"{review.comment}"</p>
                      <button onClick={() => handleDeleteReview(review.id)} className="text-xs text-red-400 hover:text-red-300">Delete Review</button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState icon="⭐" title="No Reviews" description="Share your experience after a trip." />
              )}
            </div>
          </div>

          {/* Right Column - Bookings */}
          <div id="my-bookings" className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-[#12302d]/50 p-6 glass">
              <div className="mb-8 border-b border-white/10 pb-4">
                <p className="text-sm font-bold uppercase tracking-widest text-[#f0c94a]">Travel History</p>
                <h2 className="font-display text-3xl text-white">My Bookings</h2>
              </div>
              
              {bookings.length > 0 ? (
                <div className="flex flex-col gap-8">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="rounded-2xl border border-white/10 bg-[#030a0c] p-6 shadow-md transition hover:border-white/20">
                      <div className="flex flex-col gap-6 md:flex-row">
                        {(booking.packageImage || getBookingSnapshot(booking).image) && (
                          <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl md:w-48">
                            <img src={booking.packageImage || getBookingSnapshot(booking).image} alt={getBookingPackageName(booking)} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="mb-4 font-display text-2xl text-white">{getBookingPackageName(booking)}</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                            <div>
                              <p className="text-white/50">Date</p>
                              <strong className="text-white">{booking.travelDate || booking.travel_date || "Flexible"}</strong>
                            </div>
                            <div>
                              <p className="text-white/50">Travelers</p>
                              <strong className="text-white">{booking.travelers || "—"}</strong>
                            </div>
                            <div>
                              <p className="text-white/50">Price</p>
                              <strong className="text-white">{getBookingPrice(booking)}</strong>
                            </div>
                            <div>
                              <p className="text-white/50">Status</p>
                              <strong className="text-[#f0c94a] uppercase tracking-wider text-xs">{booking.status}</strong>
                            </div>
                          </div>
                          
                          <div className="mt-6 border-t border-white/10 pt-6">
                            <BookingTimeline status={booking.status} />
                          </div>

                          {booking.status === "COMPLETED" && (
                            <div className="mt-6 rounded-xl bg-white/5 p-4 border border-white/5">
                              <h4 className="mb-3 text-sm font-bold text-white">Leave a Review</h4>
                              <div className="mb-3">
                                <select
                                  value={reviewRating[booking.id] || 5}
                                  onChange={(e) => setReviewRating(prev => ({ ...prev, [booking.id]: Number(e.target.value) }))}
                                  className="w-full rounded-lg border border-white/20 bg-[#07110f] p-2 text-white outline-none"
                                >
                                  {[5,4,3,2,1].map(num => (
                                    <option key={num} value={num}>{"⭐".repeat(num)}</option>
                                  ))}
                                </select>
                              </div>
                              <textarea
                                placeholder="Share your experience..."
                                value={reviewText[booking.id] || ""}
                                onChange={(e) => setReviewText(prev => ({ ...prev, [booking.id]: e.target.value }))}
                                className="mb-3 w-full rounded-lg border border-white/20 bg-[#07110f] p-3 text-white outline-none"
                                rows="3"
                              />
                              <button
                                onClick={() => handleReviewSubmit(booking)}
                                className="rounded bg-[#2f7dd3] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#3d8ee9]"
                              >
                                Submit Review
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState 
                  icon="📅" 
                  title="No bookings yet" 
                  description="You haven't booked any packages yet. Start exploring Tamil Nadu today." 
                  actionText="Browse Packages"
                  actionLink="/packages"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
