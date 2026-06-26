import { useAuth } from '../../../hooks/useAuth';
import { useSubscriptions } from '../../../hooks/useSubscriptions';
import MySubscription from './MySubscription';
import MyTeacher from './MyTeacher';
import ProgressReport from './ProgressReport';
import LoadingSpinner from '../../common/LoadingSpinner';

const StudentDashboard = () => {
  const { profile } = useAuth();
  const { active, loading } = useSubscriptions();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 font-arabic">
      <h1 className="text-2xl font-bold text-gold mb-8">
        أهلاً {profile?.name} 👋
      </h1>

      {!active ? (
        <div className="bg-dark-light border border-purple/30 rounded-2xl p-8 text-center">
          <p className="text-gray-300 mb-4">ليس لديك اشتراك نشط حالياً</p>
          <a href="/#plans" className="bg-gold text-dark font-bold px-6 py-3 rounded-xl">
            اختر خطتك الآن
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <MySubscription subscription={active} />
          <MyTeacher teacher={active.teacher} />
          <ProgressReport studentId={profile?.id} />
        </div>
      )}
    </div>
  );
};
export default StudentDashboard;
