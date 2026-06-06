import { supabase, isSupabaseEnabled } from './supabase';

const LOCAL_KEY = 'southTrailsReviews';

export const getReviews = async (packageId) => {
  if (!isSupabaseEnabled) {
    const local = JSON.parse(window.localStorage.getItem(LOCAL_KEY) || '[]');
    return packageId ? local.filter(r => r.packageId === packageId) : local;
  }

  let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
  if (packageId) query = query.eq('package_id', packageId);
  const { data, error } = await query;
  if (error) {
    console.error('getReviews', error);
    return [];
  }
  return data;
};

export const createReview = async (review) => {
  if (!isSupabaseEnabled) {
    const local = JSON.parse(window.localStorage.getItem(LOCAL_KEY) || '[]');
    const r = { id: `RV-${Date.now()}`, ...review, created_at: new Date().toISOString() };
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify([r, ...local]));
    return { data: r, error: null };
  }

  const payload = {
    customer_id: review.customer_id || null,
    package_id: review.packageId || review.package_id || null,
    rating: Number(review.rating),
    text: review.text || review.comment || '',
  };

  const { data, error } = await supabase.from('reviews').insert(payload).select();
  return { data, error };
};
