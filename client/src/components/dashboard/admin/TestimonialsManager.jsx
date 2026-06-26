import { useTestimonials } from '../../../hooks/useTestimonials';
import LoadingSpinner from '../../common/LoadingSpinner';

const TestimonialsManager = () => {
  const { testimonials, loading, approveTestimonial, deleteTestimonial } = useTestimonials({ approvedOnly: false });

  if (loading) return <LoadingSpinner />;

  const pending  = testimonials.filter(t => !t.is_approved);
  const approved = testimonials.filter(t => t.is_approved);

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <h2 className="text-lg font-bold text-white mb-6">
        إدارة الشهادات — ({pending.length} بانتظار الموافقة)
      </h2>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h3 className="text-yellow-400 font-semibold mb-3">⏳ بانتظار الموافقة</h3>
          <div className="flex flex-col gap-3">
            {pending.map(t => (
              <TestimonialRow
                key={t.id}
                t={t}
                onApprove={() => approveTestimonial(t.id)}
                onDelete={() => deleteTestimonial(t.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      <div>
        <h3 className="text-green-400 font-semibold mb-3">✅ المنشورة ({approved.length})</h3>
        {approved.length === 0 ? (
          <p className="text-gray-400 text-center py-4">لا توجد شهادات منشورة بعد</p>
        ) : (
          <div className="flex flex-col gap-3">
            {approved.map(t => (
              <TestimonialRow
                key={t.id}
                t={t}
                onDelete={() => deleteTestimonial(t.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const TestimonialRow = ({ t, onApprove, onDelete }) => (
  <div className="bg-dark rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
    <div className="flex-1">
      <p className="text-white font-semibold">{t.author_name}
        <span className="text-gray-400 text-xs font-normal mr-2">{t.author_city} — {t.author_role}</span>
      </p>
      <p className="text-gray-400 text-sm mt-1 line-clamp-2">"{t.content}"</p>
      <p className="text-gold text-xs mt-1">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</p>
    </div>
    <div className="flex gap-2 shrink-0">
      {onApprove && (
        <button
          onClick={onApprove}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
        >
          موافقة
        </button>
      )}
      <button
        onClick={onDelete}
        className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
      >
        حذف
      </button>
    </div>
  </div>
);

export default TestimonialsManager;
