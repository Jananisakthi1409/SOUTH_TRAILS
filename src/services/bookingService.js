import { supabase } from "./supabase";

export const getBookings = async () => {
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from("bookings")
    .select(`*, customers(name,email,phone), packages(title,category,state,price)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getBookings", error);
    return [];
  }
  return data;
};

export const getBookingById = async (id) => {
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase
    .from("bookings")
    .select(`*, customers(name,email,phone), packages(title,category,state,price)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error("getBookingById", error);
    return null;
  }
  return data;
};

export const createBooking = async (bookingData) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("bookings").insert(bookingData);
};

export const updateBookingStatus = async (id, status) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("bookings").update({ status }).eq("id", id);
};

export const deleteBooking = async (id) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("bookings").delete().eq("id", id);
};
