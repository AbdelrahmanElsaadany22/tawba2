const CTASection = () => (
  <section id="cta" className="py-24 bg-dark-light relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.08)_0%,_transparent_70%)] pointer-events-none" />
    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
      <div className="text-gold text-4xl mb-6 reveal">❖</div>
      <h2 className="text-4xl font-bold text-white font-arabic mb-6 reveal">
        ابدأ <span className="text-gold">صحبتك</span> مع <span className="text-gold">القرآن</span> اليوم
      </h2>
      <p className="text-gray-300 font-arabic mb-8 reveal reveal-delay-1">
        لا تؤجّل قرارًا يقرّبك من الله — سجّل الآن واختر الباقة التي تناسبك. أول خطوة هي الأصعب، وما بعدها كله نور بإذن الله.
      </p>
      <div className="flex flex-wrap justify-center gap-4 reveal reveal-delay-2">
        <a href="/#plans" className="bg-gold text-dark font-bold px-8 py-4 rounded-xl font-arabic hover:bg-gold-light transition-colors">
          🌟 اشترك الآن
        </a>
        <a
          href="https://wa.me/201118341567"
          target="_blank"
          rel="noreferrer"
          className="border border-gold text-gold px-8 py-4 rounded-xl font-arabic hover:bg-gold/10 transition-colors inline-flex items-center gap-2"
        >
          💬 تواصل معنا
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
