import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ForgotPassword } from '../screens/authentication/ForgotPassword';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;