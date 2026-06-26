import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CheckoutPage = () => {
  const { planId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { startCheckout } = useCheckout();

  const paymentStatus = searchParams.get('payment');

  useEffect(() => {
    if (paymentStatus === 'success') {
      navigate('/dashboard?welcome=1', { replace: true });
      return;
    }
    if (planId) startCheckout(planId);
  }, [planId, paymentStatus]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <LoadingSpinner text="جاري تجهيز الدفع الآمن..." />
    </div>
  );
};

export default CheckoutPage;
