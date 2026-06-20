import { supabase, isSupabaseEnabled } from './supabase';
import { apiRequest, isBackendEnabled } from './backendApi';

const LOCAL_KEY = 'southTrailsReviews';

export const getReviews = async ({ packageId, customerId } = {}) => {
  if (isBackendEnabled) {
    try {
      return await apiRequest('/reviews', { params: { packageId, customerId } });
    } catch (error) {
      console.error('getReviews', error);
      return [];
    }
  }

  if (!isSupabaseEnabled) {
    const local = JSON.parse(window.localStorage.getItem(LOCAL_KEY) || '[]');
    let results = local;
    if (packageId) results = results.filter((r) => r.packageId === packageId);
    if (customerId) results = results.filter((r) => r.customerId === customerId);
    return results;
  }

  let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
  if (packageId) query = query.eq('package_id', packageId);
  if (customerId) query = query.eq('customer_id', customerId);

  const { data, error } = await query;
  if (error) {
    console.error('getReviews', error);
    return [];
  }
  return data;
};

export const createReview = async (review) => {
  if (isBackendEnabled) {
    const payload = {
      customer_id: review.customer_id || review.customerId || null,
      package_id: review.packageId || review.package_id || null,
      rating: Number(review.rating),
      text: review.text || review.comment || '',
    };
    try {
      const data = await apiRequest('/reviews', { method: 'POST', body: payload });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

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
