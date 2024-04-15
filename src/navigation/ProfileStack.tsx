import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from '../screens/profile-management/ProfileScreen';
import {SubscriptionScreen} from '../screens/profile-management/SubscriptionScreen';
import FinanceScreen from '../screens/profile-management/FinanceScreen';

const Tab = createBottomTabNavigator();

const ProfileTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'MyProfile') {
                        iconName = focused ? 'user' : 'user';
                    } else if (route.name === 'Subscription') {
                        iconName = focused ? 'vcard-o' : 'vcard-o';
                    } else if (route.name === 'Finance') {
                        iconName = focused ? 'money' : 'money';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'black',
                headerShown: false,
            })}
        >
            <Tab.Screen name="MyProfile" component={ProfileScreen} />
            <Tab.Screen name="Subscription" component={SubscriptionScreen} />
            <Tab.Screen name="Finance" component={FinanceScreen} />
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
    tabBar: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
    },
});

export default ProfileTabs;
