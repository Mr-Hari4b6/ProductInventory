import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryDetails from '../screens/inventory-management/InventoryDetails';
import InventoryItems from '../screens/inventory-management/InventoryItems';
import InventoryItemsList from '../screens/inventory-management/InventoryItemsList';

const Stack = createNativeStackNavigator();

const InventoryStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InventoryItems" component={InventoryItems} />
      <Stack.Screen name="InventoryItemsList"  options={{ headerShown: true, headerTitle: 'Product List' }} component={InventoryItemsList} />
      <Stack.Screen name="InventoryDetails"  options={{ headerShown: true, headerTitle: 'Product Details' }} component={InventoryDetails} />
    </Stack.Navigator>
  );
};

export default InventoryStack;