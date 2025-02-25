import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";

const Privet = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />; // Show loading while checking auth status
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />; // Redirect to login if not authenticated
  }

  return children; // Allow access to the children if authenticated
};
export default Privet;
