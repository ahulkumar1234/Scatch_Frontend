import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";              // <-- FIXED (was missing)

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // <-- null, not false (prevents redirect issues)

  const checkLogin = async () => {
    try {

      const res = await axios.get(
        "https://scatch-backend-41mw.onrender.com/api/v1/users/me",    // <-- FIXED PORT
        { withCredentials: true }
      );
      if(res.data.loggedIn){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false)
      }
    } catch (error) {
      setIsLoggedIn(false);
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
