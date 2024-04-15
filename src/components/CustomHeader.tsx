import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderComponent = () => {
    const navigation = useNavigation();
    const [searcQuery,setSearchQuery] = useState('');

    const handleMenuPress = () => {
        navigation.openDrawer();
    };

    const handleCartClick = (navigation:any) => {
        navigation.navigate('Cart');
    }
    return (
        <Appbar.Header>
            <Appbar.Action icon="menu" onPress={handleMenuPress}  />
            <View style={styles.searchContainer}>
                <Searchbar placeholder="Search" value={searcQuery} onChangeText={setSearchQuery}/>
            </View>
            <Appbar.Action icon={() => <Icon name="shopping-cart" size={20} />} onPress={() => handleCartClick(navigation)} />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        marginRight: 16,
    },
});

export default HeaderComponent;
