import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useCheckout } from '../hooks/useCheckout';
import { formatSAR } from '../utils/formatCurrency';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CheckoutPage = () => {
  const { planId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { startCheckout } = useCheckout();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);

  const paymentStatus = searchParams.get('payment');

  useEffect(() => {
    if (paymentStatus === 'success') {
      navigate('/dashboard?welcome=1', { replace: true });
      return;
    }
  }, [paymentStatus, navigate]);

  useEffect(() => {
    if (!planId) return;
    supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single()
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else if (!data) setError('الباقة غير موجودة');
        else setPlan(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || 'حدث خطأ');
        setLoading(false);
      });
  }, [planId]);

  const handleCheckout = async () => {
    setCheckingOut(true);
    const result = await startCheckout(planId);
    if (result?.error) {
      setError(result.error);
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <LoadingSpinner text="جاري تحميل بيانات الباقة..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-6 px-6">
        <p className="text-red-400 font-arabic text-lg">{error}</p>
        <Link to="/#plans" className="bg-gold text-dark font-bold px-6 py-3 rounded-xl font-arabic">
          العودة للباقات
        </Link>
      </div>
    );
  }

  const categoryLabel = plan.category === 'quarterly' ? 'باقة 3 شهور' : 'باقة شهرية';

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full bg-dark-light border border-purple/20 rounded-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white font-arabic mb-2">تأكيد الاشتراك</h1>
          <p className="text-gray-400 font-arabic text-sm">{categoryLabel}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-3 border-b border-purple/10">
            <span className="text-gray-400 font-arabic">عدد الحصص شهرياً</span>
            <span className="text-white font-bold font-arabic">{plan.sessions_per_month} حصة</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-purple/10">
            <span className="text-gray-400 font-arabic">مدة الحصة</span>
            <span className="text-white font-bold font-arabic">{plan.duration_minutes} دقيقة</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-purple/10">
            <span className="text-gray-400 font-arabic">السعر الأصلي</span>
            <span className="text-gray-400 line-through font-arabic">{formatSAR(plan.original_price)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-400 font-arabic">السعر بعد الخصم</span>
            <span className="text-2xl font-bold text-gold font-arabic">{formatSAR(plan.discounted_price)}</span>
          </div>
          {plan.savings_amount > 0 && (
            <div className="bg-green-600/20 text-green-400 text-center py-2 rounded-lg font-arabic text-sm">
              🎁 توفير {formatSAR(plan.savings_amount)}
            </div>
          )}
        </div>

        <button
          onClick={handleCheckout}
          disabled={checkingOut}
          className="w-full bg-gold text-dark font-bold py-4 rounded-xl font-arabic text-lg hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {checkingOut ? 'جاري تحويلك للدفع الآمن...' : 'اشترك الآن'}
        </button>

        <div className="mt-4 text-center">
          <Link to="/#plans" className="text-gray-500 hover:text-gold font-arabic text-sm transition-colors">
            العودة للباقات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
