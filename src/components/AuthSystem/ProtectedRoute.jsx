import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    return <p>Loading...</p>;  // Prevent redirect until checkAuth finishes
  }

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
