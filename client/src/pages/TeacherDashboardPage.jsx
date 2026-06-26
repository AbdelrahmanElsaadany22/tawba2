import Navbar from '../components/common/Navbar';
import TeacherDashboard from '../components/dashboard/teacher/TeacherDashboard';

const TeacherDashboardPage = () => (
  <div className="min-h-screen bg-dark">
    <Navbar />
    <div className="pt-20"><TeacherDashboard /></div>
  </div>
);
export default TeacherDashboardPage;
