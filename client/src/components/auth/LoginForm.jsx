import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email:    form.email,
      password: form.password,
    });

    if (loginError) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto font-arabic">
      <h2 className="text-2xl font-bold text-gold text-center mb-2">تسجيل الدخول</h2>

      {error && <p className="text-red-400 text-sm text-center bg-red-400/10 p-3 rounded-lg">{error}</p>}

      <input
        name="email" value={form.email} onChange={handleChange} required
        placeholder="البريد الإلكتروني" type="email"
        className="bg-dark-light border border-purple/40 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:border-gold focus:outline-none"
      />
      <input
        name="password" value={form.password} onChange={handleChange} required
        placeholder="كلمة المرور" type="password"
        className="bg-dark-light border border-purple/40 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:border-gold focus:outline-none"
      />

      <button
        type="submit" disabled={loading}
        className="bg-gold text-dark font-bold py-3 rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50"
      >
        {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
      </button>

      <p className="text-center text-gray-400 text-sm">
        ليس لديك حساب؟{' '}
        <Link to="/register" className="text-gold hover:underline">سجل الآن مجاناً</Link>
      </p>
    </form>
  );
};

export default LoginForm;
