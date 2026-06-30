const Footer = () => (
  <footer className="bg-dark-light py-12 text-center font-arabic">
    <img src="/assets/main.png" alt="توبة" className="h-16 mx-auto mb-4" />
    <p className="text-gray-400 mb-6">سنساعدك على أن تكون صاحباً لكتاب الله</p>
    <ul className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
      <li><a href="/#why" className="text-gray-400 hover:text-gold transition-colors">من نحن</a></li>
      <li><a href="/#plans" className="text-gray-400 hover:text-gold transition-colors">الباقات</a></li>
      <li><a href="/#testimonials" className="text-gray-400 hover:text-gold transition-colors">الشهادات</a></li>
      <li><a href="/#howto" className="text-gray-400 hover:text-gold transition-colors">كيف تبدأ؟</a></li>
      <li>
        <a href="https://wa.me/201118341567" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gold transition-colors">
          تواصل معنا
        </a>
      </li>
    </ul>
    <p className="text-gray-600 text-sm">
      © 2024 أكاديمية توبة — جميع الحقوق محفوظة
    </p>
  </footer>
);

export default Footer;
