import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import { AuthProvider, useAuth } from './src/context/AuthContext';

function App(): React.JSX.Element {
  const { isLoggedIn } = useAuth();

  return (
    <AuthProvider>
      <NavigationContainer>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
