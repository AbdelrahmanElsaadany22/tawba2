import { formatSAR } from '../../utils/formatCurrency';

const PlanCard = ({ plan, onSubscribe }) => (
  <div
    className={`plan-card bg-dark-light border rounded-2xl p-6 flex flex-col gap-4 text-center font-arabic transition-transform hover:-translate-y-1 ${
      plan.is_featured ? 'border-gold shadow-lg shadow-gold/20' : 'border-purple/30'
    }`}
  >
    {plan.is_featured && (
      <span className="bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full self-center">
        الأكثر طلباً
      </span>
    )}

    <div className="text-2xl font-bold text-white">
      {plan.sessions_per_month}
      <span className="text-sm text-gray-400 font-normal"> حصة/شهر</span>
    </div>

    <div className="text-gray-400 line-through text-sm">
      ❌ {formatSAR(plan.original_price)}
    </div>

    <div className="text-3xl font-bold text-gold">
      {formatSAR(plan.discounted_price)}
    </div>

    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
      🔥 خصم {plan.discount_percent}%
    </span>

    <div className="text-green-400 text-sm">
      🎁 توفير {formatSAR(plan.savings_amount)}
    </div>

    <hr className="border-purple/20" />

    <button
      onClick={() => onSubscribe(plan.id)}
      className="bg-purple hover:bg-purple-dark text-white font-bold py-3 rounded-xl transition-colors"
    >
      اشترك الآن
    </button>
  </div>
);

export default PlanCard;
