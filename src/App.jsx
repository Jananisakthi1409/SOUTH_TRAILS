import { lazy, Suspense, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Navigate, Routes, Route, useLocation, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
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

const StatePage = lazy(() => import("./pages/States/StatePage"));
const TamilNaduExplore = lazy(() => import("./pages/States/TamilNaduExplore"));
const KeraExplore = lazy(() => import("./pages/States/KeraExplore"));
const KarnatakaExplore = lazy(() => import("./pages/States/KarnatakaExplore"));
const AndhraPradeshExplore = lazy(() => import("./pages/States/AndhraPradeshExplore"));

const MoodPage = lazy(() => import("./pages/Moods/MoodPage"));
const PlacePage = lazy(() => import("./pages/Places/PlacePage"));

const PackageCategory = lazy(() => import("./pages/Packages/PackageCategory"));
const PackageDetails = lazy(() => import("./pages/Packages/PackageDetails"));
const AllPackageDetails = lazy(() => import("./pages/Packages/AllPackageDetails"));
const PackagesBrowse = lazy(() => import("./pages/Packages/PackagesBrowse"));
const TamilNaduPackages = lazy(() => import("./pages/Packages/TamilNaduPackages"));
const KeraPackages = lazy(() => import("./pages/Packages/KeraPackages"));
const KarnatakaPackages = lazy(() => import("./pages/Packages/KarnatakaPackages"));
const AndhraPradeshPackages = lazy(() => import("./pages/Packages/AndhraPradeshPackages"));

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

const AdminLogin = lazy(() => import("./pages/Booking/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/Booking/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/Booking/AdminBookings"));
const AdminPackages = lazy(() => import("./pages/Booking/AdminPackages"));
const AdminCustomers = lazy(() => import("./pages/Booking/AdminCustomers"));
const AdminUsers = lazy(() => import("./pages/Booking/AdminUsers"));
const AdminAnalytics = lazy(() => import("./pages/Booking/AdminAnalytics"));
const AdminReviews = lazy(() => import("./pages/Booking/AdminReviews"));
const AdminKanban = lazy(() => import("./pages/Advanced/AdminKanban"));

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

function AppContent() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <CommandPalette />}
      {!isAdminRoute && <LuxuryExperienceLayer />}

      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className={`route-stage${!isAdminRoute ? " route-stage--luxury" : ""}`}
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
        <Route path="/oracle" element={<Oracle />} />
        <Route path="/curated" element={<Curated />} />

        {/* States */}
        <Route
          path="/states/tamil-nadu"
          element={<TamilNaduExplore />}
        />

        <Route
          path="/states/kerala"
          element={<KeraExplore />}
        />

        <Route
          path="/states/karnataka"
          element={<KarnatakaExplore />}
        />

        <Route
          path="/states/andhra-pradesh"
          element={<AndhraPradeshExplore />}
        />

        <Route
          path="/states/:state"
          element={<StatePage />}
        />

        {/* Packages */}
        <Route
          path="/packages"
          element={<PackagesBrowse />}
        />

        <Route
          path="/packages/:packageId"
          element={<PackageDetails />}
        />
        <Route
          path="/package/:packageId"
          element={<AllPackageDetails />}
        />

        <Route
          path="/states/:state/packages/:category"
          element={<PackageCategory />}
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

        {/* Kerala Packages */}
        <Route
          path="/kerala-packages"
          element={<KeraPackages />}
        />

        <Route
          path="/kerala-package/:packageId"
          element={<LegacyPackageRedirect />}
        />

        {/* Karnataka Packages */}
        <Route
          path="/karnataka-packages"
          element={<KarnatakaPackages />}
        />

        <Route
          path="/karnataka-package/:packageId"
          element={<LegacyPackageRedirect />}
        />

        {/* Andhra Packages */}
        <Route
          path="/andhra-packages"
          element={<AndhraPradeshPackages />}
        />

        <Route
          path="/andhra-package/:packageId"
          element={<LegacyPackageRedirect />}
        />

        {/* Booking */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-success/:bookingId" element={<BookingSuccess />} />
        <Route path="/payment" element={<Payment />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/bookings" element={<Profile />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactOwner />} />

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
        </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AdminProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AdminProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
