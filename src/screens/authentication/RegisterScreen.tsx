import React, { useState } from 'react'
import {
    View,
    Text,
    Alert,
    Image,
    Pressable,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from 'react-native'
import axios from 'axios';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from "expo-checkbox"
import Button from '../../components/CustomButton';
import { SocialLogins } from '../../components/SocialLogin';
import { assets } from '../../assets';
import* as  Rest from '../../../src/utils/restapi';

type User = {
    name: string;
    email: string;
    mobileNumber: string;
    password: string
}
const RegisterScreen = ({ navigation }: any) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        mobileNumber:'',
        password: ''
    })
 
    const handleChange = (fieldName: string,value: string) => {
        setUser({...user,[fieldName]: value});
    }

    const handleRegister = () => {
        axios.post(Rest.userRegister, user).then((response) => {
            console.log('response',response);
            Alert.alert("Registration successfull", "You have been registered succesfully");
            setUser({
                name: '',
                email: '',
                mobileNumber:'',
                password: ''
            });

        }).catch((error) => {
            Alert.alert("Registration failed", "an error ocurred during registration");
            console.log("error", error)
        })
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22, marginVertical: 0 }}>
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
                <View>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginVertical: 8,
                        color: 'black'
                    }}>Name</Text>

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
                            placeholder='Enter your fullname'
                            placeholderTextColor={COLORS.black}
                            keyboardType='default'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text)=>handleChange('name',text)}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginVertical: 8,
                        color: 'black'
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
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text)=>handleChange('email',text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginVertical: 8,
                        color: 'black'
                    }}>Mobile Number</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 10
                    }}>
                        <TextInput
                            placeholder='+91'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%",
                            }}
                        />

                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "80%"
                            }}
                            onChangeText={(text)=>handleChange('mobileNumber',text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginVertical: 8,
                        color: 'black'
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
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text)=>handleChange('password',text)}
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

                {/* <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I aggree to the terms and conditions</Text>
                </View> */}

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={handleRegister}
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
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
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
                    marginVertical: 10
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

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
        marginVertical: 10,
    },
    headerImg: {
        width: 80,
        height: 50,
        alignSelf: 'center',
    },
});

export default RegisterScreen