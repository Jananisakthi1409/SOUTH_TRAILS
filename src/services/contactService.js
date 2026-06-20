import { supabase, isSupabaseEnabled } from './supabase';
import { apiRequest, isBackendEnabled } from './backendApi';

const LOCAL_KEY = 'southTrailsContacts';

export const createContactRequest = async (req) => {
  if (isBackendEnabled) {
    const payload = {
      name: req.name || null,
      email: req.email || null,
      phone: req.phone || null,
      package_id: req.packageId || req.package_id || null,
      message: req.message || req.note || null,
    };
    try {
      const data = await apiRequest('/contact-requests', { method: 'POST', body: payload });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  if (!isSupabaseEnabled) {
    const local = JSON.parse(window.localStorage.getItem(LOCAL_KEY) || '[]');
    const record = { id: `CR-${Date.now()}`, ...req, created_at: new Date().toISOString() };
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify([record, ...local]));
    return { data: record, error: null };
  }

  const payload = {
    name: req.name || null,
    email: req.email || null,
    phone: req.phone || null,
    package_id: req.packageId || req.package_id || null,
    message: req.message || req.note || null,
  };

  const { data, error } = await supabase.from('contact_requests').insert(payload).select();
  return { data, error };
};
