// src/features/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "southTrailsUser";

const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Unable to parse auth user", error);
    return null;
  }
};

const saveUser = (user) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

const removeStoredUser = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const isAuthenticated = Boolean(user?.isLoggedIn);

  const login = async ({ email, password }) => {
    const existing = getStoredUser();
    if (!existing || existing.email !== email || existing.password !== password) {
      return { success: false, error: "Invalid email or password. Please try again." };
    }
    const nextUser = { ...existing, isLoggedIn: true };
    saveUser(nextUser);
    setUser(nextUser);
    return { success: true };
  };

  const signup = async ({ fullName, email, phone, password }) => {
    if (!fullName || !email || !phone || !password) {
      return { success: false, error: "Please complete all fields." };
    }
    const existing = getStoredUser();
    if (existing?.email === email) {
      return { success: false, error: "Email already registered. Please login instead." };
    }
    const nextUser = { fullName, email, phone, password, isLoggedIn: true };
    saveUser(nextUser);
    setUser(nextUser);
    return { success: true };
  };

  const logout = () => {
    removeStoredUser();
    setUser(null);
  };

  const updateProfile = async ({ fullName, email, phone }) => {
    const existing = getStoredUser();
    if (!existing) return false;
    const nextUser = { ...existing, fullName, email, phone };
    saveUser(nextUser);
    setUser(nextUser);
    return true;
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout, signup, updateProfile }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
