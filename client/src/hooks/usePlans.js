import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from('plans')
      .select('*')
      .eq('is_active', true)
      .order('category')
      .order('duration_minutes')
      .order('sessions_per_month')
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setPlans(data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || 'Network error');
        setLoading(false);
      });
  }, []);

  const grouped = {
    monthly30:   plans.filter(p => p.category === 'monthly'    && p.duration_minutes === 30),
    monthly60:   plans.filter(p => p.category === 'monthly'    && p.duration_minutes === 60),
    quarterly30: plans.filter(p => p.category === 'quarterly'  && p.duration_minutes === 30),
    quarterly60: plans.filter(p => p.category === 'quarterly'  && p.duration_minutes === 60),
  };

  return { plans, grouped, loading, error };
};
