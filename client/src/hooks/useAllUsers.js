import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useAllUsers = (roleFilter = null) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = supabase
      .from('profiles')
      .select('id, name, phone, role, country, is_active, created_at')
      .order('created_at', { ascending: false });

    if (roleFilter) query = query.eq('role', roleFilter);

    query.then(({ data, error }) => {
      if (!error) setUsers(data ?? []);
      setLoading(false);
    });
  }, [roleFilter]);

  const updateRole = async (userId, newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);
    if (!error) setUsers(prev =>
      prev.map(u => u.id === userId ? { ...u, role: newRole } : u)
    );
    return { error };
  };

  return { users, loading, updateRole };
};
