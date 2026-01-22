import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader"



const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();


  if (isLoggedIn === null) {
    return <div className="flex flex-col justify-center items-center h-screen w-full text-xl"><ScaleLoader color="blue" /><span className="text-gray-600 text-sm mt-2">Loading...</span></div>;  // Prevent redirect until checkAuth finishes
  }

  return isLoggedIn ? children : <Navigate to="/auth-page" />;
};

export default ProtectedRoute;
