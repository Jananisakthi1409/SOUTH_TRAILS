import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import { getBookingsByCustomer, updateBookingStatus } from "../../services/bookingService";

const getSnapshot = (booking) => booking?.package_snapshot || booking?.packageSnapshot || {};
const formatMoney = (amount) => {
  const numeric = Number(String(amount || "").replace(/[^0-9.]/g, ""));
  return numeric ? `Rs. ${numeric.toLocaleString("en-IN")}` : "Pending";
};

const Payment = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const [booking, setBooking] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [fallbackBookingId] = useState(() => `BK-${Date.now()}`);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadBooking = async () => {
      let latestBooking = null;
      if (user?.id) {
        const bookings = await getBookingsByCustomer(user.id);
        latestBooking = bookings?.[0] || null;
      }
      if (!latestBooking) {
        const storedBookings = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
        latestBooking = storedBookings.at(-1) || null;
      }
      setBooking(latestBooking);
    };

    loadBooking();
  }, [isAuthenticated, navigate, user]);

  const invoice = useMemo(() => {
    const snapshot = getSnapshot(booking);
    const amount = booking?.total_amount || booking?.totalAmount || booking?.price;
    const bookingId = booking?.id || fallbackBookingId;
    return {
      id: `INV-${bookingId}`,
      bookingId,
      packageName: booking?.packageName || snapshot.title || "Tamil Trails Package",
      traveler: user?.fullName || user?.name || "Traveler",
      travelDate: booking?.travel_date || booking?.travelDate || "Flexible",
      travelers: booking?.travelers || 1,
      amount,
      paymentStatus: paid || booking?.status === "Confirmed" ? "Paid" : "Pending",
    };
  }, [booking, fallbackBookingId, paid, user]);

  const handlePayNow = async () => {
    if (!booking) return;
    setProcessing(true);

    if (booking.id) {
      const result = await updateBookingStatus(booking.id, "Confirmed");
      if (!result.error) {
        setPaid(true);
        setBooking({ ...booking, status: "Confirmed" });
        setProcessing(false);
        return;
      }
    }

    const storedBookings = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
    const updatedBookings = storedBookings.map((item, index) =>
      index === storedBookings.length - 1 ? { ...item, status: "Confirmed" } : item
    );
    window.localStorage.setItem("southTrailsBookings", JSON.stringify(updatedBookings));
    setPaid(true);
    setProcessing(false);
  };

  const downloadReceipt = () => {
    const lines = [
      "Tamil Trails Payment Receipt",
      `Invoice: ${invoice.id}`,
      `Booking: ${invoice.bookingId}`,
      `Traveler: ${invoice.traveler}`,
      `Package: ${invoice.packageName}`,
      `Travel Date: ${invoice.travelDate}`,
      `Travelers: ${invoice.travelers}`,
      `Amount: ${formatMoney(invoice.amount)}`,
      `Status: ${invoice.paymentStatus}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoice.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="app-shell payment-page">
      <section className="section payment-panel glass-card">
        <div className="section-heading">
          <p className="eyebrow accent-light">Payment</p>
          <h1>{invoice.paymentStatus === "Paid" ? "Payment confirmed" : "Secure your booking"}</h1>
          <p>Mock payment flow for project demonstration with invoice and receipt generation.</p>
        </div>

        <div className="payment-summary">
          <div>
            <p className="summary-label">Invoice</p>
            <h2>{invoice.id}</h2>
            <p>{invoice.packageName}</p>
          </div>
          <div className="summary-details">
            <span>Booking: {invoice.bookingId}</span>
            <span>Traveler: {invoice.traveler}</span>
            <span>Date: {invoice.travelDate}</span>
            <span>Travelers: {invoice.travelers}</span>
            <span>Total: {formatMoney(invoice.amount)}</span>
            <span>Status: {invoice.paymentStatus}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="button button-primary payment-button" type="button" onClick={handlePayNow} disabled={!booking || processing || invoice.paymentStatus === "Paid"}>
            {processing ? "Processing..." : invoice.paymentStatus === "Paid" ? "Paid" : "Pay Now"}
          </button>
          <button className="button button-secondary payment-button" type="button" onClick={downloadReceipt}>
            Download Receipt
          </button>
          <button className="button button-secondary payment-button" type="button" onClick={() => navigate("/profile/bookings")}>
            My Bookings
          </button>
        </div>
      </section>
    </main>
  );
};

export default Payment;
