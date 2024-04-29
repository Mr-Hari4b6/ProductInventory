import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword } from '../screens/authentication/ForgotPassword';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import AppStack from './AppStack';
import InventoryDetails from '../screens/inventory-management/InventoryDetails';
import OnboardingScreen from '../onboarding/OnBoardingScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="InventoryDetails"  options={{ headerShown: true, headerTitle: 'Product Details' }} component={InventoryDetails} />
    </Stack.Navigator>
  );
};

export default AuthStack;