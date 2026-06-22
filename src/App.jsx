import { lazy, Suspense, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Navigate, Routes, Route, useLocation, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import CommandPalette from "./components/advanced/CommandPalette";
import LuxuryExperienceLayer from "./components/advanced/LuxuryExperienceLayer";
import { ToastProvider } from "./components/ui/Toast";
import { AuthProvider } from "./features/auth/AuthContext";

import AdminProvider, { AdminContext } from "./pages/Booking/AdminContext";

import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Explore = lazy(() => import("./pages/Explore/Explore"));
const Oracle = lazy(() => import("./pages/Oracle/Oracle"));
const Curated = lazy(() => import("./pages/Curated/Curated"));

const TamilNaduExplore = lazy(() => import("./pages/States/TamilNaduExplore"));
const Chennai = lazy(() => import("./pages/Destinations/Chennai"));
const Madurai = lazy(() => import("./pages/Destinations/Madurai"));
const Thanjavur = lazy(() => import("./pages/Destinations/Thanjavur"));
const Ooty = lazy(() => import("./pages/Destinations/Ooty"));
const Kodaikanal = lazy(() => import("./pages/Destinations/Kodaikanal"));
const Rameswaram = lazy(() => import("./pages/Destinations/Rameswaram"));
const Kanyakumari = lazy(() => import("./pages/Destinations/Kanyakumari"));
const Coimbatore = lazy(() => import("./pages/Destinations/Coimbatore"));

const MoodPage = lazy(() => import("./pages/Moods/MoodPage"));
const PlacePage = lazy(() => import("./pages/Places/PlacePage"));

const AllPackageDetails = lazy(() => import("./pages/Packages/AllPackageDetails"));
const PackagesBrowse = lazy(() => import("./pages/Packages/PackagesBrowse"));
const TamilNaduPackages = lazy(() => import("./pages/Packages/TamilNaduPackages"));

const Booking = lazy(() => import("./pages/Booking/Booking"));
const BookingSuccess = lazy(() => import("./pages/Booking/BookingSuccess"));
const Payment = lazy(() => import("./pages/Payment/Payment"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const ContactOwner = lazy(() => import("./pages/Contact/ContactOwner"));
const TripBuilder = lazy(() => import("./pages/Advanced/TripBuilder"));
const MapExplorer = lazy(() => import("./pages/Advanced/MapExplorer"));
const MoodQuiz = lazy(() => import("./pages/Advanced/MoodQuiz"));
const WebsiteFlow = lazy(() => import("./pages/Advanced/WebsiteFlow"));
const EcosystemCollection = lazy(() => import("./pages/Advanced/EcosystemCollection"));
const TravelFeaturePage = lazy(() => import("./pages/Advanced/TravelFeaturePage"));

const AdminLogin = lazy(() => import("./pages/Booking/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/Booking/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/Booking/AdminBookings"));
const AdminPackages = lazy(() => import("./pages/Booking/AdminPackages"));
const AdminCustomers = lazy(() => import("./pages/Booking/AdminCustomers"));
const AdminUsers = lazy(() => import("./pages/Booking/AdminUsers"));
const AdminAnalytics = lazy(() => import("./pages/Booking/AdminAnalytics"));
const AdminReviews = lazy(() => import("./pages/Booking/AdminReviews"));
const AdminKanban = lazy(() => import("./pages/Advanced/AdminKanban"));

const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About/About"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Privacy = lazy(() => import("./pages/Legal/Privacy"));
const Terms = lazy(() => import("./pages/Legal/Terms"));
const HelpCenter = lazy(() => import("./pages/Help/HelpCenter"));
const Search = lazy(() => import("./pages/Search/Search"));

const PageFallback = () => (
  <main className="app-shell route-loading">
    <p>Loading...</p>
  </main>
);

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AdminContext);
  if (loading) return <PageFallback />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

const LegacyPackageRedirect = () => {
  const { packageId } = useParams();
  return <Navigate to={`/package/${packageId}`} replace />;
};

const TamilNaduOnlyRedirect = () => <Navigate to="/states/tamil-nadu" replace />;

function AppContent() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");
  const isPremiumLanding =
    location.pathname === "/" ||
    location.pathname === "/states/tamil-nadu" ||
    location.pathname === "/about-tamil-nadu";

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <CommandPalette />}
      {!isAdminRoute && <LuxuryExperienceLayer />}

      <main id="main-content" className="flex-grow">
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait">
            <motion.div
            key={location.pathname}
            className={`route-stage${!isAdminRoute && !isPremiumLanding ? " route-stage--luxury" : ""}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
        <Routes location={location}>
          {/* Home */}
          <Route path="/" element={<Home />} />

        {/* Explore */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/destinations" element={<Explore />} />
        <Route path="/experiences" element={<Explore />} />
        <Route path="/heritage" element={<EcosystemCollection type="marketplace" />} />
        <Route path="/food-trails" element={<EcosystemCollection type="marketplace" />} />
        <Route path="/festivals" element={<EcosystemCollection type="events" />} />
        <Route path="/food-culture" element={<TravelFeaturePage type="food" />} />
        <Route path="/hotels" element={<TravelFeaturePage type="stays" />} />
        <Route path="/stays" element={<TravelFeaturePage type="stays" />} />
        <Route path="/itinerary-builder" element={<TravelFeaturePage type="itinerary" />} />
        <Route path="/travel-info" element={<TravelFeaturePage type="travelInfo" />} />
        <Route path="/gallery" element={<TravelFeaturePage type="gallery" />} />
        <Route path="/blog" element={<TravelFeaturePage type="blog" />} />
        <Route path="/wishlist" element={<TravelFeaturePage type="wishlist" />} />
        <Route path="/reviews" element={<TravelFeaturePage type="reviews" />} />
        <Route path="/premium-features" element={<TravelFeaturePage type="premium" />} />
        <Route path="/virtual-tour" element={<TravelFeaturePage type="premium" />} />
        <Route path="/voice-search" element={<TravelFeaturePage type="premium" />} />
        <Route path="/dark-mode" element={<TravelFeaturePage type="premium" />} />
        <Route path="/language" element={<TravelFeaturePage type="premium" />} />
        <Route path="/ai-chatbot" element={<Oracle />} />
        <Route path="/about-tamil-nadu" element={<TamilNaduExplore />} />
        <Route path="/oracle" element={<Oracle />} />
        <Route path="/curated" element={<Curated />} />

        {/* States */}
        <Route
          path="/states/tamil-nadu"
          element={<TamilNaduExplore />}
        />
        <Route path="/states/kerala" element={<TamilNaduOnlyRedirect />} />
        <Route path="/states/karnataka" element={<TamilNaduOnlyRedirect />} />
        <Route path="/states/andhra-pradesh" element={<TamilNaduOnlyRedirect />} />
        <Route path="/states/:state" element={<TamilNaduOnlyRedirect />} />

        {/* Tamil Nadu Destinations */}
        <Route path="/destinations/chennai" element={<Chennai />} />
        <Route path="/destinations/madurai" element={<Madurai />} />
        <Route path="/destinations/thanjavur" element={<Thanjavur />} />
        <Route path="/destinations/ooty" element={<Ooty />} />
        <Route path="/destinations/kodaikanal" element={<Kodaikanal />} />
        <Route path="/destinations/rameswaram" element={<Rameswaram />} />
        <Route path="/destinations/kanyakumari" element={<Kanyakumari />} />
        <Route path="/destinations/coimbatore" element={<Coimbatore />} />

        {/* Packages */}
        <Route
          path="/packages"
          element={<PackagesBrowse />}
        />

        <Route
          path="/packages/:packageId"
          element={<AllPackageDetails />}
        />
        <Route
          path="/package/:packageId"
          element={<AllPackageDetails />}
        />

        <Route
          path="/states/:state/packages/:category"
          element={<Navigate to="/packages" replace />}
        />

        {/* Tamil Nadu Packages */}
        <Route
          path="/tamil-nadu-packages"
          element={<TamilNaduPackages />}
        />

        <Route
          path="/tamil-nadu-package/:packageId"
          element={<LegacyPackageRedirect />}
        />

        <Route path="/kerala-packages" element={<Navigate to="/packages" replace />} />
        <Route path="/karnataka-packages" element={<Navigate to="/packages" replace />} />
        <Route path="/andhra-packages" element={<Navigate to="/packages" replace />} />
        <Route path="/kerala-package/:packageId" element={<LegacyPackageRedirect />} />
        <Route path="/karnataka-package/:packageId" element={<LegacyPackageRedirect />} />
        <Route path="/andhra-package/:packageId" element={<LegacyPackageRedirect />} />

        {/* Booking */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-success/:bookingId" element={<BookingSuccess />} />
        <Route path="/payment" element={<Payment />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/bookings" element={<Profile />} />

        {/* Contact & Support */}
        <Route path="/contact" element={<ContactOwner />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/search" element={<Search />} />

        {/* Advanced Experiences */}
        <Route path="/trip-builder" element={<TripBuilder />} />
        <Route path="/map" element={<MapExplorer />} />
        <Route path="/mood-quiz" element={<MoodQuiz />} />
        <Route path="/flow" element={<WebsiteFlow />} />
        <Route path="/recommendations" element={<EcosystemCollection type="recommendations" />} />
        <Route path="/notifications" element={<EcosystemCollection type="notifications" />} />
        <Route path="/guides" element={<EcosystemCollection type="guides" />} />
        <Route path="/homestays" element={<EcosystemCollection type="homestays" />} />
        <Route path="/events" element={<EcosystemCollection type="events" />} />
        <Route path="/marketplace" element={<EcosystemCollection type="marketplace" />} />
        <Route path="/eco-tourism" element={<EcosystemCollection type="eco" />} />
        <Route path="/ar-vr" element={<EcosystemCollection type="ar-vr" />} />
        <Route path="/startup-features" element={<EcosystemCollection type="startup" />} />

        {/* Mood & Place */}
        <Route path="/moods/:mood" element={<MoodPage />} />
        <Route path="/places/:place" element={<PlacePage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminRoute><AdminDashboard /></AdminRoute>}
        />

        <Route
          path="/admin/bookings"
          element={<AdminRoute><AdminBookings /></AdminRoute>}
        />

        <Route
          path="/admin/packages"
          element={<AdminRoute><AdminPackages /></AdminRoute>}
        />
        <Route
          path="/admin/packages/new"
          element={<AdminRoute><AdminPackages /></AdminRoute>}
        />

        <Route
          path="/admin/customers"
          element={<AdminRoute><AdminCustomers /></AdminRoute>}
        />

        <Route
          path="/admin/users"
          element={<AdminRoute><AdminUsers /></AdminRoute>}
        />
        <Route
          path="/admin/reviews"
          element={<AdminRoute><AdminReviews /></AdminRoute>}
        />

          <Route
            path="/admin/analytics"
            element={<AdminRoute><AdminAnalytics /></AdminRoute>}
          />

          <Route
            path="/admin/kanban"
            element={<AdminRoute><AdminKanban /></AdminRoute>}
          />
            <Route path="*" element={<NotFound />} />
          </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <AdminProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </AdminProvider>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
