import { supabase } from "./supabase";

export const apiFetch = async (table, { select = "*", filter = {}, order = {}, single = false } = {}) => {
  if (!supabase) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  let query = supabase.from(table).select(select);

  Object.entries(filter).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    query = query.eq(key, value);
  });

  if (order.column) {
    query = query.order(order.column, { ascending: order.ascending ?? true });
  }

  query = single ? query.single() : query;
  const { data, error } = await query;
  if (error) throw error;
  return data;
};
