import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardRedirect = () => {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (role === 'student') navigate('/student-dashboard', { replace: true });
    else if (role === 'teacher') navigate('/teacher-dashboard', { replace: true });
    else if (role === 'admin') navigate('/admin', { replace: true });
    else navigate('/', { replace: true });
  }, [role, loading, navigate]);

  return <LoadingSpinner text="جاري تحويلك..." />;
};

export default DashboardRedirect;
