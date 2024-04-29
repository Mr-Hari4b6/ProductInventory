import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import * as Rest from '../../utils/restapi';
import COLORS from '../../constants/colors';
import Button from '../../components/CustomButton';
import { SocialLogins } from '../../components/SocialLogin';
import { CustomLogo } from '../../components/CustomLogo';
import { useAuth } from '../../context/AuthContext';

interface ValidationSchema {
    fields: {
        [key: string]: any;
    };
}

interface Formik {
    values: {
        [key: string]: any;
    };
    handleChange: (name: string) => (text: string) => void;
    touched: {
        [key: string]: boolean;
    };
    errors: {
        [key: string]: string | undefined;
    };
}

const RegisterScreen = ({ navigation }: any) => {
    const [isChecked, setIsChecked] = useState(false);
    const [page, setPage] = useState(1);
    const { storeUserInformation } = useAuth();

    const validationSchemaStep1: ValidationSchema = Yup.object().shape({
        firstName: Yup.string().required('Firstname is required'),
        lastName: Yup.string().required('Lastname is required'),
        email: Yup.string().email('Invalid email').required('Email ID is required'),
        mobileNumber: Yup.string().required('Mobile number is required').matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'Password must contain at least 8 characters, including one letter and one number'
            ),
    });

    const validationSchemaStep2: ValidationSchema = Yup.object().shape({
        businessType: Yup.string().required('Business type is required'),
        businessName: Yup.string().required('Business name is required'),
        address: Yup.string().required('Address is required'),
    });

    const formikStep1 = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            password: '',
        },
        validationSchema: validationSchemaStep1,
        onSubmit: () => {
            setPage(2);
        }
    });

    const formikStep2 = useFormik({
        initialValues: {
            businessType: '',
            businessName: '',
            address: '',
        },
        validationSchema: validationSchemaStep2,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(Rest.userRegister, {
                    firstName: formikStep1.values.firstName,
                    lastName: formikStep1.values.lastName,
                    emailID: formikStep1.values.email,
                    password: formikStep1.values.password,
                    mobileNumber: formikStep1.values.mobileNumber,
                    countryCode: '+91',
                    businessType: values.businessType,
                    businessName: values.businessName,
                    addressLine1: values.address,
                });
                // Store user information
              
                await storeUserInformation({
                    userID: response.data.data.userID,
                    firstName: formikStep1.values.firstName,
                    lastName: formikStep1.values.lastName,
                    email: formikStep1.values.email,
                    mobileNumber: formikStep1.values.mobileNumber,
                    businessType: formikStep2.values.businessType,
                    businessName: formikStep2.values.businessName,
                    address: formikStep2.values.address,
                });
              
                Alert.alert('Success', 'Registration successful', [
                    {
                        text: 'OK',
                        onPress: () => {
                            formikStep1.resetForm();
                            setPage(1);
                        }
                    }
                ]);
            } catch (error) {
                console.error('Registration error:', error);
                Alert.alert('Error', 'Registration failed');
            }
        }
    });

    const handleContinue = () => {
        if (page === 1) {
            // Check if the form values are valid
            formikStep1.validateForm().then((errors) => {
                if (Object.keys(errors).length === 0) {
                    // No validation errors, move to the next page
                    setPage(2);
                } else {
                    // Mark all fields as touched to display validation errors
                    formikStep1.setTouched({
                        firstName: true,
                        lastName: true,
                        email: true,
                        mobileNumber: true,
                        password: true,
                    });
                }
            });
        }
    };


    const renderFormFields = (formik: Formik, validationSchema: ValidationSchema) => {
        return Object.keys(validationSchema.fields).map((fieldName, index) => {
            // Transform the field name to have the first character capitalized and the rest lowercase
            const formattedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();

            return (
                <View key={index} style={{ marginBottom: 2 }}>
                    <Text style={styles.labelText}>{formattedFieldName}</Text>
                    <View style={styles.fieldContainer}>
                        <TextInput
                            placeholder={`Enter your ${formattedFieldName.toLowerCase()}`}
                            onChangeText={formik.handleChange(fieldName)}
                            value={formik.values[fieldName]}
                            style={{ width: '100%' }}
                            {...(fieldName === 'email' && { keyboardType: 'email-address' })}
                            {...(fieldName === 'password' && { secureTextEntry: true })}
                            {...(fieldName === 'address' && { multiline: true })}
                        />
                    </View>
                    {formik.touched[fieldName] && formik.errors[fieldName] &&
                        <Text style={styles.errorText}>{formik.errors[fieldName]}</Text>
                    }
                </View>
            );
        });
    };


    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.registerContainer}>
                <CustomLogo />
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black', marginTop: 10, marginBottom: 10 }}>Create Account</Text>
                    {page === 1 && (
                        <View>
                            {renderFormFields(formikStep1 as any, validationSchemaStep1)}
                            <Button
                                title="Continue"
                                filled
                                onPress={handleContinue}
                                style={styles.button}
                            />
                        </View>
                    )}
                    {page === 2 && (
                        <View>
                            {renderFormFields(formikStep2 as any, validationSchemaStep2)}
                            <Button
                                title="Sign Up"
                                filled
                                onPress={formikStep2.handleSubmit}
                                style={styles.button}
                            />
                            <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                                <Checkbox
                                    style={{ marginRight: 8 }}
                                    value={isChecked}
                                    onValueChange={setIsChecked}
                                    color={isChecked ? COLORS.primary : undefined}
                                />
                                <Text>I agree to the terms and conditions</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                                <View style={styles.dividerView} />
                                <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                                <View style={styles.dividerView} />
                            </View>
                            <SocialLogins />
                        </View>
                    )}
                    <View style={styles.redirectContainer}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.redirectText}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        marginHorizontal: 22,
        marginVertical: 0
    },
    button: {
        marginTop: 18,
        marginBottom: 4,
    },
    fieldContainer: {
        width: "100%",
        height: 45,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10
    },
    labelText: {
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 5,
        color: 'black'
    },
    countryCode: {
        width: "12%",
        borderRightWidth: 1,
        borderLeftColor: COLORS.grey,
        height: "100%",
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 3,
        marginLeft: 4,
    },
    dividerView: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10
    },
    redirectContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10
    },
    redirectText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "bold",
        marginLeft: 6
    }
});

export default RegisterScreen;
