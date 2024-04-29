import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import { AuthProvider } from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator  } from 'react-native';

function App(): React.JSX.Element {

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        return isLoggedIn === 'true';
      } catch (error) {
        console.error('Error retrieving login status:', error);
        return false;
      }
    };

    checkLoggedInStatus().then((isLoggedIn) => {
      setLoggedIn(isLoggedIn);
    });
  }, []);

  const [loggedIn, setLoggedIn] = useState<boolean | null>(true);

  if (loggedIn === null) {
    // Render a loading indicator while login status is being determined
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff"  />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        {/* {loggedIn ? <AppStack /> : <AuthStack />} */}
        <AppStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
