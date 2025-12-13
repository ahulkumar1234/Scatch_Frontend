import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";


export const OwnerAuthContext = createContext();

export const OwnerAuthProvider = ({ children }) => {

    const [isloggedIn, setIsLoggedIn] = useState();

    const checkLogin = async () => {
        try {
            const res = await axios.get('https://scatch-backend-41mw.onrender.com/api/v1/owners/ownerauth', { withCredentials: true });
            setIsLoggedIn(res.data.OwnerLoggedin);

        } catch (error) {
            setIsLoggedIn(false)
            toast.error(error.message)
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