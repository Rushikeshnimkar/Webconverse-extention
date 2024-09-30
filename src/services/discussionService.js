import { supabase } from './supabase';

export const discussionService = {
  getDiscussions: async (website) => {
    const { data, error } = await supabase
      .from('discussions')
      .select('*')
      .eq('website', website)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  addMessage: async (content, website, userId) => {
    const { data, error } = await supabase
      .from('discussions')
      .insert({ content, website, user_id: userId });
    if (error) throw error;
    return data[0];
  },

  deleteMessage: async (messageId) => {
    const { error } = await supabase
      .from('discussions')
      .delete()
      .eq('id', messageId);
    if (error) throw error;
  },
};