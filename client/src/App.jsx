import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import useAuthStore from './store/authStore';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardRedirect from './pages/DashboardRedirect';
import StudentDashboardPage from './pages/StudentDashboardPage';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  const setSession = useAuthStore(s => s.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, [setSession]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout/:planId" element={<CheckoutPage />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>}
        />
        <Route
          path="/student-dashboard"
          element={<ProtectedRoute requiredRole="student"><StudentDashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/teacher-dashboard"
          element={<ProtectedRoute requiredRole="teacher"><TeacherDashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
