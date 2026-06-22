import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BookingForm from "../../components/booking/BookingForm";
import ItineraryTimeline from "../../components/advanced/ItineraryTimeline";
import ReviewGallery from "../../components/advanced/ReviewGallery";
import { useAuthContext } from "../../features/auth/AuthContext";
import { createBooking } from "../../services/bookingService";
import { getPackageById } from "../../services/packageService";
import { getReviews } from "../../services/reviewService";
import { validateBookingForm } from "../../utils/validation";
import "./StatePackageDetails.css";

export const buildDestinationImages = (imageModules, stateFolder) =>
  Object.entries(imageModules)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((map, [path, moduleValue]) => {
      const normalized = path.replace(/\\/g, "/");
      const match = normalized.match(new RegExp(`${stateFolder}/([^/]+)/[^/]+\\.(png|jpe?g|webp|avif)$`, "i"));
      if (!match) return map;

      const folder = match[1];
      const loader = typeof moduleValue === "function"
        ? moduleValue
        : () => Promise.resolve(moduleValue);
      map[folder] = [...(map[folder] || []), { path: normalized, loader }];
      return map;
    }, {});

const asArray = (value) => (Array.isArray(value) ? value : []);

const formatMoney = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

const initialForm = {
  travelers: 2,
  travelDate: "",
  fullName: "",
  email: "",
  phone: "",
  paymentMethod: "online",
};

const choosePreferredImageEntries = (entries) => {
  const list = asArray(entries);
  const modern = list.filter((entry) => /\.(webp|avif)$/i.test(entry.path));
  return modern.length ? modern : list;
};

const loadImageEntry = async (entry) => {
  const moduleValue = await entry.loader();
  return moduleValue.default || moduleValue;
};

