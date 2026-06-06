import { supabase } from "./supabase";

export const signInAdmin = async ({ email, password }) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOutAdmin = async () => {
  if (!supabase) {
    return { error: { message: "Supabase not configured" } };
  }
  return supabase.auth.signOut();
};

export const getCurrentSession = async () => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.getSession();
};

export const onAuthStateChange = (callback) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.auth.onAuthStateChange(callback);
};
