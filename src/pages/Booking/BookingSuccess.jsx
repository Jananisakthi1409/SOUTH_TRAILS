import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getBookingById } from "../../services/bookingService";

const formatMoney = (amount) => {
  const numeric = Number(amount || 0);
  return numeric ? `Rs. ${numeric.toLocaleString("en-IN")}` : "Confirmed";
};

const parseJson = (value) => {
  if (!value || typeof value !== "string") return {};
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};

const getPackageTitle = (booking) => {
  const snapshot = booking?.package_snapshot || booking?.packageSnapshot || {};
  return booking?.packageName || snapshot.title || booking?.package?.title || "South India Package";
};

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!location.state?.booking);

  useEffect(() => {
    let active = true;

    const loadBooking = async () => {
      if (booking || !bookingId) return;
      setLoading(true);
      const data = await getBookingById(bookingId);
      if (active) {
        setBooking(data);
        setLoading(false);
      }
    };

    loadBooking();
    return () => {
      active = false;
    };
  }, [booking, bookingId]);

  const traveler = useMemo(() => {
    const details = parseJson(booking?.specialRequest || booking?.special_request);
    return details.travelerName || "Traveler";
  }, [booking]);

  const packageTitle = getPackageTitle(booking);
  const travelDate = booking?.travelDate || booking?.travel_date || "Flexible";
  const travelers = booking?.travelers || 1;
  const amount = booking?.totalAmount || booking?.total_amount;

  return (
    <main className="booking-success-page">
      <section className="booking-success-hero">
        <div className="success-mark" aria-hidden="true">OK</div>
        <p className="eyebrow accent-light">Booking Confirmed</p>
        <h1>Your South Trails journey is reserved.</h1>
        <p>
          {loading
            ? "Loading your confirmation details..."
            : `${traveler}, your booking request has been saved and sent to the South Trails team.`}
        </p>
      </section>

      <section className="booking-success-panel glass-card">
        <div className="success-summary">
          <div>
            <span>Booking ID</span>
            <strong>{booking?.id || bookingId}</strong>
          </div>
          <div>
            <span>Package</span>
            <strong>{packageTitle}</strong>
          </div>
          <div>
            <span>Travel Date</span>
            <strong>{travelDate}</strong>
          </div>
          <div>
            <span>Travelers</span>
            <strong>{travelers}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{formatMoney(amount)}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{booking?.status || "Pending"}</strong>
          </div>
        </div>

        <div className="success-next">
          <h2>What happens next</h2>
          <div className="success-steps">
            <div>
              <span>1</span>
              <p>Admin team reviews your request.</p>
            </div>
            <div>
              <span>2</span>
              <p>You can track this trip from My Bookings.</p>
            </div>
            <div>
              <span>3</span>
              <p>Final confirmation happens after approval.</p>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <Link className="button button-primary" to="/profile/bookings">
            View My Bookings
          </Link>
          <Link className="button button-secondary" to="/packages">
            Explore More Packages
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BookingSuccess;
