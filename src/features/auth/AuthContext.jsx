// src/features/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { isBackendEnabled } from "../../services/backendApi";
import { isSupabaseEnabled } from "../../services/supabase";
import {
  getCurrentSession,
  onAuthStateChange,
  signInCustomer,
  signOutCustomer,
  signUpCustomer,
} from "../../services/authService";
import { getCustomerById, updateCustomer } from "../../services/customerService";

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
    const restoreSession = async () => {
      if (!isSupabaseEnabled && !isBackendEnabled) {
        setUser(getStoredUser());
        return;
      }

      const sessionResult = await getCurrentSession();
      const existing = sessionResult?.data?.session?.user;
      if (existing?.id) {
        const profileResult = await getCustomerById(existing.id);
        if (profileResult.data) {
          const customer = profileResult.data;
          const nextUser = {
            id: customer.id,
            fullName: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            role: "CUSTOMER",
            isLoggedIn: true,
          };
          setUser(nextUser);
          saveUser(nextUser);
          return;
        }
      }

      const storedUser = getStoredUser();
      if (isBackendEnabled && storedUser && !storedUser.id) {
        removeStoredUser();
        setUser(null);
        return;
      }
      setUser(storedUser);
    };

    restoreSession();

    const { data: subscription, error } = onAuthStateChange(async (event, session) => {
      if (error) {
        console.error("Auth state subscription error", error);
        return;
      }
      if (event === "SIGNED_OUT") {
        removeStoredUser();
        setUser(null);
        return;
      }
      if (event === "SIGNED_IN" && session?.user?.id) {
        const profileResult = await getCustomerById(session.user.id);
        if (profileResult.data) {
          const customer = profileResult.data;
          const nextUser = {
            id: customer.id,
            fullName: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            role: "CUSTOMER",
            isLoggedIn: true,
          };
          setUser(nextUser);
          saveUser(nextUser);
        }
      }
    });

    return () => {
      if (subscription?.subscription?.unsubscribe) {
        subscription.subscription.unsubscribe();
      }
    };
  }, []);

  const isAuthenticated = Boolean(user?.isLoggedIn);

  const login = async ({ email, password }) => {
    if (!isSupabaseEnabled && !isBackendEnabled) {
      const existing = getStoredUser();
      if (!existing || existing.email !== email || existing.password !== password) {
        return { success: false, error: "Invalid email or password. Please try again." };
      }
      const nextUser = { ...existing, isLoggedIn: true };
      saveUser(nextUser);
      setUser(nextUser);
      return { success: true };
    }

    const { data, error } = await signInCustomer({ email, password });
    if (error) {
      return { success: false, error: error.message || "Unable to sign in." };
    }

    const userId = data?.user?.id;
    if (!userId) {
      return { success: false, error: "Unable to read authenticated user." };
    }

    const profileResult = await getCustomerById(userId);
    if (profileResult.error || !profileResult.data) {
      return { success: false, error: profileResult.error?.message || "Unable to load customer profile." };
    }
    const customer = profileResult.data;
    const nextUser = {
      id: customer.id,
      fullName: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      role: data?.role || "CUSTOMER",
      token: data?.token || "",
      isLoggedIn: true,
    };
    saveUser(nextUser);
    setUser(nextUser);
    return { success: true, user: nextUser };
  };

  const signup = async ({ fullName, email, phone, password }) => {
    if (!fullName || !email || !phone || !password) {
      return { success: false, error: "Please complete all fields." };
    }

    if (!isSupabaseEnabled && !isBackendEnabled) {
      const existing = getStoredUser();
      if (existing?.email === email) {
        return { success: false, error: "Email already registered. Please login instead." };
      }
      const nextUser = { fullName, email, phone, password, isLoggedIn: true };
      saveUser(nextUser);
      setUser(nextUser);
      return { success: true };
    }

    const { data, error } = await signUpCustomer({
      email,
      password,
      name: fullName,
      phone,
    });

    if (error) {
      return { success: false, error: error.message || "Unable to create account." };
    }

    const profile = data?.profile;
    const nextUser = {
      id: profile?.id || data?.user?.id,
      fullName: profile?.name || fullName,
      email: profile?.email || email,
      phone: profile?.phone || phone,
      role: data?.role || "CUSTOMER",
      token: data?.token || "",
      isLoggedIn: true,
    };
    saveUser(nextUser);
    setUser(nextUser);
    return { success: true, user: nextUser };
  };

  const logout = async () => {
    if (isSupabaseEnabled || isBackendEnabled) {
      await signOutCustomer();
    }
    removeStoredUser();
    setUser(null);
  };

  const updateProfile = async ({ fullName, email, phone }) => {
    if (!isSupabaseEnabled && !isBackendEnabled) {
      const existing = getStoredUser();
      if (!existing) return false;
      const nextUser = { ...existing, fullName, email, phone };
      saveUser(nextUser);
      setUser(nextUser);
      return true;
    }

    if (!user?.id) {
      return false;
    }

    const { error } = await updateCustomer(user.id, {
      name: fullName,
      email,
      phone,
    });
    if (error) {
      console.error("updateProfile", error);
      return false;
    }

    const nextUser = {
      ...user,
      fullName,
      email,
      phone,
    };
    saveUser(nextUser);
    setUser(nextUser);
    return true;
  };

  const value = { user, isAuthenticated, login, logout, signup, updateProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
