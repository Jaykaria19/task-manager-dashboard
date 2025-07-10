import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

type TProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};