import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader"



const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();


  if (isLoggedIn === null) {
    return <div className="flex justify-center items-center h-screen w-full"><ScaleLoader color="blue" /></div>;  // Prevent redirect until checkAuth finishes
  }

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
