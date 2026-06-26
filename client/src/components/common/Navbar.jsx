import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { supabase } from '../../lib/supabaseClient';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const session = useAuthStore(s => s.session);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleNavClick = () => {
    setOpen(false);
  };

  const handleHashLink = (sectionId) => {
    setOpen(false);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav
  id="navbar"
  className={`fixed top-0 w-full z-50 px-6 flex items-center justify-between transition-all duration-300 ${
    scrolled ? 'h-16 bg-dark/95 backdrop-blur-sm shadow-lg' : 'h-20 bg-transparent'
  }`}
>
  <Link to="/" onClick={handleNavClick}>
    <picture>
      <source media="(max-width: 768px)" srcSet="/assets/main.png" />
      <img
        src="/assets/logo.png"
        alt="أكاديمية توبة"
        className={`object-contain transition-all duration-300 ${
          scrolled ? 'h-36' : 'h-40'
        }`}
      />
    </picture>
  </Link>

  <button
    className="md:hidden flex flex-col gap-1.5"
    onClick={() => setOpen(!open)}
    aria-label="فتح القائمة"
    aria-expanded={open}
  >
    <span className="w-6 h-0.5 bg-gold block transition-transform" />
    <span className="w-6 h-0.5 bg-gold block transition-opacity" />
    <span className="w-6 h-0.5 bg-gold block transition-transform" />
  </button>

  <ul
    className={`${
      open ? 'flex' : 'hidden'
    } md:flex flex-col md:flex-row gap-6 absolute md:static top-16 right-0 w-full md:w-auto bg-dark/95 md:bg-transparent p-6 md:p-0 font-arabic items-center`}
  >
    <li><button onClick={() => handleHashLink('why')} className="text-light-text hover:text-gold transition-colors">لماذا توبة؟</button></li>
    <li><button onClick={() => handleHashLink('plans')} className="text-light-text hover:text-gold transition-colors">الخطط</button></li>
    <li><button onClick={() => handleHashLink('testimonials')} className="text-light-text hover:text-gold transition-colors">آراء الطلاب</button></li>
    <li><button onClick={() => handleHashLink('howto')} className="text-light-text hover:text-gold transition-colors">كيف تبدأ؟</button></li>
    {session ? (
      <>
        <li><Link to="/dashboard" onClick={handleNavClick} className="text-light-text hover:text-gold transition-colors">لوحتي</Link></li>
        <li><button onClick={handleLogout} className="text-red-400 hover:text-red-300">خروج</button></li>
      </>
    ) : (
      <li>
        <Link
          to="/register"
          onClick={handleNavClick}
          className="bg-gold text-dark font-bold px-4 py-2 rounded-lg hover:bg-gold-light transition-colors"
        >
          ابدأ الآن
        </Link>
      </li>
    )}
  </ul>
</nav>
  );
};

export default Navbar;
