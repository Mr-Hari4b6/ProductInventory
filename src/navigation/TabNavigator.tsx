import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InventoryForm from '../screens/inventory/InventoryScreen';

const MyHomeScreen = ({ navigation }: any) => (
  <View style={styles.viewStyle}>
    <Text style={styles.headingStyle}>MyHomeScreen</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Inventory')}>
      <Text style={styles.textStyle}>Go to Inventory</Text>
    </TouchableOpacity>
  </View>
);

const OrdersScreen = ({ navigation }: any) => (
  <View style={styles.viewStyle}>
    <Text style={styles.headingStyle}>OrdersScreen</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Transfer')}>
      <Text style={styles.textStyle}>Go to Transfer</Text>
    </TouchableOpacity>
  </View>
);

const TransferScreen = ({ navigation }: any) => (
  <View style={styles.viewStyle}>
    <Text style={styles.headingStyle}>TransferScreen</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <Text style={styles.textStyle}>Go to Settings</Text>
    </TouchableOpacity>
  </View>
);

const SettingsScreen = ({ navigation }: any) => (
  <View style={styles.viewStyle}>
    <Text style={styles.headingStyle}>SettingsScreen</Text>
    <TouchableOpacity onPress={() => navigation.navigate('MyHome')}>
      <Text style={styles.textStyle}>Go to MyHome</Text>
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
          } else if (route.name === 'Orders') {
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
      <Tab.Screen name="MyHome" component={MyHomeScreen} />
      <Tab.Screen name="Inventory" component={InventoryForm} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
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
