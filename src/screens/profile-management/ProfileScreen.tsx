import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { assets } from '../../assets';
import { useNavigation } from '@react-navigation/native';

interface UserDetails {
    name: string;
    phoneNumber: string;
    email: string;
    userId: string;
    profilePicture?: string;
    address?: string;
    specialization?: string; // New field for user specialization
}

// Static user details data
const staticUserDetails: UserDetails = {
    name: 'John Doe',
    phoneNumber: '+91 8239489243',
    email: 'john.doe@example.com',
    userId: 'JD123',
    profilePicture: 'https://example.com/profile.jpg',
    address: '123 Main St, Hyderabad, TN',
    specialization: 'Goldsmith', // Example specialization
};

const ProfileScreen: React.FC = () => {
    const userDetails = staticUserDetails;
    const navigation = useNavigation();

    // Handler for editing profile
    const handleEditProfile = () => {
        // Implement your logic for editing profile here
        Alert.alert('Comingsoon ....!')
    };

    // Handler for logging out
    const doLogout = (navigation:any)=> navigation.navigate('Login');

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                {userDetails.profilePicture && (
                    <View style={styles.profilePictureContainer}>
                        <Image source={assets.profile} style={styles.profilePicture} />
                    </View>
                )}
                <Text style={styles.title}>User Details</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>User ID:</Text>
                    <Text style={styles.value}>{userDetails.userId}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{userDetails.name}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <Text style={styles.value}>{userDetails.phoneNumber}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userDetails.email}</Text>
                </View>
                {/* Display specialization if available */}
                {userDetails.specialization && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Specialization:</Text>
                        <Text style={styles.value}>{userDetails.specialization}</Text>
                    </View>
                )}
                {/* Additional details */}
                {userDetails.address && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.value}>{userDetails.address}</Text>
                    </View>
                )}
                {/* Edit Profile Button */}
                <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                {/* Logout Button */}
                <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={()=>doLogout(navigation)}>
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
