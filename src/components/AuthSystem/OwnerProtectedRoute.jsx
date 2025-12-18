import { useOwnerAuth } from "../../Context/CheckOwnerAuth";
import { Navigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import toast from "react-hot-toast";


const OwnerProtectedRoute = ({ children }) => {
    const { isloggedIn } = useOwnerAuth();
    if (isloggedIn === null) {
        return <div className="flex justify-center items-center h-screen"><ScaleLoader color="blue" /></div>
    }
    return isloggedIn ? children : <Navigate to="/owner" />;

};


export default OwnerProtectedRoute;