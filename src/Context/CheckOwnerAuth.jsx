import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";

export const OwnerAuthContext = createContext();

export const OwnerAuthProvider = ({ children }) => {

    const [isloggedIn, setIsLoggedIn] = useState(null);

    const checkLogin = async () => {
        try {
            const res = await axios.get('https://scatch-backend-41mw.onrender.com/api/v1/owners/ownerauth', { withCredentials: true });
            setIsLoggedIn(res.data.OwnerLoggedin);
console.log(res.data.OwnerLoggedin)
        } catch (error) {
            setIsLoggedIn(false);
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])


    return (
        <>
            <OwnerAuthContext.Provider value={{ isloggedIn, setIsLoggedIn }}>
                {children}
            </OwnerAuthContext.Provider>

        </>
    )
}

export const useOwnerAuth = () => useContext(OwnerAuthContext);