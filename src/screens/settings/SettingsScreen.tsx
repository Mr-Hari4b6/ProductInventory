import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';

const SettingsScreen: React.FC = () => {

    const navigation = useNavigation();

  const handleChangePassword = () => {
    // Logic for changing password
    Alert.alert('Coming soon...!')
  };

  const hanldeGoback = (navigation:any) => {
    navigation.navigate('MyHome');
  }

  const handleLogout = () => {
    // Logic for logging out
    Alert.alert('Coming soon...!')
  };

  const handleEditProfile = () => {
    // Logic for editing profile
    Alert.alert('Coming soon...!')
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <Text style={{color:'blue',padding:10,fontWeight:'bold'}} onPress={()=>hanldeGoback(navigation)}>Goback to home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'whitesmoke'
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
