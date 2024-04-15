import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/colors';
import Icon from "react-native-vector-icons/FontAwesome";
import Checkbox from "expo-checkbox";
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { SocialLogins } from '../../components/SocialLogin';
import { assets } from '../../assets';
import axios from 'axios';
import* as  Rest from '../../../src/utils/restapi';


const LoginScreen = ({navigation}: any) => {

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const navigation = useNavigation();

    const { setIsLoggedIn } = useAuth();    

    const doLogin = (navigation: any) => {
        if(username && password) {
            navigation.navigate('App');
            setIsLoggedIn(true);
        } else {
            Alert.alert('Please enter valid credentials');
        }
    }
    // const handleLogin = (navigation:any) => {
    //     const user = {
    //         username: username,
    //         password: password
    //     }
    //     axios.post(Rest.userLogin, user).then((response) => {
    //         console.log('response',response);
    //         navigation.navigate('App');
    //         setIsLoggedIn(true);
    //         Alert.alert("Registration successfull", "You have been registered succesfully");
    //         setUsername('');
    //         setPassword('');

    //     }).catch((error) => {
    //         Alert.alert("Logiin failed", "an error ocurred during login");
    //         console.log("error", error)
    //     })
    // }

    const handleRegister = (navigation: any) => {
        navigation.navigate('Register');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={styles.header}>
                    <Image
                        alt="App Logo"
                        resizeMode="contain"
                        style={styles.headerImg}
                        source={assets.appicon}
                     />
                    <Text style={styles.title}>
                        <Text style={{ color: '#075eec' }}>ProductInvot</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Get access to your inventory and more
                    </Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '400',
                            marginVertical: 8
                        }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 10
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            onChangeText={(text) => setUsername(text)}
                            style={{
                                width: "100%"
                            }}
                            value={username}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 10
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            keyboardType='default'
                            onChangeText={(text) => setPassword(text)}
                            style={{
                                width: "100%"
                            }}
                            value={password}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Icon name="eye-slash" size={24} color={COLORS.black} />
                                ) : (
                                    <Icon name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Remenber Me</Text>
                </View>

                <CustomButton
                    title="Login"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={() => doLogin(navigation)}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>
                <SocialLogins />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => handleRegister(navigation)}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1D2A32',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
    },
    /** Header */
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    headerImg: {
        width: 80,
        height: 50,
        alignSelf: 'center',
    },
});
export default LoginScreen;