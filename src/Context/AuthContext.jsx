import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";              // <-- FIXED (was missing)
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(); // <-- null, not false (prevents redirect issues)

  const checkLogin = async () => {
    try {

      const res = await axios.get(
        "https://scatch-backend-41mw.onrender.com/api/v1/users/me",    // <-- FIXED PORT
        { withCredentials: true }
      );
      setIsLoggedIn(res.data.loggedIn);
    } catch (error) {
      setIsLoggedIn(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
