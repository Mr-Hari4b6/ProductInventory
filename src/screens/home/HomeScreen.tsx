import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();

    const handleAddProduct = (navigation: any) => {
        navigation.navigate('ProductCost');
    };

    const handleViewSales = (navigation: any) => {
        navigation.navigate('Sales');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome <Text style={{ color: 'purple' }}>John Doe</Text>!</Text>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Revenue Summary</Text>
                    <Text>Total Revenue: $5000</Text>
                    <Text>Revenue Today: $1000</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Product Summary</Text>
                    <Text>Products in Stock: 50</Text>
                    <Text>Products Sold Today: 10</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Orders Summary</Text>
                    <Text>Total Orders: 20</Text>
                    <Text>Orders Today: 5</Text>
                </Card.Content>
            </Card>

            <View style={styles.buttonContainer}>
                <Button title='Add Product' color='purple' onPress={() => handleAddProduct(navigation)} />
                <Button title='View Sales' color='black' onPress={() => handleViewSales(navigation)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        marginVertical: 10,
        width: '100%',
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        marginVertical: 10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        gap:10,
    },
});

export default HomeScreen;
