
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WaitlistUser {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  whatsapp: string | null;
}

export const useWaitlistUsers = () => {
  const [users, setUsers] = useState<WaitlistUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWaitlistUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching waitlist users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlistUsers();
  }, []);

  return { users, loading, error, refetch: fetchWaitlistUsers };
};
