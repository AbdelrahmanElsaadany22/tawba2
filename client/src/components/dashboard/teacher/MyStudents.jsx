import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import LoadingSpinner from '../../common/LoadingSpinner';

const MyStudents = ({ teacherId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teacherId) return;
    supabase
      .from('subscriptions')
      .select('id, sessions_remaining, status, student:profiles!student_id(id, name, phone, avatar_url)')
      .eq('teacher_id', teacherId)
      .eq('status', 'active')
      .then(({ data }) => { setStudents(data ?? []); setLoading(false); });
  }, [teacherId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <h2 className="text-lg font-bold text-white mb-4">طلابي ({students.length})</h2>
      {students.length === 0 ? (
        <p className="text-gray-400 text-center">لم يُعيَّن لك طلاب بعد</p>
      ) : (
        <div className="flex flex-col gap-3">
          {students.map(sub => (
            <div key={sub.id} className="flex items-center justify-between bg-dark rounded-xl p-3">
              <div className="flex items-center gap-3">
                <img
                  src={sub.student?.avatar_url ?? '/assets/main.png'}
                  className="w-10 h-10 rounded-full object-cover border border-purple/40"
                  alt={sub.student?.name}
                />
                <div>
                  <p className="text-white font-semibold">{sub.student?.name}</p>
                  <p className="text-gray-400 text-xs">متبقٍ: {sub.sessions_remaining} حصة</p>
                </div>
              </div>
              {sub.student?.phone && (
                <a
                  href={`https://wa.me/${sub.student.phone.replace(/\D/g, '')}`}
                  target="_blank" rel="noreferrer"
                  className="text-green-400 hover:text-green-300 text-xl"
                >
                  <i className="fab fa-whatsapp" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyStudents;
