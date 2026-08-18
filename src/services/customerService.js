import { supabase } from "./supabase";

export const getCustomers = async () => {
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("getCustomers", error);
    return [];
  }
  return data;
};

export const getCustomerById = async (id) => {
  if (!id || id === "undefined") {
    return { data: null, error: { message: "Customer id is required" } };
  }
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  const { data, error } = await supabase.from("customers").select("*").eq("id", id).single();
  if (error) {
    return { data: null, error };
  }
  return { data, error: null };
};

export const deleteCustomer = async (id) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("customers").delete().eq("id", id);
};

export const createCustomer = async (customerData) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("customers").insert(customerData);
};

export const updateCustomer = async (id, customerData) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("customers").update(customerData).eq("id", id);
};
