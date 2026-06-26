import Navbar from '../components/common/Navbar';
import StudentDashboard from '../components/dashboard/student/StudentDashboard';

const StudentDashboardPage = () => (
  <div className="min-h-screen bg-dark">
    <Navbar />
    <div className="pt-20"><StudentDashboard /></div>
  </div>
);
export default StudentDashboardPage;
