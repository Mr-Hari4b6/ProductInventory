import React from 'react';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from './TabNavigator';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { assets } from '../assets';

const ProfileScreen = () => <View style={styles.viewStyle}><Text style={styles.textStyle}>Profile Screen</Text></View>
const MessagesScreen = () => <View style={styles.viewStyle}><Text style={styles.textStyle}>Messages Screen</Text></View>
const SettingsScreen = () => <View style={styles.viewStyle}><Text style={styles.textStyle}>Settings Screen</Text></View>
const ContactScreen = () => <View style={styles.viewStyle}><Text style={styles.textStyle}>Contact Screen</Text></View>

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
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
                                    source={assets.banner}
                                    style={{
                                        height: 130,
                                        width: 130,
                                        borderRadius: 65
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 22,
                                        marginVertical: 6,
                                        fontWeight: "bold",
                                        color: "#111"
                                    }}
                                >Isabella Joanna</Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: "#111"
                                    }}
                                >Product Manager</Text>
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
                    )
                }}
                component={ProfileScreen}
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
                name="Settings"
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                    drawerIcon: () => (
                        <Icon name="cog" size={20} color="#808080" />
                    )
                }}
                component={SettingsScreen}
            />
            <Drawer.Screen
                name="Contact"
                options={{
                    drawerLabel: "Contact",
                    title: "Contact",
                    drawerIcon: () => (
                        <Icon name="phone" size={20} color="#808080" />
                    )
                }}
                component={ContactScreen}
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
                    drawerItemPress: () =>
                    navigation.navigate('Login'),
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