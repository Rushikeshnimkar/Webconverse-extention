import { supabase } from './supabase';

export const authService = {
  signUp: async (data) => {
    const { user, error } = await supabase.auth.signUp(data);
    if (error) throw error;
    return user;
  },

  login: async (email, password) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    return user;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  },
};