const StatePackageDetails = ({ backPath, classPrefix, destinationImages }) => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [bookingError, setBookingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let active = true;

    const loadPackage = async () => {
      setLoading(true);
      const loadedPkg = await getPackageById(packageId);
      if (active) {
        setPkg(loadedPkg);
        setLoading(false);
        setSelectedGalleryImage(0);
      }
    };

    loadPackage();
    return () => {
      active = false;
    };
  }, [packageId]);

  useEffect(() => {
    let active = true;
    getReviews({ packageId }).then((items) => {
      if (active) setReviews(items || []);
    });
    return () => {
      active = false;
    };
  }, [packageId]);

  const galleryEntries = useMemo(() => {
    if (!pkg) return [];
    const uploadedImages = [pkg.image1, pkg.image2, pkg.image3]
      .filter(Boolean)
      .map((src) => ({ path: src, loader: () => Promise.resolve(src) }));
    const folderImages = destinationImages[pkg.imageFolder] || [];
    if (uploadedImages.length) return [...uploadedImages, ...folderImages];
    return folderImages.length ? folderImages : Object.values(destinationImages).flat().slice(0, 6);
  }, [destinationImages, pkg]);

  useEffect(() => {
    let active = true;

    const loadGalleryImages = async () => {
      setGalleryLoading(true);
      try {
        const images = await Promise.all(choosePreferredImageEntries(galleryEntries).slice(0, 8).map(loadImageEntry));
        if (active) setGalleryImages(images);
      } catch (error) {
        console.error("Package gallery load failed:", error);
        if (active) setGalleryImages([]);
      } finally {
        if (active) setGalleryLoading(false);
      }
    };

    if (galleryEntries.length) {
      loadGalleryImages();
    } else {
      window.queueMicrotask(() => {
        if (active) setGalleryImages([]);
      });
    }

    return () => {
      active = false;
    };
  }, [galleryEntries]);

  const travelers = Math.max(Number(form.travelers) || 1, 1);
  const totalAmount = Number(pkg?.price || 0) * travelers;
  const activeImage = galleryImages[selectedGalleryImage % galleryImages.length];

  const updateForm = (field, value) => {
    setBookingError("");
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validateBooking = () => {
    return validateBookingForm({ ...form, travelers });
  };

  const handleBook = async () => {
    if (!pkg || isSubmitting) return;

    const validationError = validateBooking();
    if (validationError) {
      setBookingError(validationError);
      return;
    }

    const selected = {
      id: `BK-${Date.now()}`,
      packageId: pkg.id,
      packageName: pkg.title,
      state: pkg.state || pkg.destination || "",
      price: formatMoney(pkg.price),
      packageImage: galleryImages[0] || "",
      travelDate: form.travelDate,
      travelers,
      totalAmount,
      specialRequests: JSON.stringify({
        travelerName: form.fullName,
        email: form.email,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
      }),
      status: "Pending",
    };

    if (!isAuthenticated) {
      navigate("/signup", {
        state: {
          message: "Please create an account or login to continue booking.",
          selectedPackage: selected,
        },
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createBooking({
        customer_id: user?.id || null,
        package_id: selected.packageId,
        package_snapshot: {
          id: selected.packageId,
          title: selected.packageName,
          state: selected.state,
          image: selected.packageImage,
        },
        travel_date: selected.travelDate || null,
        travelers: selected.travelers,
        status: selected.status,
        total_amount: totalAmount,
        special_request: JSON.stringify({
          travelerName: form.fullName,
          email: form.email,
          phone: form.phone,
          paymentMethod: form.paymentMethod,
        }),
      });

      if (res?.error) throw res.error;
      const booking = res?.data || selected;
      navigate(`/booking-success/${booking.id || selected.id}`, {
        state: { booking },
      });
    } catch (error) {
      console.error("Booking fallback error:", error);
      const stored = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
      window.localStorage.setItem("southTrailsBookings", JSON.stringify([...stored, selected]));
      navigate(`/booking-success/${selected.id}`, {
        state: { booking: selected },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="package-loading">Loading package...</div>;
  }

  if (!pkg) {
    return (
      <div className="package-not-found">
        <h1>Package Not Found</h1>
        <button type="button" onClick={() => navigate(backPath)}>Back to Packages</button>
      </div>
    );
  }

  return (
    <div className={`${classPrefix}-page`}>
      <section className={`${classPrefix}-hero-gallery`}>
        <div className="main-image">
          {galleryLoading ? (
            <div className="no-image-placeholder">Loading gallery...</div>
          ) : activeImage ? (
            <img src={activeImage} alt={pkg.title} />
          ) : (
            <div className="no-image-placeholder">No package image available</div>
          )}
        </div>

        {galleryImages.length > 1 && (
          <div className="gallery-thumbnails">
            {galleryImages.slice(0, 6).map((img, idx) => (
              <button
                key={img}
                type="button"
                className={`thumbnail ${idx === selectedGalleryImage ? "active" : ""}`}
                onClick={() => setSelectedGalleryImage(idx)}
                aria-label={`Show package image ${idx + 1}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
            {galleryImages.length > 6 && (
              <button type="button" className="thumbnail more" aria-label={`${galleryImages.length - 6} more images`}>
                +{galleryImages.length - 6}
              </button>
            )}
          </div>
        )}
      </section>

      <div className={`${classPrefix}-container`}>
        <div className={`${classPrefix}-content`}>
          <section className={`${classPrefix}-overview`}>
            <div className="overview-header">
              <div>
                <p className="destination-label">{pkg.destination}</p>
                <h1>{pkg.title}</h1>
                <div className="rating-line">
                  <span className="rating">{pkg.rating || "4.8"} / 5</span>
                  <span className="category-badge">{pkg.category}</span>
                </div>
              </div>
              <div className="price-card">
                <p className="price-label">From</p>
                <p className="price-value">{formatMoney(pkg.price)}</p>
                <p className="price-note">per person</p>
              </div>
            </div>

            <p className="package-description">{pkg.description}</p>

            <div className="quick-info">
              <div className="info-item">
                <span className="info-label">Duration</span>
                <span className="info-value">{pkg.days} Days / {pkg.nights} Nights</span>
              </div>
              <div className="info-item">
                <span className="info-label">Best For</span>
                <span className="info-value">{pkg.category}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Rating</span>
                <span className="info-value">{pkg.rating || "4.8"}/5.0</span>
              </div>
            </div>
          </section>

          <section className={`${classPrefix}-section`}>
            <h2>Places Covered</h2>
            <div className="places-grid">
              {asArray(pkg.places).map((place, idx) => (
                <motion.div
                  key={`${place}-${idx}`}
                  className="place-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="place-number">{idx + 1}</div>
                  <p>{place}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className={`${classPrefix}-section`}>
            <h2>What's Included</h2>
            <div className="included-list">
              {asArray(pkg.included).map((item, idx) => (
                <motion.div
                  key={`${item}-${idx}`}
                  className="included-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <span className="checkmark">Included</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className={`${classPrefix}-section`}>
            <h2>Highlights</h2>
            <div className="highlights-grid">
              {asArray(pkg.highlights).map((highlight, idx) => (
                <motion.div
                  key={`${highlight}-${idx}`}
                  className="highlight-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="highlight-icon">*</div>
                  <p>{highlight}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className={`${classPrefix}-section`}>
            <h2>Live Itinerary Timeline</h2>
            <ItineraryTimeline places={asArray(pkg.places)} days={pkg.days} />
          </section>

          <section className={`${classPrefix}-section`}>
            <h2>Review Gallery</h2>
            <ReviewGallery reviews={reviews} />
          </section>
        </div>

        <aside className={`${classPrefix}-sidebar`}>
          <div className="booking-card">
            <h3>Book Your Package</h3>

            <BookingForm
              form={form}
              price={formatMoney(pkg.price)}
              totalAmount={formatMoney(totalAmount)}
              error={bookingError}
              isSubmitting={isSubmitting}
              onChange={updateForm}
              onSubmit={handleBook}
              onBack={() => navigate(backPath)}
            />

            <div className="booking-info">
              <p>Free Cancellation up to 7 days before travel</p>
              <p>24/7 Customer Support</p>
              <p>Best Price Guarantee</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StatePackageDetails;
