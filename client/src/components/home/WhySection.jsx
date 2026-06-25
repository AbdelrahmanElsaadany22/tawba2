const WhySection = () => (
  <section id="why" className="py-20 bg-dark">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="section-label text-gold font-arabic text-xl mb-2 reveal" style={{ fontSize: '1.5rem' }}>لماذا توبة؟</div>
        <h2 className="text-4xl font-bold text-white font-arabic mb-4 reveal reveal-delay-1">
          لتنل <span className="text-gold">صحبة</span> القرآن <span className="text-gold">الكريم</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-arabic reveal reveal-delay-2">
          قال رسول الله يأتي القرآن لصاحبه يوم القيامة فيقول:
          <br />
          «أنا صاحبُك القرآنُ، الذي أظمأتُك في الهواجر، وأسهرتُ ليلَك»
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="feature-card bg-dark-light border border-purple/20 rounded-2xl p-8 text-center reveal">
          <div className="feature-icon text-4xl mb-4 text-purple"><i className="fa-solid fa-book-quran" /></div>
          <div className="feature-title text-white font-bold text-lg mb-3 font-arabic">منهج قرآني متكامل</div>
          <p className="feature-desc text-gray-400 font-arabic text-sm">من الحفظ إلى التجويد إلى العلوم الشرعية — رحلة تعليمية شاملة ومنظمة لكل مستوى</p>
        </div>

        <div className="feature-card bg-dark-light border border-purple/20 rounded-2xl p-8 text-center reveal reveal-delay-1">
          <div className="feature-icon text-4xl mb-4 text-purple"><i className="fa-solid fa-bullseye" /></div>
          <div className="feature-title text-white font-bold text-lg mb-3 font-arabic">معلمون متخصصون</div>
          <p className="feature-desc text-gray-400 font-arabic text-sm">أكثر من 5000 معلمًا ومعلمة مؤهلين، يمتلكون إجازات في القرآن الكريم وخبرة في التعليم عن بُعد</p>
        </div>

        <div className="feature-card bg-dark-light border border-purple/20 rounded-2xl p-8 text-center reveal reveal-delay-2">
          <div className="feature-icon text-4xl mb-4 text-purple"><i className="fa-solid fa-clock" /></div>
          <div className="feature-title text-white font-bold text-lg mb-3 font-arabic">مواعيد مرنة تناسبك</div>
          <p className="feature-desc text-gray-400 font-arabic text-sm">اختر توقيتك المناسب — صباحًا أو مساءً، 30 دقيقة أو ساعة كاملة — التعليم على راحتك</p>
        </div>

        <div className="feature-card bg-dark-light border border-purple/20 rounded-2xl p-8 text-center reveal">
          <div className="feature-icon text-4xl mb-4 text-purple"><i className="fa-solid fa-chart-line" /></div>
          <div className="feature-title text-white font-bold text-lg mb-3 font-arabic">تقارير متابعة دورية</div>
          <p className="feature-desc text-gray-400 font-arabic text-sm">نتابع تقدّمك ونرسل لك تقارير مفصّلة حتى تعرف أين أنت وإلى أين تسير في رحلتك القرآنية</p>
        </div>

        <div className="feature-card bg-dark-light border border-purple/20 rounded-2xl p-8 text-center reveal reveal-delay-1">
          <div className="feature-icon text-4xl mb-4 text-purple"><i className="fa-solid fa-shield-halved" /></div>
          <div className="feature-title text-white font-bold text-lg mb-3 font-arabic">تثبيت نفس المعلم</div>
          <p className="feature-desc text-gray-400 font-arabic text-sm">نؤمن بأن الاستمرارية مع معلم واحد تبني ألفة حقيقية وتسرّع تقدّمك بشكل ملحوظ</p>
        </div>

        <div className="feature-card bg-dark-light border border-purple/20 rounded-2xl p-8 text-center reveal reveal-delay-2">
          <div className="feature-icon text-4xl mb-4 text-purple"><i className="fa-solid fa-earth-asia" /></div>
          <div className="feature-title text-white font-bold text-lg mb-3 font-arabic">للجميع في كل مكان</div>
          <p className="feature-desc text-gray-400 font-arabic text-sm">سواء كنت في السعودية أو مصر أو أي مكان في العالم — القرآن يصلك أينما كنت</p>
        </div>
      </div>
    </div>
  </section>
);

export default WhySection;
