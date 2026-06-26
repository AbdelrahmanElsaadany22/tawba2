import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useTestimonials = ({ approvedOnly = true } = {}) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let query = supabase
      .from('testimonials')
      .select('id, author_name, author_city, author_role, avatar_url, content, rating, is_approved, created_at')
      .order('created_at', { ascending: false });

    if (approvedOnly) query = query.eq('is_approved', true);

    query
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setTestimonials(data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || 'Network error');
        setLoading(false);
      });
  }, [approvedOnly]);

  const submitTestimonial = async ({ authorName, authorCity, authorRole, content, rating }) => {
    const { error: err } = await supabase.from('testimonials').insert({
      author_name: authorName,
      author_city: authorCity,
      author_role: authorRole,
      content,
      rating,
      is_approved: false,
    });
    return { error: err };
  };

  const approveTestimonial = async (id) => {
    const { error: err } = await supabase
      .from('testimonials')
      .update({ is_approved: true })
      .eq('id', id);
    if (!err) setTestimonials(prev =>
      prev.map(t => t.id === id ? { ...t, is_approved: true } : t)
    );
    return { error: err };
  };

  const deleteTestimonial = async (id) => {
    const { error: err } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    if (!err) setTestimonials(prev => prev.filter(t => t.id !== id));
    return { error: err };
  };

  return { testimonials, loading, error, submitTestimonial, approveTestimonial, deleteTestimonial };
};
