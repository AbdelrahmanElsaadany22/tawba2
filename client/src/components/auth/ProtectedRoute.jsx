import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, role, loading } = useAuth();

  if (loading) return <LoadingSpinner text="جاري التحقق..." />;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
