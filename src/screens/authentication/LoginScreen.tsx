import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import Checkbox from "expo-checkbox";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import COLORS from '../../constants/colors';
import CustomButton from '../../components/CustomButton';
import { useAuth } from '../../context/AuthContext';
import { SocialLogins } from '../../components/SocialLogin';
import { CustomLogo } from '../../components/CustomLogo';
import * as Rest from '../../utils/restapi';


const LoginScreen = () => {

    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation();
    const { loginUser } = useAuth();

    // Formik form validation schema
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Enter your email address'),
        password: Yup.string().required('Enter your password'),
    });

    const handleLogin = (navigation: any) => {
        navigation.navigate('App');
    }

    const handleRegister = (navigation: any) => {
        navigation.navigate('Register');
    }

    // Function to make login API call
    const loginUsers = async (username: string, password: string) => {
        try {
            // Make a POST request to the login endpoint with username and password
            const response = await axios.post(Rest.userLogin, {
                emailID: username,
                password: password,
            });
            // Check if the response status is successful
            if (response.status === 200) {
                return true;
            } else {
                Alert.alert('Error', 'Login failed. Please try again.');
                return false;
            }
        } catch (error) {
            console.log('Error in loginUser:', error); 
            Alert.alert('Error', 'Login failed. Please try again.');
            return false;
        }
    };

    // Formik form state and submit handler
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                // Validate form fields
                await validationSchema.validate(values, { abortEarly: false });

                // Perform login action
                const isLoggedIn = await loginUsers(values.username, values.password);
                if (isLoggedIn) {
                    loginUser();
                    formik.resetForm();
                    handleLogin(navigation);
                } else {
                    Alert.alert('Invalid credentials');
                }
            } catch (error: any) {
                console.log('error.message',error.message)
                Alert.alert(error.message);
            }
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.viewContainer}>
                <CustomLogo />
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.welcomeText}>
                        Hi Welcome Back ! 👋
                    </Text>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Text style={styles.lableText}>Email address</Text>
                    <View style={styles.fieldContainer}>
                        <TextInput
                            style={{ width: "100%" }}
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            onChangeText={formik.handleChange('username')}
                            onBlur={formik.handleBlur('username')}
                            value={formik.values.username}
                        />
                    </View>
                    {formik.touched.username && formik.errors.username &&
                        <Text style={styles.errorText}>{formik.errors.username}</Text>
                    }
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Text style={styles.lableText}>Password</Text>
                    <View style={styles.fieldContainer}>
                        <TextInput
                            style={{ width: '100%' }}
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                            value={formik.values.password}
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
                    {formik.touched.password && formik.errors.password &&
                        <Text style={styles.errorText}>{formik.errors.password}</Text>
                    }
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />
                    <Text>Remember Me</Text>
                </View>
                <CustomButton
                    title="Login"
                    filled
                    style={styles.loginBtn}
                    onPress={formik.handleSubmit}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View style={styles.dividerView} />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View style={styles.dividerView} />
                </View>
                <SocialLogins />
                <View style={styles.redirectContainer}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable onPress={() => handleRegister(navigation)}>
                        <Text style={styles.redirectText}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        marginHorizontal: 22
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: COLORS.black
    },
    lableText: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
        color: 'black'
    },
    fieldContainer: {
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10
    },
    redirectContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 22
    },
    redirectText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "bold",
        marginLeft: 6
    },
    dividerView: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10
    },
    loginBtn: {
        marginTop: 18,
        marginBottom: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 6,
        marginLeft: 6,
    },
});
export default LoginScreen;