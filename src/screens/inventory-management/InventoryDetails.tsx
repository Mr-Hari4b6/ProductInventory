import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Badge, Card } from 'react-native-paper';

import { CustomAccordion } from '../../components/CustomAccordion';
import { assets } from '../../assets';
import { Specifications } from '../product-cost-calculator/types';

const InventoryDetails = () => {
    const route = useRoute<any>();
    const { state, batchNo } = route.params;

    const { startDate, endDate, specifications, totalCost, materialDetails, machineDetails, manpowerDetails, capitalCost, profitLoss } = state;
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedWeight, setSelectedWeight] = useState<string | null>(null);

    const filteredSpecifications = specifications?.filter((spec: any) => {
        return (!selectedColor || spec.color === selectedColor) && (!selectedWeight || spec.weight === selectedWeight);
    }) || [];

    const uniqueColors: string[] = Array.from(new Set(specifications?.map((spec: { color: any; }) => spec.color)));
    const uniqueWeights: string[] = Array.from(
        new Set(
            specifications
                ?.filter((spec: { color: string }) => spec.color === selectedColor)
                .map((spec: { weight: string }) => spec.weight)
        )
    );

    useEffect(() => {
        if (!selectedColor && uniqueColors.length > 0) {
            setSelectedColor(uniqueColors[0]);
        }
        if (specifications && specifications?.length > 0) {
            const firstColorSpecs = specifications?.filter((spec: any) => spec.color === selectedColor);
            if (firstColorSpecs?.length > 0 && !selectedWeight) {
                setSelectedWeight(firstColorSpecs[0]?.weight);
            }
        }
    }, [specifications, uniqueColors, selectedColor]);


    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        const firstColorSpecs = specifications?.filter((spec: any) => spec.color === color);
        if (firstColorSpecs?.length > 0) {
            setSelectedWeight(firstColorSpecs[0]?.weight);
        }
    };

    const handleWeightChange = (weight: string) => {
        setSelectedWeight(weight);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={assets.appicon} style={styles.image} />
            <View style={styles.batchInfo}>
                <View style={styles.batchInfoDates}>
                    <Text style={styles.heading}>BatchNo: {batchNo}</Text>
                    <Text style={[styles.heading,{color:'purple'}]}>Profit/Loss: {profitLoss}</Text>
                </View>

                <View style={styles.batchInfoDates}>
                    <Text style={styles.heading}>StartDate: {startDate}</Text>
                    <Text style={styles.heading}>EndDate: {endDate}</Text>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.priceInfo}>
                    <Text style={[styles.value, { fontWeight: 'bold', color: 'black' }]}>Capital Price: {'$'}{capitalCost}</Text>
                    <Text style={[styles.value, { fontWeight: 'bold', color: 'black' }]}>Total Price: {'$'}{totalCost}</Text>
                </View>

                <Text style={styles.colorsVarientHeader}>Color Varients</Text>
                <View style={styles.colorsVarient}>
                    {uniqueColors.map((color: any, index: any) => (
                        <Badge
                            key={index}
                            size={35}
                            style={[styles.colorBadge, { backgroundColor: color.toLowerCase() }]}
                            onPress={() => handleColorChange(color)}
                        >
                            {color.toUpperCase()}
                        </Badge>
                    ))}
                </View>
                <Text style={styles.heading}>Specifications:</Text>
                <View style={styles.specificationsContainer}>
                    {filteredSpecifications?.slice(0, 1).map((spec: any, index: any) => (
                        <View key={index} style={styles.specificationContaier}>
                            <View style={styles.weightsContainer}>
                                <Text style={{ color: 'purple', fontWeight: 'bold' }}>Weights:</Text>
                                {uniqueWeights?.map((weight: any, weightIndex: any) => (
                                    <Card key={weightIndex} style={{ backgroundColor: 'lightgray', padding: 10 }} onPress={() => handleWeightChange(weight)}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{weight}</Text>
                                    </Card>
                                ))}
                            </View>
                            <View style={styles.specContainer}>
                                <Card style={styles.card}>
                                    <Text style={{ color: 'black' }}>{spec.height}</Text>
                                    <Text style={[styles.cardHeader, { color: 'black' }]}>Height</Text>
                                </Card>
                                <Card style={styles.card}>
                                    <Text style={{ color: 'black' }}>{spec.width}</Text>
                                    <Text style={[styles.cardHeader, { color: 'black' }]}>Width</Text>
                                </Card>
                            </View>
                            <View style={styles.stockContainer}>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                    <Text style={styles.heading}>Total Stock:</Text>
                                    <Text style={[styles.value, { marginTop: 12, fontWeight: 'bold', color: 'green' }]}>{spec.quantity} pieces</Text>
                                </View>
                                <View>
                                    <Text style={[styles.heading, { color: 'purple' }]}>Price: {'$'}{spec?.price}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <CustomAccordion details={materialDetails} title='Materials Details' />
                <CustomAccordion details={machineDetails} title='Machines Details' />
                <CustomAccordion details={manpowerDetails} title='Man Power Details' />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 20,
    },
    colorsVarientHeader: {
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10
    },
    batchInfo: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    priceInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    batchInfoDates: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    colorsVarient: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        gap: 5,
        flexWrap: 'wrap'
    },
    colorBadge: {
        width: 80,
        color: 'white',
        fontWeight: '500',
    },
    image: {
        height: 250,
        width: 310,
        alignSelf: 'center',
    },
    detailsContainer: {
        backgroundColor: '#F9F9F9',
        padding: 10,
    },
    value: {
        fontSize: 14,
        color: '#666666',
    },
    badge: {
        width: 60,
        color: 'white',
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginTop: 10,
    },
    specsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    specItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 5,
    },
    colorBox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        marginRight: 5,
    },
    specText: {
        fontSize: 14,
        color: '#666666',
    },
    cardHeader: {
        fontWeight: 'bold'
    },
    card: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 90,
    },
    specificationsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10,
        gap: 5
    },
    specificationContaier: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 10
    },
    weightsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5
    },
    specContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10
    },
    stockContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        justifyContent: 'space-between'
    }
});

export default InventoryDetails;
