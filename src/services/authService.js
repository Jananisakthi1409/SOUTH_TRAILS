import { supabase } from "./supabase";
import { apiRequest, isBackendEnabled } from "./backendApi";
import { createCustomer, getCustomerById } from "./customerService";

export const signInAdmin = async ({ email, password }) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest("/auth/admin/signin", { method: "POST", body: { email, password } });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUpCustomer = async ({ email, password, name, phone }) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest("/auth/customer/signup", { method: "POST", body: { email, password, name, phone } });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
  if (signUpError) {
    return { data: null, error: signUpError };
  }

  const user = signUpData.user;
  if (!user) {
    return { data: null, error: { message: "Unable to create user account." } };
  }

  const customerResult = await createCustomer({
    id: user.id,
    name,
    email,
    phone,
  });

  if (customerResult.error) {
    return { data: null, error: customerResult.error };
  }

  const profile = customerResult.data?.[0] || null;
  return { data: { user, profile }, error: null };
};

export const signInCustomer = async ({ email, password }) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest("/auth/customer/signin", { method: "POST", body: { email, password } });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOutCustomer = async () => {
  if (isBackendEnabled) {
    try {
      await apiRequest("/auth/signout", { method: "POST", body: {} });
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  if (!supabase) {
    return { error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signOut();
};

export const signOutAdmin = signOutCustomer;

export const getCurrentSession = async () => {
  if (isBackendEnabled) {
    let user;
    try {
      const raw = typeof window === "undefined" ? null : window.localStorage.getItem("southTrailsUser");
      user = raw ? JSON.parse(raw) : null;
    } catch {
      return { data: { session: null }, error: null };
    }
    if (!user?.id) {
      return { data: { session: null }, error: null };
    }
    return { data: { session: user ? { user } : null }, error: null };
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.getSession();
};

export const getCustomerProfile = async (customerId) => {
  if (isBackendEnabled) {
    return getCustomerById(customerId);
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return getCustomerById(customerId);
};

export const onAuthStateChange = (callback) => {
  if (isBackendEnabled) {
    return { data: { subscription: { unsubscribe: () => {} } }, error: null };
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.onAuthStateChange(callback);
};
