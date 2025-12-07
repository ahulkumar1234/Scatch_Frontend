import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) {
    return <p className="flex justify-center items-center h-screen w-full">Loading...</p>;  // Prevent redirect until checkAuth finishes
  }

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
