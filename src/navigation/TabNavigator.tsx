import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InventoryItems from '../screens/inventory-management/InventoryItems';
import SalesTabs from './SalesStack';
import SettingsScreen from '../screens/settings/SettingsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import InventoryStack from './InventoryStack';

const TransferScreen = ({ navigation }: any) => (
  <View style={styles.viewStyle}>
    <Text style={styles.headingStyle}>TransferScreen</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <Text style={styles.textStyle}>Go to Settings</Text>
    </TouchableOpacity>
  </View>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'MyHome') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Inventory') {
            iconName = focused ? 'codepen' : 'codepen';
          } else if (route.name === 'Sales') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'Transfer') {
            iconName = focused ? 'exchange' : 'exchange';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
        
      })}
    >
      <Tab.Screen name="MyHome" component={HomeScreen} />
      <Tab.Screen name="Inventory" component={InventoryStack} />
      <Tab.Screen name="Sales" component={SalesTabs} />
      <Tab.Screen name="Transfer" component={TransferScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    fontSize: 28,
    color: 'blue',
  },
  headingStyle: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});

export default TabNavigator;
