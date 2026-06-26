import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import useAuthStore from '../store/authStore';

export const useAuth = () => {
  const { session, profile, loading, setProfile } = useAuthStore();

  useEffect(() => {
    if (!session?.user || profile) return;

    supabase
      .from('profiles')
      .select('id, name, phone, role, avatar_url, country')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProfile(data);
      });
  }, [session, profile, setProfile]);

  return {
    user:        session?.user ?? null,
    profile,
    role:        profile?.role ?? null,
    isLoggedIn:  !!session,
    isStudent:   profile?.role === 'student',
    isTeacher:   profile?.role === 'teacher',
    isAdmin:     profile?.role === 'admin',
    loading,
  };
};
