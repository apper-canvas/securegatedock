import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    toast.error('Please log in to access this page');
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
