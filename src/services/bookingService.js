import { supabase } from "./supabase";
import { apiRequest, isBackendEnabled } from "./backendApi";

const normalizeBooking = (booking) => {
  if (!booking) return booking;
  let snapshot = booking.package_snapshot || booking.packageSnapshot;
  if (typeof snapshot === "string") {
    try {
      snapshot = JSON.parse(snapshot || "{}");
    } catch {
      snapshot = {};
    }
  }
  return {
    ...booking,
    package_snapshot: snapshot,
    packageSnapshot: snapshot,
    packageName: booking.packageName || snapshot?.title || booking.package?.title,
    travelDate: booking.travelDate || booking.travel_date,
    totalAmount: booking.totalAmount || booking.total_amount,
    customerId: booking.customerId || booking.customer_id,
    packageId: booking.packageId || booking.package_id,
    specialRequest: booking.specialRequest || booking.special_request,
  };
};

const toBackendBooking = (bookingData) => {
  const snapshot = bookingData.package_snapshot || bookingData.packageSnapshot;
  return {
    id: bookingData.id,
    customer_id: bookingData.customer_id || bookingData.customerId || null,
    package_id: bookingData.package_id || bookingData.packageId || null,
    package_snapshot: snapshot && typeof snapshot !== "string" ? JSON.stringify(snapshot) : snapshot,
    travel_date: bookingData.travel_date || bookingData.travelDate || null,
    travelers: Number(bookingData.travelers || 1),
    status: bookingData.status || "Pending",
    total_amount: bookingData.total_amount || bookingData.totalAmount || null,
    special_request: bookingData.special_request || bookingData.specialRequest || null,
  };
};

export const getBookings = async () => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest("/bookings");
      return data.map(normalizeBooking);
    } catch (error) {
      console.error("getBookings", error);
      return [];
    }
  }

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
  if (isBackendEnabled) {
    try {
      return normalizeBooking(await apiRequest(`/bookings/${id}`));
    } catch (error) {
      console.error("getBookingById", error);
      return null;
    }
  }

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

export const getBookingsByCustomer = async (customerId) => {
  if (isBackendEnabled) {
    if (!customerId) return [];
    try {
      const data = await apiRequest(`/bookings/customer/${customerId}`);
      return data.map(normalizeBooking);
    } catch (error) {
      console.error("getBookingsByCustomer", error);
      return [];
    }
  }

  if (!supabase || !customerId) {
    return [];
  }
  const { data, error } = await supabase
    .from("bookings")
    .select(`*, customers(name,email,phone), packages(title,category,state,price)`)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getBookingsByCustomer", error);
    return [];
  }
  return data;
};

export const createBooking = async (bookingData) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest("/bookings", { method: "POST", body: toBackendBooking(bookingData) });
      return { data: normalizeBooking(data), error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("bookings").insert(bookingData);
};

export const updateBookingStatus = async (id, status) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest(`/bookings/${id}/status`, { method: "PATCH", body: { status } });
      return { data: normalizeBooking(data), error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("bookings").update({ status }).eq("id", id);
};

export const deleteBooking = async (id) => {
  if (isBackendEnabled) {
    try {
      const data = await apiRequest(`/bookings/${id}`, { method: "DELETE" });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } };
  }
  return supabase.from("bookings").delete().eq("id", id);
};
