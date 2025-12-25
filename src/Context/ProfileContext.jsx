import { createContext, useContext, useState } from "react";

// create context
const ProfileContext = createContext();

// provider
export const ProfileProvider = ({ children }) => {
    const [profileOpen, setProfileOpen] = useState(false);

    const openProfile = () => setProfileOpen(true);
    const closeProfile = () => setProfileOpen(false);

    return (
        <ProfileContext.Provider
            value={{
                profileOpen,
                openProfile,
                closeProfile,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

// custom hook
export const useProfile = () => {
    return useContext(ProfileContext);
};
