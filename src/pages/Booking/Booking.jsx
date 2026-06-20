import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import { createBooking } from "../../services/bookingService";
import ootyImg from "../state/tamilnadu/ooty/pexels-alexander-savchuk-108847177-9659261.webp";
import kodaikanalImg from "../state/tamilnadu/kodaikanal/pexels-amal-s-a-167688837-37255862.webp";
import yercaudImg from "../state/tamilnadu/yercaud/pexels-rohit-george-1141376880-32236721.webp";
import "./Booking.css";

const packageOptions = [
  {
    id: "ooty-family-escape",
    title: "Ooty Family Escape",
    state: "Tamil Nadu",
    duration: "4 Days / 3 Nights",
    pricePerPerson: 29998,
    image: ootyImg,
    description: "Nilgiri views, botanical gardens, toy train moments, and a relaxed family pace.",
    highlights: ["Private hill transfers", "Breakfast included", "Flexible sightseeing"],
  },
  {
    id: "kodaikanal-family-retreat",
    title: "Kodaikanal Family Retreat",
    state: "Tamil Nadu",
    duration: "5 Days / 4 Nights",
    pricePerPerson: 24999,
    image: kodaikanalImg,
    description: "Lake walks, pine forests, lookout points, and slow mountain evenings.",
    highlights: ["Lake circuit", "Valley viewpoints", "Comfort stay"],
  },
  {
    id: "yercaud-family-tour",
    title: "Yercaud Family Tour",
    state: "Tamil Nadu",
    duration: "3 Days / 2 Nights",
    pricePerPerson: 19999,
    image: yercaudImg,
    description: "Coffee estates, calm roads, heritage corners, and an easy weekend itinerary.",
    highlights: ["Coffee trail", "Short getaway", "Local guide support"],
  },
];

const formatMoney = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

