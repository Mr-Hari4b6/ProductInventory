import React, { createContext, useState, useContext } from 'react';

// Define the context type
type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

interface AuthProviderProps {
    children: React.ReactNode;
}
// Create the initial context with default values
const AuthContext = createContext<AuthContextType>({
    isLoggedIn: true,
    setIsLoggedIn: () => { },
});

// Custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage the state  
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
