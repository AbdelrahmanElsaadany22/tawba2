const statusLabel = { active: 'نشط', paused: 'موقوف', expired: 'منتهي', cancelled: 'ملغي' };
const statusColor = { active: 'text-green-400', paused: 'text-yellow-400', expired: 'text-red-400', cancelled: 'text-gray-400' };

const MySubscription = ({ subscription: sub }) => {
  const plan = sub.plans;
  const daysLeft = Math.max(0, Math.ceil((new Date(sub.end_date) - new Date()) / 86400000));

  return (
    <div className="bg-dark-light border border-purple/30 rounded-2xl p-6 font-arabic">
      <h2 className="text-lg font-bold text-white mb-4">اشتراكي الحالي</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="حالة الاشتراك" value={statusLabel[sub.status]} className={statusColor[sub.status]} />
        <Stat label="الحصص المتبقية" value={`${sub.sessions_remaining} / ${sub.total_sessions}`} />
        <Stat label="مدة الحصة" value={`${plan?.duration_minutes} دقيقة`} />
        <Stat label="ينتهي بعد" value={`${daysLeft} يوم`} />
      </div>

      <div className="mt-4 text-sm text-gray-400">
        تاريخ الانتهاء: {new Date(sub.end_date).toLocaleDateString('ar-SA')}
      </div>
    </div>
  );
};

const Stat = ({ label, value, className = 'text-gold' }) => (
  <div className="bg-dark rounded-xl p-3 text-center">
    <div className={`text-xl font-bold ${className}`}>{value}</div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
  </div>
);

export default MySubscription;
