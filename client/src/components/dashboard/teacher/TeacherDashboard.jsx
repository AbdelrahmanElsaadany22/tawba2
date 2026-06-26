import { useAuth } from '../../../hooks/useAuth';
import MyStudents from './MyStudents';
import SessionSchedule from './SessionSchedule';

const TeacherDashboard = () => {
  const { profile } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 font-arabic">
      <h1 className="text-2xl font-bold text-gold mb-8">لوحة المعلم — {profile?.name}</h1>
      <div className="flex flex-col gap-6">
        <SessionSchedule teacherId={profile?.id} />
        <MyStudents teacherId={profile?.id} />
      </div>
    </div>
  );
};
export default TeacherDashboard;
