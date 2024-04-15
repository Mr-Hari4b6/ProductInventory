import React from 'react';
import FinanceScreen from '../screens/profile-management/FinanceScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SalesDashboard from '../screens/sales-management/SalesDashboard';

const Tab = createMaterialTopTabNavigator();

const SalesTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={SalesDashboard} />
            <Tab.Screen name="Finance" component={FinanceScreen} />
        </Tab.Navigator>
    );
};

export default SalesTabs;