const Booking = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();

  const [travelDate, setTravelDate] = useState("");
  const [people, setPeople] = useState("2");
  const [selectedPackageId, setSelectedPackageId] = useState(packageOptions[0].id);
  const [contactNumber, setContactNumber] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPackage = useMemo(
    () => packageOptions.find((item) => item.id === selectedPackageId) || packageOptions[0],
    [selectedPackageId],
  );

  const travelers = Math.max(Number(people) || 1, 1);
  const totalAmount = selectedPackage.pricePerPerson * travelers;

  const buildSelectedBooking = () => ({
    id: `BK-${Date.now()}`,
    packageId: selectedPackage.id,
    packageName: selectedPackage.title,
    state: selectedPackage.state,
    price: formatMoney(totalAmount),
    packageImage: selectedPackage.image,
    travelDate,
    travelers,
    status: "Pending",
    totalAmount,
    specialRequests,
  });

  const validateForm = () => {
    if (!travelDate) return "Please choose a travel date.";
    if (travelers < 1) return "Please select at least one traveler.";
    if (contactNumber.trim() && !/^[0-9+\-\s()]{7,20}$/.test(contactNumber.trim())) {
      return "Please enter a valid contact number.";
    }
    return "";
  };

  const handleAuthRedirect = (path) => {
    navigate(path, {
      state: {
        message: "Please continue with your account to save this booking.",
        selectedPackage: buildSelectedBooking(),
      },
    });
  };

  const handleContinue = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!isAuthenticated) {
      setError("Log in or create an account to continue booking.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const payload = {
      customer_id: user?.id || null,
      package_id: selectedPackage.id,
      package_snapshot: {
        id: selectedPackage.id,
        title: selectedPackage.title,
        state: selectedPackage.state,
        image: selectedPackage.image,
      },
      travel_date: travelDate || null,
      travelers,
      status: "Pending",
      total_amount: totalAmount,
      special_request: JSON.stringify({
        phone: contactNumber,
        notes: specialRequests,
      }),
    };

    try {
      const result = await createBooking(payload);
      if (result?.error) throw result.error;
      const fallbackBooking = buildSelectedBooking();
      const booking = result?.data || fallbackBooking;
      navigate(`/booking-success/${booking.id || fallbackBooking.id}`, {
        state: { booking },
      });
    } catch (err) {
      console.error("Booking create failed", err);
      const fallbackBooking = buildSelectedBooking();
      const storedBookings = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
      window.localStorage.setItem("southTrailsBookings", JSON.stringify([...storedBookings, fallbackBooking]));
      navigate(`/booking-success/${fallbackBooking.id}`, {
        state: { booking: fallbackBooking },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="booking-checkout-page">
      <section className="booking-shell">
        <div className="booking-hero-copy">
          <p className="booking-kicker">Secure Trip Checkout</p>
          <h1>Reserve your South India escape</h1>
          <p>
            Pick a package, choose your date, and save the booking to your traveler profile.
          </p>
        </div>

        <div className="booking-progress" aria-label="Booking progress">
          {["Package", "Details", "Confirm"].map((step, index) => (
            <div className={`booking-progress-step ${index < 2 ? "active" : ""}`} key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>

        {error && <p className="booking-alert">{error}</p>}

        <div className="booking-layout">
          <section className="booking-summary-column" aria-label="Selected package">
            <div className="booking-package-visual">
              <img src={selectedPackage.image} alt={selectedPackage.title} />
              <div className="booking-image-label">
                <span>{selectedPackage.state}</span>
                <strong>{selectedPackage.duration}</strong>
              </div>
            </div>

            <div className="booking-package-copy">
              <p className="booking-kicker">Selected Package</p>
              <h2>{selectedPackage.title}</h2>
              <p>{selectedPackage.description}</p>
            </div>

            <div className="booking-package-list">
              {selectedPackage.highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          <section className="booking-form-panel" aria-label="Booking details">
            <div className="booking-panel-header">
              <div>
                <p className="booking-kicker">Trip Details</p>
                <h2>Complete your request</h2>
              </div>
              <strong>{formatMoney(selectedPackage.pricePerPerson)} / person</strong>
            </div>

            <form className="booking-form-modern" onSubmit={(event) => event.preventDefault()}>
              <label>
                Package
                <select
                  value={selectedPackageId}
                  onChange={(event) => {
                    setSelectedPackageId(event.target.value);
                    setError("");
                  }}
                >
                  {packageOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>

              <div className="booking-two-column">
                <label>
                  Travel Date
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(event) => {
                      setTravelDate(event.target.value);
                      setError("");
                    }}
                  />
                </label>

                <label>
                  Travelers
                  <select value={people} onChange={(event) => setPeople(event.target.value)}>
                    {[1, 2, 3, 4, 5, 6].map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? "Traveler" : "Travelers"}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Contact Number
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contactNumber}
                  onChange={(event) => setContactNumber(event.target.value)}
                />
              </label>

              <label>
                Notes
                <textarea
                  rows="4"
                  placeholder="Food preferences, room requests, pickup details..."
                  value={specialRequests}
                  onChange={(event) => setSpecialRequests(event.target.value)}
                />
              </label>

              <div className="booking-price-box">
                <div>
                  <span>Package rate</span>
                  <strong>{formatMoney(selectedPackage.pricePerPerson)} x {travelers}</strong>
                </div>
                <div>
                  <span>Taxes and local support</span>
                  <strong>Included</strong>
                </div>
                <div className="booking-total-row">
                  <span>Total estimate</span>
                  <strong>{formatMoney(totalAmount)}</strong>
                </div>
              </div>

              {isAuthenticated ? (
                <button
                  className="booking-primary-action"
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving Booking..." : "Confirm Booking"}
                </button>
              ) : (
                <div className="booking-auth-panel">
                  <p>Use your account to save this trip and track it in My Bookings.</p>
                  <div className="booking-auth-actions">
                    <button type="button" onClick={() => handleAuthRedirect("/login")}>
                      Log In
                    </button>
                    <button type="button" onClick={() => handleAuthRedirect("/signup")}>
                      Create Account
                    </button>
                  </div>
                </div>
              )}
            </form>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Booking;
