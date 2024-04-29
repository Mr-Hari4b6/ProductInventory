import React from 'react';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from './TabNavigator';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { assets } from '../assets';
import ProfileTabs from './ProfileStack';
import { FloatingButton } from '../components/FloatingButton';
import ProductCostCalculator from '../screens/product-cost-calculator/ProductCostCalculator';
import HeaderComponent from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';


const MessagesScreen = () => <View style={styles.viewStyle}><Text style={styles.textStyle}>Messages Screen</Text></View>
const HelpScreen = () => <View style={styles.viewStyle}><Text style={styles.textStyle}>Help Screen</Text></View>

const Drawer = createDrawerNavigator();

const AppStack = () => {

    const { userInfo, logoutUser } = useAuth();

    return (
        <>
            <Drawer.Navigator
                drawerContent={
                    (props) => {
                        return (
                            <SafeAreaView>
                                <View
                                    style={{
                                        height: 200,
                                        width: '100%',
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderBottomColor: "#f4f4f4",
                                        borderBottomWidth: 1
                                    }}
                                >
                                    <Image
                                        source={assets.profile}
                                        style={{
                                            height: 130,
                                            width: 130,
                                            borderRadius: 65
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            marginVertical: 6,
                                            fontWeight: "bold",
                                            color: "#111"
                                        }}
                                    >{userInfo?.firstName}{' '}{userInfo?.lastName}</Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "#111"
                                        }}
                                    >{userInfo?.businessType}</Text>
                                </View>
                                <DrawerItemList {...props} />
                            </SafeAreaView>
                        )
                    }
                }
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: "#fff",
                        width: 250
                    },
                    headerStyle: {
                        backgroundColor: "purple",
                    },
                    header: () => <HeaderComponent />,
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                    drawerInactiveTintColor: 'black',
                    drawerActiveBackgroundColor: 'purple',
                    drawerActiveTintColor: 'white'

                }}
            >
                <Drawer.Screen
                    name="Home"
                    options={{
                        drawerLabel: "Home",
                        title: "Home",
                        drawerIcon: () => (
                            <Icon name="home" size={20} color="#808080" />
                        )
                    }}
                    component={TabNavigator}
                />
                <Drawer.Screen
                    name="Profile"
                    options={{
                        drawerLabel: "Profile",
                        title: "Profile",
                        drawerIcon: () => (
                            <Icon name="user" size={20} color="#808080" />
                        ),
                    }}
                    component={ProfileTabs}
                />
                <Drawer.Screen
                    name="Messages"
                    options={{
                        drawerLabel: "Messages",
                        title: "Messages",
                        drawerIcon: () => (
                            <Icon name="comments" size={20} color="#808080" />
                        )
                    }}
                    component={MessagesScreen}
                />
                <Drawer.Screen
                    name="Help"
                    options={{
                        drawerLabel: "Help",
                        title: "Help",
                        drawerIcon: () => (
                            <Icon name="question-circle-o" size={20} color="#808080" />
                        )
                    }}
                    component={HelpScreen}
                />
                <Drawer.Screen
                    name="ProductCost"
                    options={{
                        drawerLabel: "Cost Calculator",
                        title: "Cost Calculator",
                        drawerIcon: () => (
                            <Icon name="codepen" size={20} color="#808080" />
                        )
                    }}
                    component={ProductCostCalculator}
                />
                <Drawer.Screen
                    name="SignOut"
                    options={{
                        drawerLabel: "Sign Out",
                        title: "Sign Out",
                        drawerIcon: () => (
                            <Icon name="sign-out" size={20} color="#808080" />
                        ),

                    }}
                    // Instead of rendering AuthStack component, navigate to it
                    // Adjust the listeners prop to return an object with expected properties
                    listeners={({ navigation }) => ({
                        drawerItemPress: () => {
                            // Navigate to "Onboarding" screen in the AuthStack
                            logoutUser();
                            navigation.navigate('Login');
                        }
                    })}
                    children={({ route, navigation }) => {
                        // You can return the content you want to render for the "SignOut" screen here
                        return (
                            <View>
                                <Text>Are you sure you want to sign out?</Text>
                                {/* Add any other components as needed */}
                            </View>
                        );
                    }}
                />
            </Drawer.Navigator>
            <FloatingButton />
        </>
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
        color: 'black',
    },
    headingStyle: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
    },
});

export default AppStack;