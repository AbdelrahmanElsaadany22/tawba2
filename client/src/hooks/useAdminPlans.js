import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useAdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('plans')
      .select('*')
      .order('category')
      .order('duration_minutes')
      .order('sessions_per_month')
      .then(({ data, error }) => {
        if (!error) setPlans(data ?? []);
        setLoading(false);
      });
  }, []);

  return { plans, loading };
};
