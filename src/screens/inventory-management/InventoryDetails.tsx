import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Specifications } from '../product-cost-calculator/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { assets } from '../../assets';
import { Badge, Card } from 'react-native-paper';

interface InventoryDetailsProps {
    id?: string;
    productName?: string;
    specifications?: Specifications[];
    baseCost?: string;
    totalCost?: string;
    createdDate?: string;
}

const InventoryDetails: React.FC<InventoryDetailsProps> = () => {
    const route = useRoute<any>();
    const { state } = route.params;

    const {
        id,
        productName,
        specifications,
        baseCost,
        totalCost,
        createdDate,
    } = state;

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedWeight, setSelectedWeight] = useState<string | null>(null);

    useEffect(() => {
        if (specifications && specifications.length > 0) {
            setSelectedColor(specifications[0].color);
            setSelectedWeight(specifications[0].weight)
        }
    }, [specifications]);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    const handleWeightChange = (weight: string) => {
        setSelectedWeight(weight);
    };

    const filteredSpecifications = specifications?.filter((spec: { color: string; weight: any; }) => {
        return (!selectedColor || spec.color === selectedColor) && (!selectedWeight || spec.weight === selectedWeight);
    }) || [];

    const uniqueColors = Array.from(new Set(specifications?.map((spec: { color: any; }) => spec.color)));
    const uniqueWeights = Array.from(
        new Set(
            specifications
                ?.filter((spec: { color: string }) => spec.color === selectedColor)
                .map((spec: { weight: string }) => spec.weight)
        )
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{productName} Details</Text>
            <Image source={assets.appicon} style={styles.image} />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 }}>
                <Text style={styles.heading}>ID:</Text>
                <Text style={[styles.value, { marginTop: 12, color: 'purple', fontWeight: '500' }]}>{id}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.value, { fontWeight: 'bold' }]}>{productName}</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]}>{'$'}{totalCost}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 10, gap: 5 }}>
                    {uniqueColors.map((color: any, index: any) => (
                        <Badge key={index} size={35} style={{ width: 70, color: 'white', fontWeight: '400', backgroundColor: color.toLowerCase() }} onPress={() => handleColorChange(color)}>
                            {color}
                        </Badge>
                    ))}
                </View>

                <Text style={styles.heading}>Specifications:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10, gap: 5 }} >

                    {filteredSpecifications?.map((spec: any, index: any) => (
                        <View key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 10, gap: 5 }}>
                                <Text style={{ color: 'purple', fontWeight: 'bold' }}>Weigths:</Text>
                                {uniqueWeights.map((weight: any, index: any) => (
                                    <Card key={index} style={{ backgroundColor: 'lightgray', padding: 10 }} onPress={() => handleWeightChange(weight)}>
                                        <Text style={{ fontWeight: 'bold' }}>{weight}</Text>
                                    </Card>
                                ))}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 10,width:'100%',justifyContent:'space-between' }}>
                                <View style={{display:'flex',flexDirection:'row', gap: 10}}>
                                    <Text style={styles.heading}>Total Stock:</Text>
                                    <Text style={[styles.value, { marginTop: 12, fontWeight: 'bold', color: 'green' }]}>{spec.quantity} pices</Text>
                                </View>
                                <View>
                                  <Text style={styles.heading}>Price:{spec?.price}</Text>

                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
                                <Card style={styles.card}>
                                    <Text>{spec.height}</Text>
                                    <Text style={styles.cardHeader}>Height</Text>
                                </Card>
                                <Card style={styles.card}>
                                    <Text>{spec.width}</Text>
                                    <Text style={styles.cardHeader}>Width</Text>
                                </Card>
                            </View>

                        </View>
                    ))}
                </View>
                <Text style={styles.heading}>Created Date:</Text>
                <Text style={styles.value}>{createdDate}</Text>
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
        fontSize: 16,
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
});

export default InventoryDetails;
