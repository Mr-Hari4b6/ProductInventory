import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ProductDetail } from './types';
import { assets } from '../../assets';

const InventoryItemsList = () => {

    const route = useRoute<any>();

    const navigation = useNavigation();

    const { state } = route.params;

    const { productDetails, productID, productName } = state;

    const handleProductClick = (navigation: any, product: ProductDetail, batchNo: number) => navigation.navigate('InventoryDetails', { state: product, batchNo: batchNo });

    const getProfitLossColor = (profitLoss: string) => {
        if (profitLoss.includes('Profit')) {
            return 'green';
        } else if (profitLoss.includes('Loss')) {
            return 'red';
        }
        return 'black';
    };

    return (
        <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.title}>{productName}</Text>
                <Text style={styles.title}>{productID}</Text>
            </View>

            {productDetails?.map((details: ProductDetail, index: number) => (
                <TouchableWithoutFeedback key={index} onPress={() => handleProductClick(navigation, details, index + 1)}>
                    <LinearGradient
                        colors={['#87CEEB', '#FFDAB9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.card}
                    >
                        <View style={styles.cardContainer}>
                            <Image
                                style={styles.image}
                                source={assets.appicon}
                                resizeMode="contain"
                            />
                            <View style={{display:'flex',flexDirection:'column'}}>
                                <View style={styles.header}>
                                    <Text style={styles.batchNumber}>Batch Number: {index + 1}</Text>
                                </View>
                                <View style={styles.detailsContainer}>
                                    <View style={styles.costContainer}>
                                        <Text style={styles.detail}>Capital Cost: ${details.capitalCost}</Text>
                                        <Text style={styles.detail}>Total Cost: ${details.totalCost}</Text>
                                    </View>
                                    <View style={styles.dateContainer}>
                                        <Text style={styles.detail}>Start Date: {details.startDate}</Text>
                                        <Text style={styles.detail}>End Date: {details.endDate}</Text>
                                    </View>
                                    <Text style={[styles.detail,{color: getProfitLossColor(details.profitLoss)}]}>Profit/Loss: {details.profitLoss}</Text>
                                </View>
                            </View>

                        </View>


                    </LinearGradient>
                </TouchableWithoutFeedback>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 13,
        color: 'purple',
    },
    card: {
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation:7
    },
    cardContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        gap:10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    batchNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'purple'
    },
    image: {
        width: 100,
        height: 100,
    },
    detailsContainer: {
        marginTop: 10,
    },
    costContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 5,
        color: 'black',
        gap:5
    },
    dateContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 5,
        color: 'black',
        fontWeight: '500',
        gap:5
    },
    detail:{
        color:'black',
        fontWeight:'500'
    }

});

export default InventoryItemsList;
