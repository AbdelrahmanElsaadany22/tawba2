const HowItWorksSection = () => (
  <section id="howto" className="py-20 bg-dark">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="text-gold font-arabic text-xl mb-2 reveal">خطواتك</div>
        <h2 className="text-4xl font-bold text-white font-arabic mb-4 reveal reveal-delay-1">
          كيف <span className="text-gold">تبدأ</span> رحلتك؟
        </h2>
        <p className="text-gray-300 font-arabic reveal reveal-delay-2">
          أربع خطوات بسيطة تفصلك عن أول جلسة مع معلمك القرآني
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="step-item text-center reveal">
          <div className="step-num w-12 h-12 rounded-full bg-purple/20 border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mx-auto mb-4">١</div>
          <div className="step-title text-white font-bold text-lg mb-2 font-arabic">اختر باقتك</div>
          <p className="step-desc text-gray-400 text-sm font-arabic">تصفّح الباقات الشهرية أو الممتدة واختر ما يناسب وقتك وميزانيتك</p>
        </div>

        <div className="step-item text-center reveal reveal-delay-1">
          <div className="step-num w-12 h-12 rounded-full bg-purple/20 border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mx-auto mb-4">٢</div>
          <div className="step-title text-white font-bold text-lg mb-2 font-arabic">حجز وتسجيل</div>
          <p className="step-desc text-gray-400 text-sm font-arabic">أكمل بيانات التسجيل وحدّد مواعيدك المفضلة ومستواك الحالي</p>
        </div>

        <div className="step-item text-center reveal reveal-delay-2">
          <div className="step-num w-12 h-12 rounded-full bg-purple/20 border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mx-auto mb-4">٣</div>
          <div className="step-title text-white font-bold text-lg mb-2 font-arabic">نختار معلمك</div>
          <p className="step-desc text-gray-400 text-sm font-arabic">نختار لك أنسب معلم بناءً على مستواك وتفضيلاتك وجدولك الزمني</p>
        </div>

        <div className="step-item text-center reveal reveal-delay-3">
          <div className="step-num w-12 h-12 rounded-full bg-purple/20 border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mx-auto mb-4">٤</div>
          <div className="step-title text-white font-bold text-lg mb-2 font-arabic">ابدأ التعلّم</div>
          <p className="step-desc text-gray-400 text-sm font-arabic">ادخل جلستك الأولى وانطلق في رحلتك مع كلام الله — بإذن الله يكون خير</p>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
