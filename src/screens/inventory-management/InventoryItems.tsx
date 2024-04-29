import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Product {
    productID: string;
    productName: string;
    productDetails: {
        startDate: string;
        endDate: string;
        materialDetails: {
            materialName: string;
            measurementType: string;
            quantity: string;
            cost: string;
            totalCost: string;
        }[];
        machineDetails: {
            machineName: string;
            quantity: string;
            cost: string;
            totalCost: string;
        }[];
        manpowerDetails: {
            persons: string;
            cost: string;
            days: string;
            totalCost: string;
        }[];
        specifications: {
            color: string;
            weight: string;
            height: string;
            width: string;
            quantity: string;
            price: string;
        }[];
        capitalCost: string;
        totalCost: string;
        percentage: string;
        profitLoss: string;
    }[];
}


const InventoryItems = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const storedProducts = await AsyncStorage.getItem('products');
                if (storedProducts) {
                    const parsedProducts: Product[] = JSON.parse(storedProducts);
                    setProducts(parsedProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [refreshing]);

    const handleProductClick = (navigation: any, product: Product) => navigation.navigate('InventoryItemsList', { state: product });

    const getTotalQuantity = (specifications: any[]) => {
        return specifications.reduce((total, spec) => {
            return total + parseInt(spec.quantity, 10);
        }, 0);
    };

    const getTotalQuantityOfAllSpecifications = (product: Product) => {
        let totalQuantity = 0;
        product?.productDetails?.forEach((detail) => {
            totalQuantity += getTotalQuantity(detail.specifications);
        });
        return totalQuantity;
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Text style={styles.title}>Products List</Text>
            <View style={styles.row}>
                {products.length >0 ? products.map((product, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={() => handleProductClick(navigation, product)}
                    >
                        <Image source={require('../../assets/images/logo.png')} style={styles.image} />
                        <Text style={styles.productName}>{product.productName}</Text>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Prod ID:</Text>
                            <Text style={[styles.value,{fontWeight:'bold'}]}>{product.productID}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.label}>Stock:</Text>
                            <Text style={[styles.value, { color: 'green', fontWeight: 'bold' }]}>
                                {getTotalQuantityOfAllSpecifications(product)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )): <Text style={styles.noproducts}>No Products Available</Text>}
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
        marginTop: 20,
        color: 'black',
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
        marginRight: 5,
    },
    value: {
        color: '#333',
    },
    noproducts: {
        color:'red',
        fontWeight:'500',
        fontSize:20
    }
});

export default InventoryItems;
