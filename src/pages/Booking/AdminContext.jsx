// src/context/AdminContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { getCurrentSession, onAuthStateChange, signOutAdmin } from "../../services/authService";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const { data, error } = await getCurrentSession();
      if (!error && data?.session?.user) {
        setAdminUser(data.session.user);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    initialize();

    const { data } = onAuthStateChange((event, session) => {
      if (session?.user) {
        setAdminUser(session.user);
        setIsAuthenticated(true);
      } else {
        setAdminUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => data?.subscription?.unsubscribe();
  }, []);

  const login = (user) => {
    setAdminUser(user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await signOutAdmin();
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
