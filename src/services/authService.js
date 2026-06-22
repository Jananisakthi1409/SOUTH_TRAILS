import { supabase } from "./supabase";
import { createCustomer, getCustomerById } from "./customerService";

export const signInAdmin = async ({ email, password }) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUpCustomer = async ({ email, password, name, phone }) => {
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
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOutCustomer = async () => {
  if (!supabase) {
    return { error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signOut();
};

export const signOutAdmin = signOutCustomer;

export const getCurrentSession = async () => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.getSession();
};

export const getCustomerProfile = async (customerId) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return getCustomerById(customerId);
};

export const onAuthStateChange = (callback) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.onAuthStateChange(callback);
};
