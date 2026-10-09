import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function ProtectedRoute() {
  const { status } = useAuth();
  const location = useLocation();
  if (status === 'loading') return <p className="auth-loading">Checking your session…</p>;
  if (status === 'unauthenticated') return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
