import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useAdminStats = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    activeSubscriptions: 0,
    pendingTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [students, teachers, activeSubs, pendingTesti] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'teacher'),
        supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('is_approved', false),
      ]);

      setStats({
        totalStudents: students.count ?? 0,
        totalTeachers: teachers.count ?? 0,
        activeSubscriptions: activeSubs.count ?? 0,
        pendingTestimonials: pendingTesti.count ?? 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
