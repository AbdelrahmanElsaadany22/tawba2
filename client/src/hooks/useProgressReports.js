import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// For teachers: create a report for a student
export const useProgressReports = ({ studentId = null, teacherId = null } = {}) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId && !teacherId) { setLoading(false); return; }

    let query = supabase
      .from('progress_reports')
      .select('*, teacher:profiles!teacher_id(name), student:profiles!student_id(name)')
      .order('report_date', { ascending: false });

    if (studentId) query = query.eq('student_id', studentId);
    if (teacherId) query = query.eq('teacher_id', teacherId);

    query
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setReports(data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || 'Network error');
        setLoading(false);
      });
  }, [studentId, teacherId]);

  const createReport = async ({ studentId: sId, subscriptionId, tajweedLevel, hifzProgress, notes, nextGoals }) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { error: 'Not authenticated' };

    const { data, error: err } = await supabase.from('progress_reports').insert({
      student_id:      sId,
      teacher_id:      session.user.id,
      subscription_id: subscriptionId,
      tajweed_level:   tajweedLevel,
      hifz_progress:   hifzProgress,
      notes,
      next_goals:      nextGoals,
    }).select().single();

    if (!err) setReports(prev => [data, ...prev]);
    return { data, error: err };
  };

  return { reports, loading, error, createReport };
};
