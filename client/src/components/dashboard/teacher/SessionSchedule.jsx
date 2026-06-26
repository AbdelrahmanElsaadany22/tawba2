import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import LoadingSpinner from '../../common/LoadingSpinner';

const statusAr = { scheduled: 'مجدولة', completed: 'مكتملة', cancelled: 'ملغاة', 'no-show': 'لم يحضر' };
const statusColor = { scheduled: 'text-blue-400', completed: 'text-green-400', cancelled: 'text-red-400', 'no-show': 'text-gray-400' };

const SessionSchedule = ({ teacherId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teacherId) return;
    supabase
      .from('sessions')
      .select('*, student:profiles!student_id(name)')
      .eq('teacher_id', teacherId)
      .gte('scheduled_at', new Date().toISOString())
      .order('scheduled_at')
      .limit(10)
      .then(({ data }) => { setSessions(data ?? []); setLoading(false); });
  }, [teacherId]);

  const updateStatus = async (sessionId, newStatus) => {
    const { error } = await supabase
      .from('sessions')
      .update({ status: newStatus })
      .eq('id', sessionId);
    if (!error) setSessions(prev =>
      prev.map(s => s.id === sessionId ? { ...s, status: newStatus } : s)
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <h2 className="text-lg font-bold text-white mb-4">الحصص القادمة</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-400 text-center">لا توجد حصص مجدولة</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map(s => (
            <div key={s.id} className="bg-dark rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <p className="text-white font-semibold">{s.student?.name}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(s.scheduled_at).toLocaleString('ar-SA')} — {s.duration_minutes} دقيقة
                </p>
                {s.meeting_link && (
                  <a href={s.meeting_link} target="_blank" rel="noreferrer" className="text-blue-400 text-xs hover:underline">
                    رابط الاجتماع
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${statusColor[s.status]}`}>{statusAr[s.status]}</span>
                {s.status === 'scheduled' && (
                  <button
                    onClick={() => updateStatus(s.id, 'completed')}
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg"
                  >
                    تم الإنهاء
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SessionSchedule;
