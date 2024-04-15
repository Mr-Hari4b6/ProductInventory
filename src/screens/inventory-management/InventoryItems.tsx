import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Product {
    id: string;
    productName: string;
    specifications: { quantity: number }[];
}

const InventoryItems = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const goToInventoryDetails = (navigation: any, item: any) => {
        navigation.navigate('InventoryDetails', { state: item });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const storedProducts = await AsyncStorage.getItem('products');
                if (storedProducts) {
                    const parsedProducts: Product[] = JSON.parse(storedProducts);
                    setProducts(parsedProducts);
                    setSelectedProduct(parsedProducts.length > 0 ? parsedProducts[0].productName : ''); // Select the first product by default
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();

        // Cleanup function to reset active button index when component unmounts
        return () => {
            setActiveButtonIndex(0);
        };
    }, [refreshing]);

    const filterProductsByType = (type: string, index: number) => {
        setSelectedProduct(type); // Update selected product type
        setActiveButtonIndex(index);

        // Scroll to the selected button
        if (scrollViewRef.current) {
            const buttonWidth = 150; // Adjust based on your button width
            const offset = index * buttonWidth;
            scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
        }
    };

    const filteredProducts = products.filter((product) => product.productName === selectedProduct);
    // Get unique product names
    const uniqueProductNames = Array.from(new Set(products.map((product) => product.productName)));

    return (
        <ScrollView contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Text style={styles.title}>Inventory Details</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
                <View style={styles.buttonsContainer}>
                    {/* Render unique buttons */}
                    {uniqueProductNames.map((productName, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.button,
                                activeButtonIndex === index && styles.activeButton
                            ]}
                            onPress={() => filterProductsByType(productName, index)}
                        >
                            <Text style={[styles.buttonText, activeButtonIndex === index && styles.activeButtonText]}>{productName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.row}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <TouchableOpacity key={index} style={styles.card} onPress={() => goToInventoryDetails(navigation, product)}>
                            <Text style={{ fontWeight: 'bold' }}>{`#${index + 1}`}</Text>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={styles.image}
                            />
                            <Text style={styles.productName}>{product?.productName}</Text>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.label}>Prod ID:</Text>
                                <Text style={styles.value}>{product?.id}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.label}>Stock:</Text>
                                <Text style={[styles.value, { color: 'green', fontWeight: 'bold' }]}>{product?.specifications[0]?.quantity}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noProducts}>No Products Available</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'purple',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#FFF',
        padding: 5,
        marginBottom: 5,
        elevation: 5,
        width: '49%',
        borderRadius: 5,
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 5,
        borderRadius: 10,
        alignSelf: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        alignSelf: 'center',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        color: '#666',
        marginRight: 5
    },
    value: {
        color: '#333',
    },
    noProducts: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    activeButton: {
        backgroundColor: 'purple',
        borderColor: 'white',
    },
    activeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
});

export default InventoryItems;
