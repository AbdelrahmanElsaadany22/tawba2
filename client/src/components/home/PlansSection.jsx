import { useState } from 'react';
import { usePlans } from '../../hooks/usePlans';
import { useCheckout } from '../../hooks/useCheckout';
import PlanCard from '../plans/PlanCard';
import PlanCategoryBtn from '../plans/PlanCategoryBtn';
import PlanTabs from '../plans/PlanTabs';
import LoadingSpinner from '../common/LoadingSpinner';

const PlansSection = () => {
  const { grouped, loading, error } = usePlans();
  const [category, setCategory] = useState('quarterly');
  const [duration, setDuration] = useState(30);
  const { startCheckout } = useCheckout();

  const currentPlans = grouped[`${category}${duration}`] ?? [];
  const categoryLabel = category === 'quarterly' ? '3 شهور' : 'شهري';
  const isQuarterly = category === 'quarterly';

  const handleSubscribe = (planId) => {
    startCheckout(planId);
  };

  if (loading) return <LoadingSpinner text="جاري تحميل الباقات..." />;
  if (error) return <p className="text-center text-red-400 font-arabic py-20">حدث خطأ في تحميل الباقات</p>;

  return (
    <section id="plans" className="py-20 bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-4">
          <div className="text-gold font-arabic text-xl mb-2 reveal">باقاتنا</div>
          <h2 className="text-4xl font-bold text-white font-arabic mb-4 reveal reveal-delay-1">
            اختر <span className="text-gold">خطتك</span> الآن
          </h2>
          <p className="text-gray-300 font-arabic reveal reveal-delay-2">
            🎓 باقات مناسبة لجميع الأعمار، مع جداول مرنة تناسب وقتك.
          </p>
          <p className="text-gray-300 font-arabic reveal reveal-delay-2 mt-2">
            🎉 خصومات حصرية كبيرة بمناسبة مرور 5 سنوات على تأسيس الأكاديمية على باقات الثلاثة أشهر.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6 reveal">
          <PlanCategoryBtn
            label="باقات 3 شهور"
            active={category === 'quarterly'}
            onClick={() => setCategory('quarterly')}
          />
          <PlanCategoryBtn
            label="الباقات الشهرية"
            active={category === 'monthly'}
            onClick={() => setCategory('monthly')}
          />
        </div>

        <div className="reveal">
          <PlanTabs
            tabs={[
              { label: `⭐ ${duration === 30 ? 30 : 60} دقيقة — ${categoryLabel}`, value: 30 },
              { label: `⭐ ${duration === 30 ? 60 : 30} دقيقة — ${categoryLabel}`, value: 60 },
            ]}
            activeTab={duration}
            onTabChange={setDuration}
          />
        </div>

        {isQuarterly && (
          <div className="three-months-banner reveal">
            <div className="icon text-4xl flex-shrink-0">🌟</div>
            <p className="font-arabic text-gray-200">
              <strong>باقات الـ 3 شهور</strong> — وفّر أكثر واحجز مكانك مقدمًا. كلما زادت مدة الاشتراك، زاد التوفير والمميزات!
            </p>
          </div>
        )}

        {!isQuarterly && duration === 60 && (
          <p className="text-center text-gold text-sm mb-6 font-arabic reveal">
            💰 السعر الرسمي للحصة: 27 ريال
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPlans.map((plan, i) => (
            <div key={plan.id} className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i, 3)}` : ''}`}>
              <PlanCard plan={plan} onSubscribe={handleSubscribe} />
            </div>
          ))}
        </div>

        {isQuarterly && (
          <div className="benefits-box reveal">
            <div className="benefits-title text-gold font-bold text-lg mb-4 font-arabic">📌 مميزات الاشتراك الممتد في باقات الـ 3 شهور</div>
            <ul className="benefits-list font-arabic text-gray-400 space-y-3">
              <li className="pr-6 relative before:content-['✓'] before:absolute before:right-0 before:text-gold">تثبيت نفس المعلم ونفس المواعيد طوال مدة الاشتراك</li>
              <li className="pr-6 relative before:content-['✓'] before:absolute before:right-0 before:text-gold">متابعة مستمرة وخطة واضحة للحفظ والمراجعة</li>
              <li className="pr-6 relative before:content-['✓'] before:absolute before:right-0 before:text-gold">تقارير دورية لمستوى الطالب وتطوره</li>
              <li className="pr-6 relative before:content-['✓'] before:absolute before:right-0 before:text-gold">توفير أكبر مقارنة بالباقات الشهرية</li>
              <li className="pr-6 relative before:content-['✓'] before:absolute before:right-0 before:text-gold">أولوية في اختيار المواعيد المناسبة</li>
              <li className="pr-6 relative before:content-['✓'] before:absolute before:right-0 before:text-gold text-yellow-400">⏳ المقاعد المتاحة في الباقات الممتدة محدودة — احجز مكانك الآن!</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlansSection;
