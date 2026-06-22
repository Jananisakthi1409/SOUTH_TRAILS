import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../features/auth/AuthContext";
import { getPackageById } from "../../services/packageService";
import { createBooking } from "../../services/bookingService";
import tamilnaduImg from "../../assets/images/tamilnadu.webp";

const packageImages = {
  "ooty-family-escape": tamilnaduImg,
  "kodaikanal-family-retreat": tamilnaduImg,
  "yercaud-family-tour": tamilnaduImg,
  "ooty-weekend-getaway": tamilnaduImg,
  "madurai-temple-tour": tamilnaduImg,
  "kanyakumari-adventure": tamilnaduImg,
};

const packageData = {
  "ooty-family-escape": {
    title: "Ooty Family Escape",
    price: "₹14,999 per person",
    duration: "4 Days / 3 Nights",
    included: ["Hotel", "Breakfast", "Transport", "Sightseeing"],
    itinerary: ["Day 1 - Arrival", "Day 2 - Botanical Garden", "Day 3 - Doddabetta Peak", "Day 4 - Return"],
    review: "★★★★★ Amazing experience. Hotels were excellent.",
    stats: ["1500+ Travelers", "4.8 Rating", "95% Satisfaction"],
  },
  "kodaikanal-family-retreat": {
    title: "Kodaikanal Family Retreat",
    price: "₹18,999 per person",
    duration: "5 Days / 4 Nights",
    included: ["Hotel", "Breakfast", "Transport", "Sightseeing"],
    itinerary: ["Day 1 - Arrival", "Day 2 - Lake Tour", "Day 3 - Forest Walk", "Day 4 - Local Market", "Day 5 - Return"],
    review: "★★★★★ Memorable family time in the hills. Great service.",
    stats: ["1200+ Travelers", "4.9 Rating", "98% Satisfaction"],
  },
  "yercaud-family-tour": {
    title: "Yercaud Family Tour",
    price: "₹10,999 per person",
    duration: "3 Days / 2 Nights",
    included: ["Hotel", "Breakfast", "Transport", "Sightseeing"],
    itinerary: ["Day 1 - Arrival", "Day 2 - Yercaud Lake", "Day 3 - Return"],
    review: "★★★★★ Perfect weekend retreat for our family.",
    stats: ["900+ Travelers", "4.7 Rating", "92% Satisfaction"],
  },
};

const PackageDetails = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const [packageItem, setPackageItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackage = async () => {
      setLoading(true);
      const fetched = await getPackageById(packageId);
      if (fetched) {
        setPackageItem(fetched);
      } else {
        setPackageItem(packageData[packageId] || {
          title: "Premium Package",
          price: "₹12,999 per person",
          duration: "4 Days / 3 Nights",
          included: ["Hotel", "Breakfast", "Transport", "Sightseeing"],
          itinerary: ["Day 1 - Arrival", "Day 2 - Explore", "Day 3 - Relax", "Day 4 - Return"],
          review: "★★★★★ A premium tour with unforgettable memories.",
          stats: ["1000+ Travelers", "4.8 Rating", "96% Satisfaction"],
        });
      }
      setLoading(false);
    };
    loadPackage();
  }, [packageId]);

  const item = packageItem || packageData[packageId] || {
    title: "Premium Package",
    price: "₹12,999 per person",
    duration: "4 Days / 3 Nights",
    included: ["Hotel", "Breakfast", "Transport", "Sightseeing"],
    itinerary: ["Day 1 - Arrival", "Day 2 - Explore", "Day 3 - Relax", "Day 4 - Return"],
    review: "★★★★★ A premium tour with unforgettable memories.",
    stats: ["1000+ Travelers", "4.8 Rating", "96% Satisfaction"],
  };

  const formattedPrice = typeof item.price === "number" ? `₹${item.price.toLocaleString()}` : item.price;
  const packageImage = packageImages[packageId] || tamilnaduImg;

  const handleBook = async () => {
    const selected = {
      id: `BK-${Date.now()}`,
      packageId: packageId,
      packageName: item.title,
      state: item.state || "",
      price: formattedPrice,
      packageImage,
      travelDate: "",
      travelers: 2,
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

    if (user?.id) {
      try {
        const { error } = await createBooking({
          customer_id: user.id,
          package_id: selected.packageId,
          package_snapshot: { id: selected.packageId, title: selected.packageName },
          travel_date: null,
          travelers: selected.travelers,
          status: selected.status,
          total_amount: Number(String(item.price || "").replace(/[^0-9.]/g, "")) || null,
        });
        if (error) {
          throw error;
        }
        navigate("/profile");
        return;
      } catch (error) {
        console.error("Booking save failed", error);
      }
    }

    const stored = JSON.parse(window.localStorage.getItem("southTrailsBookings") || "[]");
    window.localStorage.setItem("southTrailsBookings", JSON.stringify([...stored, selected]));
    navigate("/profile");
  };

  if (loading) {
    return <main className="app-shell package-detail-page"><p>Loading package...</p></main>;
  }

  return (
    <main className="app-shell package-detail-page">
      <section className="section package-hero glass-card">
        <div
          className="package-hero-media"
          style={{ backgroundImage: `url(${packageImage})` }}
        />
        <div className="package-hero-copy">
          <p className="eyebrow accent-light">Package Details</p>
          <h1>{item.title}</h1>
          <div className="package-meta">
            <span>{formattedPrice}</span>
            <span>{item.duration}</span>
          </div>
          <button className="button button-primary" onClick={handleBook}>
            Book Package
          </button>
        </div>
      </section>

      <section className="section package-info-grid">
        <div className="package-info-card glass-card">
          <h2>Included</h2>
          <ul>
            {item.included.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="package-info-card glass-card">
          <h2>Itinerary</h2>
          <ol>
            {item.itinerary.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section experience-section">
        <div className="section-heading">
          <p className="eyebrow">Traveler Experiences</p>
          <h2>Reviews, photos and satisfaction stats</h2>
        </div>
        <div className="experience-grid">
          <div className="review-card glass-card">
            <h3>Reviews</h3>
            <p>{item.review}</p>
          </div>
          <div className="gallery-card glass-card">
            <h3>Shared Photos</h3>
            <div className="gallery-grid">
              <div className="gallery-thumb" style={{ backgroundImage: `url(${packageImage})` }} />
              <div className="gallery-thumb" style={{ backgroundImage: `url(${packageImage})` }} />
              <div className="gallery-thumb" style={{ backgroundImage: `url(${packageImage})` }} />
            </div>
          </div>
          <div className="stats-card glass-card">
            {item.stats.map((stat) => (
              <div key={stat} className="stat-item">
                {stat}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PackageDetails;
