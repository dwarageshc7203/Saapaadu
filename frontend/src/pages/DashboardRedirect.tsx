import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../context/AuthContext';

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const map: Record<Role, string> = {
    customer: '/dashboard/customer',
    vendor: '/dashboard/vendor',
    admin: '/login', // or safe fallback if admin still exists
  };

  return <Navigate to={map[user.role]} replace />;
}
