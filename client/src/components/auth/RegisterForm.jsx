import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email:    form.email,
      password: form.password,
      options:  { data: { name: form.name } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session && form.phone) {
      await supabase.from('profiles').update({ phone: form.phone }).eq('id', session.user.id);
    }

    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto font-arabic">
      <h2 className="text-2xl font-bold text-gold text-center mb-2">إنشاء حساب جديد</h2>

      {error && <p className="text-red-400 text-sm text-center bg-red-400/10 p-3 rounded-lg">{error}</p>}

      <input
        name="name" value={form.name} onChange={handleChange} required
        placeholder="الاسم الكامل"
        className="bg-dark-light border border-purple/40 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:border-gold focus:outline-none"
      />
      <input
        name="phone" value={form.phone} onChange={handleChange}
        placeholder="رقم الواتساب (اختياري)"
        type="tel"
        className="bg-dark-light border border-purple/40 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:border-gold focus:outline-none"
      />
      <input
        name="email" value={form.email} onChange={handleChange} required
        placeholder="البريد الإلكتروني" type="email"
        className="bg-dark-light border border-purple/40 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:border-gold focus:outline-none"
      />
      <input
        name="password" value={form.password} onChange={handleChange} required
        placeholder="كلمة المرور (8 أحرف على الأقل)" type="password" minLength={8}
        className="bg-dark-light border border-purple/40 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:border-gold focus:outline-none"
      />

      <button
        type="submit" disabled={loading}
        className="bg-gold text-dark font-bold py-3 rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50"
      >
        {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
      </button>

      <p className="text-center text-gray-400 text-sm">
        لديك حساب؟{' '}
        <Link to="/login" className="text-gold hover:underline">تسجيل الدخول</Link>
      </p>
    </form>
  );
};

export default RegisterForm;
