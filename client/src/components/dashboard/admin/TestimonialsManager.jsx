import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import LoadingSpinner from '../../common/LoadingSpinner';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*, student:profiles!student_id(name, avatar_url)')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setTestimonials(data ?? []); setLoading(false); });
  }, []);

  const handleApprove = async (id) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_approved: true })
      .eq('id', id);
    if (!error) setTestimonials(prev =>
      prev.map(t => t.id === id ? { ...t, is_approved: true } : t)
    );
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    if (!error) setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <h2 className="text-lg font-bold text-white mb-4">الشهادات ({testimonials.length})</h2>
      {testimonials.length === 0 ? (
        <p className="text-gray-400 text-center">لا توجد شهادات بعد</p>
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map(t => (
            <div key={t.id} className="bg-dark rounded-xl p-4 border border-purple/20">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.student?.avatar_url ?? '/assets/main.png'}
                    className="w-10 h-10 rounded-full object-cover border border-purple/40"
                    alt={t.student?.name}
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.student?.name ?? '—'}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(t.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!t.is_approved && (
                    <button
                      onClick={() => handleApprove(t.id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-lg"
                    >
                      موافقة
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs px-3 py-1 rounded-lg"
                  >
                    حذف
                  </button>
                </div>
              </div>
              {t.is_approved && (
                <span className="inline-block mt-2 text-green-400 text-xs">✓ تمت الموافقة</span>
              )}
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">{t.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TestimonialsManager;
