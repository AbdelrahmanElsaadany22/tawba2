import Navbar from '../components/common/Navbar';
import AdminDashboard from '../components/dashboard/admin/AdminDashboard';
import UsersTable from '../components/dashboard/admin/UsersTable';
import PlansManager from '../components/dashboard/admin/PlansManager';
import TestimonialsManager from '../components/dashboard/admin/TestimonialsManager';

const AdminPage = () => (
  <div className="min-h-screen bg-dark">
    <Navbar />
    <div className="pt-20 max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8">
      <AdminDashboard />
      <UsersTable />
      <PlansManager />
      <TestimonialsManager />
    </div>
  </div>
);
export default AdminPage;
