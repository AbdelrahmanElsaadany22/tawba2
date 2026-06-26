import { useAdminStats } from '../../../hooks/useAdminStats';
import LoadingSpinner from '../../common/LoadingSpinner';

const AdminDashboard = () => {
  const { stats, loading } = useAdminStats();

  if (loading) return <LoadingSpinner />;

  const cards = [
    { label: 'الطلاب',              value: stats.totalStudents,        icon: '🎓', color: 'text-blue-400' },
    { label: 'المعلمون',            value: stats.totalTeachers,        icon: '👨‍🏫', color: 'text-purple-light' },
    { label: 'الاشتراكات النشطة',   value: stats.activeSubscriptions,  icon: '✅', color: 'text-green-400' },
    { label: 'شهادات بانتظار الموافقة', value: stats.pendingTestimonials, icon: '⭐', color: 'text-yellow-400' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-arabic">
      <h1 className="text-2xl font-bold text-gold mb-8">لوحة الإدارة</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map(c => (
          <div key={c.label} className="bg-dark-light border border-purple/30 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">{c.icon}</div>
            <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
            <div className="text-gray-400 text-xs mt-1">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminDashboard;
