import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export function useDiscussionData(website) {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const { data, error } = await supabase
          .from('discussions')
          .select('*')
          .eq('website', website)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDiscussions(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (website) {
      fetchDiscussions();
    }
  }, [website]);

  return { discussions, loading, error };
}