import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the context type
type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo | null;
  storeUserInformation: (userInfo: UserInfo) => Promise<void>;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  getUserInformation: () => Promise<void>;
};

// Interface for user information
interface UserInfo {
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  businessType: string;
  businessName: string;
  address: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Create the initial context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userInfo: null,
  storeUserInformation: async () => {},
  loginUser: async () => {},
  logoutUser: async () => {},
  getUserInformation: async () => {},
});

// Custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage the state  
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Function to retrieve user information from AsyncStorage
  const getUserInformation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      if (jsonValue !== null) {
        const userData: UserInfo = JSON.parse(jsonValue);
        setUserInfo(userData);
      }
    } catch (error) {
      console.error('Error retrieving user information:', error);
    }
  };

  // Function to store user information in AsyncStorage
  const storeUserInformation = async (userInfo: UserInfo) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUserInfo(userInfo);
    } catch (error) {
      console.error('Error storing user information:', error);
    }
  };

  // Function to handle login
  const loginUser = async () => {
    try {
      // Perform login actions (e.g., validate credentials)
      // If login is successful, set isLoggedIn to true
      setIsLoggedIn(true);
      // Store login status in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Function to handle logout
  const logoutUser = async () => {
    try {
      // Perform logout actions (if any)
      // Set isLoggedIn to false
      setIsLoggedIn(false);
      // Clear user information and login status from AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'false');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Check if user is already logged in on app startup
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value !== null && value === 'true') {
          setIsLoggedIn(true);
          // Retrieve user information if logged in
          await getUserInformation();
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
    getUserInformation();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        storeUserInformation,
        loginUser,
        logoutUser,
        getUserInformation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
