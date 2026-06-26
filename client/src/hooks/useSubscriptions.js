import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import useAuthStore from '../store/authStore';

export const useSubscriptions = () => {
  const session = useAuthStore(s => s.session);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;

    supabase
      .from('subscriptions')
      .select(`
        *,
        plans(category, duration_minutes, sessions_per_month, discounted_price),
        teacher:profiles!teacher_id(id, name, avatar_url, phone)
      `)
      .eq('student_id', session.user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setSubscriptions(data ?? []);
        setLoading(false);
      });
  }, [session]);

  const active = subscriptions.find(s => s.status === 'active') ?? null;
  return { subscriptions, active, loading };
};
