import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { assets } from '../../assets';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen: React.FC = () => {
    
    const navigation = useNavigation();
    const { logoutUser, userInfo } = useAuth();

    // Handler for editing profile
    const handleEditProfile = () => {
        // Implement your logic for editing profile here
        Alert.alert('Comingsoon ....!')
    };

    // Handler for logging out
    const doLogout = (navigation: any) => {
        logoutUser();
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profilePictureContainer}>
                    <Image source={assets.profile} style={styles.profilePicture} />
                </View>
                <Text style={styles.title}>User Details</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>User ID:</Text>
                    <Text style={styles.value}>{userInfo?.userID}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{userInfo?.firstName}{' '}{userInfo?.lastName}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <Text style={styles.value}>{userInfo?.mobileNumber}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userInfo?.email}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Specialization:</Text>
                    <Text style={styles.value}>{userInfo?.businessType}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>{userInfo?.address}</Text>
                </View>

                {/* Edit Profile Button */}
                <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                {/* Logout Button */}
                <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => doLogout(navigation)}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profilePictureContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        elevation: 5,
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
    value: {
        flex: 2,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: 'red',
    },
});

export default ProfileScreen;
