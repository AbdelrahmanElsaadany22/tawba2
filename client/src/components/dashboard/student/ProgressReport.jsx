import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import LoadingSpinner from '../../common/LoadingSpinner';

const levelLabel = { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' };

const ProgressReport = ({ studentId }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;
    supabase
      .from('progress_reports')
      .select('*, teacher:profiles!teacher_id(name)')
      .eq('student_id', studentId)
      .order('report_date', { ascending: false })
      .limit(5)
      .then(({ data }) => { setReports(data ?? []); setLoading(false); });
  }, [studentId]);

  if (loading) return <LoadingSpinner text="جاري تحميل التقارير..." />;
  if (!reports.length) return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 text-center font-arabic">
      <p className="text-gray-400">لا توجد تقارير تقدم بعد</p>
    </div>
  );

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <h2 className="text-lg font-bold text-white mb-4">تقارير التقدم</h2>
      <div className="flex flex-col gap-3">
        {reports.map(r => (
          <div key={r.id} className="bg-dark rounded-xl p-4 border border-purple/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gold text-sm">{new Date(r.report_date).toLocaleDateString('ar-SA')}</span>
              <span className="text-xs bg-purple/20 text-purple-light px-2 py-1 rounded-full">
                {levelLabel[r.tajweed_level] ?? '—'}
              </span>
            </div>
            {r.hifz_progress && <p className="text-gray-300 text-sm mb-1">📖 {r.hifz_progress}</p>}
            {r.notes && <p className="text-gray-400 text-sm mb-1">📝 {r.notes}</p>}
            {r.next_goals && <p className="text-green-400 text-sm">🎯 {r.next_goals}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProgressReport;
