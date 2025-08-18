import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { token, loading } = useAuth();
  if (loading) return null; // or a spinner
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}
