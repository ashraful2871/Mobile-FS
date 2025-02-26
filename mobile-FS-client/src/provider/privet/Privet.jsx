import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { AuthContext } from "../AuthProvider";

const Privet = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // Ensure the user state is coming from context
  const location = useLocation();

  if (loading) {
    return <Loading />; // Show loading while fetching user data
  }

  if (!user) {
    return <Navigate state={{ from: location }} to="/login" />;
  }

  return children; // Render the children if the user is authenticated
};

export default Privet;
