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

const TestimonialsSection = () => {
  const { testimonials, loading, error } = useTestimonials({ approvedOnly: true });

  if (loading) return <LoadingSpinner text="جاري تحميل الشهادات..." />;
  if (error || !testimonials.length) return null; // Don't render section if empty

  return (
    <section id="testimonials" className="py-20 bg-dark-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-gold font-arabic text-xl mb-2">آراء طلابنا</div>
          <h2 className="text-4xl font-bold text-white font-arabic">
            ماذا يقول <span className="text-gold">طلابنا</span> عنا؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => <TestimonialCard key={t.id} t={t} />)}
        </div>

        {/* WhatsApp CTA */}
        <div className="text-center mt-12">
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
