import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Oracle from "./pages/Oracle/Oracle";

import StatePage from "./pages/States/StatePage";
import TamilNaduExplore from "./pages/States/TamilNaduExplore";
import KeraExplore from "./pages/States/KeraExplore";
import KarnatakaExplore from "./pages/States/KarnatakaExplore";
import AndhraPradeshExplore from "./pages/States/AndhraPradeshExplore";

import MoodPage from "./pages/Moods/MoodPage";
import PlacePage from "./pages/Places/PlacePage";

import Curated from "./pages/Curated/Curated";

import PackageCategory from "./pages/Packages/PackageCategory";
import PackageDetails from "./pages/Packages/PackageDetails";
import PackagesBrowse from "./pages/Packages/PackagesBrowse";

import TamilNaduPackages from "./pages/Packages/TamilNaduPackages";
import TamilNaduPackageDetails from "./pages/Packages/TamilNaduPackageDetails";

import KeraPackages from "./pages/Packages/KeraPackages";
import KeraPackageDetails from "./pages/Packages/KeraPackageDetails";

import KarnatakaPackages from "./pages/Packages/KarnatakaPackages";
import KarnatakaPackageDetails from "./pages/Packages/KarnatakaPackageDetails";

import AndhraPradeshPackages from "./pages/Packages/AndhraPradeshPackages";
import AndhraPradeshPackageDetails from "./pages/Packages/AndhraPradeshPackageDetails";

import Booking from "./pages/Booking/Booking";
import Payment from "./pages/Payment/Payment";
import Profile from "./pages/Profile";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import ContactOwner from "./pages/Contact/ContactOwner";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./features/auth/AuthContext";

import AdminProvider from "./pages/Booking/AdminContext";
import AdminLogin from "./pages/Booking/AdminLogin";
import AdminDashboard from "./pages/Booking/AdminDashboard";
import AdminBookings from "./pages/Booking/AdminBookings";
import AdminPackages from "./pages/Booking/AdminPackages";
import AdminUsers from "./pages/Booking/AdminUsers";
import AdminAnalytics from "./pages/Booking/AdminAnalytics";

import AdminCustomers from "./pages/Booking/AdminCustomers";

import "./App.css";

function AppContent() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
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
          element={<TamilNaduPackageDetails />}
        />

        {/* Kerala Packages */}
        <Route
          path="/kerala-packages"
          element={<KeraPackages />}
        />

        <Route
          path="/kerala-package/:packageId"
          element={<KeraPackageDetails />}
        />

        {/* Karnataka Packages */}
        <Route
          path="/karnataka-packages"
          element={<KarnatakaPackages />}
        />

        <Route
          path="/karnataka-package/:packageId"
          element={<KarnatakaPackageDetails />}
        />

        {/* Andhra Packages */}
        <Route
          path="/andhra-packages"
          element={<AndhraPradeshPackages />}
        />

        <Route
          path="/andhra-package/:packageId"
          element={<AndhraPradeshPackageDetails />}
        />

        {/* Booking */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactOwner />} />

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
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/bookings"
          element={<AdminBookings />}
        />

        <Route
          path="/admin/packages"
          element={<AdminPackages />}
        />

        <Route
          path="/admin/customers"
          element={<AdminCustomers />}
        />

        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />

        <Route
          path="/admin/analytics"
          element={<AdminAnalytics />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;