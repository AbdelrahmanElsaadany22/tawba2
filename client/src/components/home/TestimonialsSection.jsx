import { useTestimonials } from '../../hooks/useTestimonials';
import LoadingSpinner from '../common/LoadingSpinner';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-gold' : 'text-gray-600'}>★</span>
    ))}
  </div>
);

const TestimonialCard = ({ t }) => (
  <div className="testimonial-card bg-dark-light border border-purple/20 rounded-2xl p-6 font-arabic flex flex-col gap-4 reveal">
    <div className="flex items-center gap-3">
      <img
        src={t.avatar_url ?? '/assets/main.png'}
        alt={t.author_name}
        className="w-12 h-12 rounded-full object-cover border-2 border-gold"
      />
      <div>
        <p className="text-white font-bold">{t.author_name}</p>
        <p className="text-gray-400 text-xs">{t.author_city} — {t.author_role}</p>
      </div>
    </div>
    <StarRating rating={t.rating} />
    <p className="text-gray-300 text-sm leading-relaxed">"{t.content}"</p>
  </div>
);

const DEFAULT_TESTIMONIALS = [
  { id: '1', author_name: 'أحمد محمد', author_city: 'الرياض', author_role: 'طالب', content: 'الحمد لله منذ انضمامي لأكاديمية توبة وأنا أشعر بتقدم كبير في حفظي للقرآن. المعلمون مخلصون والمنهج واضح.', rating: 5 },
  { id: '2', author_name: 'سارة عبدالله', author_city: 'جدة', author_role: 'طالبة', content: 'الأكاديمية متميزة جداً في تعليم التجويد. استفدت كثيراً من جلسات التصحيح.', rating: 5 },
  { id: '3', author_name: 'محمد علي', author_city: 'مكة', author_role: 'طالب', content: 'ما يعجبني في توبة هو المرونة في المواعيد. أقدر أحجز الجلسات حسب وقتي.', rating: 4 },
  { id: '4', author_name: 'نورة أحمد', author_city: 'الدمام', author_role: 'طالبة', content: 'بعد 3 شهور مع توبة، صار عندي ختمة كاملة مع التدبر. أنصح الجميع بالتسجيل.', rating: 5 },
];

const TestimonialsSection = () => {
  const { testimonials, loading, error } = useTestimonials({ approvedOnly: true });
  const items = (testimonials.length ? testimonials : DEFAULT_TESTIMONIALS).slice(0, 3);

  if (loading) return <LoadingSpinner text="جاري تحميل الشهادات..." />;

  return (
    <section id="testimonials" className="py-20 bg-dark-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-gold font-arabic text-xl mb-2 reveal">آراء طلابنا</div>
          <h2 className="text-4xl font-bold text-white font-arabic reveal reveal-delay-1">
            ماذا يقول <span className="text-gold">طلابنا</span> عنا؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={t.id} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 3)}` : ''}`}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal reveal-delay-2">
          <a
            href="https://wa.me/201118341567"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl font-arabic transition-colors"
          >
            <i className="fab fa-whatsapp text-2xl" />
            تواصل معنا الآن على الواتساب
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
