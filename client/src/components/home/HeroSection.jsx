import { useCountUp } from '../../hooks/useScrollReveal';

const StatItem = ({ target, label }) => {
  const ref = useCountUp(target);
  return (
    <div className="stat-item text-center">
      <div ref={ref} className="stat-num text-4xl font-bold text-gold font-arabic">0</div>
      <div className="stat-label text-sm text-gray-300 mt-1 font-arabic">{label}</div>
    </div>
  );
};

const HeroSection = () => (
  <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-dark relative overflow-hidden pt-20">
    <svg className="hero-arch absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 300" fill="none">
      <path d="M50 300 L50 150 Q50 20 300 20 Q550 20 550 150 L550 300" stroke="#C9A84C" strokeWidth="2" fill="none"/>
      <path d="M100 300 L100 160 Q100 70 300 70 Q500 70 500 160 L500 300" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4"/>
      <rect x="275" y="40" width="50" height="50" transform="rotate(45 300 65)" fill="#7B5EA7" opacity="0.6"/>
    </svg>

    <div className="hero-content text-center z-10 px-6 max-w-3xl">
      <div className="hero-badge inline-flex items-center gap-2 bg-purple/20 border border-purple/40 px-4 py-2 rounded-full text-gold text-sm font-arabic mb-6">
        تَعَلَّمُ الْقُرْآنَ كَمَا أُنْزِلَ بِهِ جِبْرِيلُ عَلَيْهِ السَّلَامُ
      </div>
      <h1 className="mb-8">
        <img src="/assets/main.png" alt="توبة" className="h-24 mx-auto" />
      </h1>
      <p className="text-2xl text-gold font-arabic font-bold mb-4">أكـاديميـة توبة لتعليم القرآن والعلوم الشرعية</p>
      <p className="text-gray-300 font-arabic mb-8">
        رحلتك مع كلام الله تبدأ هنا — معلمون متخصصون، جلسات مرنة، ومنهج واضح يوصلك لهدفك بإذن الله
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/#plans" className="bg-gold text-dark font-bold px-8 py-3 rounded-xl font-arabic hover:bg-gold-light transition-colors">
          🌟 اختر خطتك الآن
        </a>
        <a href="/#why" className="border border-gold text-gold px-8 py-3 rounded-xl font-arabic hover:bg-gold/10 transition-colors">
          تعرف علينا أكثر
        </a>
      </div>
    </div>

    <div className="stats-bar grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 px-8 z-10">
      <StatItem target={5256} label="طالب ومشترك سابق" />
      <StatItem target={443}  label="معلم متخصص حالياً" />
      <StatItem target={98}   label="% رضا الطلاب" />
      <StatItem target={5}    label="سنوات من العطاء" />
    </div>

    <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-sm font-arabic">
      <div className="w-0.5 h-10 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      اكتشف
    </div>
  </section>
);

export default HeroSection;
