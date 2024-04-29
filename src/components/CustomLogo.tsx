import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { assets } from "../assets";

export const CustomLogo = () => {
    return (
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
})