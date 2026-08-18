// src/context/AdminContext.jsx
import { createContext, useState } from "react";
import { signOutAdmin } from "../../services/authService";

export const AdminContext = createContext();

const ADMIN_STORAGE_KEY = "southTrailsAdmin";

const getStoredAdmin = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Unable to parse admin session", error);
    return null;
  }
};

const saveStoredAdmin = (user) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
};

const removeStoredAdmin = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_STORAGE_KEY);
};

export const AdminProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => getStoredAdmin());
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getStoredAdmin()));
  const [loading] = useState(false);

  const login = (user) => {
    const nextUser = {
      id: user?.id || "admin",
      email: user?.email || "admin@southtrails.com",
      name: user?.name || "Admin User",
      role: user?.role || "ADMIN",
      token: user?.token || "",
    };
    saveStoredAdmin(nextUser);
    setAdminUser(nextUser);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await signOutAdmin();
    removeStoredAdmin();
    setAdminUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{
      adminUser,
      isAuthenticated,
      loading,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
