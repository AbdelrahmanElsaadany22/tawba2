import { useAdminPlans } from '../../../hooks/useAdminPlans';
import { formatSAR } from '../../../utils/formatCurrency';
import LoadingSpinner from '../../common/LoadingSpinner';

const PlansManager = () => {
  const { plans, loading } = useAdminPlans();
  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <h2 className="text-lg font-bold text-white mb-4">إدارة الباقات ({plans.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="text-gray-400 border-b border-purple/20">
              <th className="pb-3">النوع</th>
              <th className="pb-3">المدة</th>
              <th className="pb-3">الحصص/شهر</th>
              <th className="pb-3">السعر الأصلي</th>
              <th className="pb-3">السعر بعد الخصم</th>
              <th className="pb-3">الخصم</th>
              <th className="pb-3">نشط</th>
              <th className="pb-3">الأكثر طلباً</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(p => (
              <tr key={p.id} className="border-b border-purple/10 hover:bg-dark/50">
                <td className="py-3 text-gray-300">{p.category === 'quarterly' ? '3 أشهر' : 'شهري'}</td>
                <td className="py-3 text-gray-300">{p.duration_minutes} د</td>
                <td className="py-3 text-white font-bold">{p.sessions_per_month}</td>
                <td className="py-3 text-gray-400 line-through">{formatSAR(p.original_price)}</td>
                <td className="py-3 text-gold font-bold">{formatSAR(p.discounted_price)}</td>
                <td className="py-3 text-red-400">{p.discount_percent}%</td>
                <td className="py-3">{p.is_active ? '✅' : '❌'}</td>
                <td className="py-3">{p.is_featured ? '⭐' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PlansManager;
