import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ProductData {
    productName: string;
    batchNumber: string;
    units: number;
    costPerUnit: number;
    totalUnitsSold: number;
}

interface ProfitLossData {
    month: string;
    products: ProductData[];
    investment: number;
    sales: number;
}

const FinanceScreen: React.FC = () => {
    const profitLossData: ProfitLossData[] = [
        {
            month: 'March',
            investment: 4000,
            sales: 6000,
            products: [
                { productName: 'Product A', batchNumber: '001', units: 10, costPerUnit: 50, totalUnitsSold: 8 },
                { productName: 'Product B', batchNumber: '002', units: 20, costPerUnit: 40, totalUnitsSold: 15 },
            ],
        },
        {
            month: 'February',
            investment: 3500,
            sales: 5500,
            products: [
                { productName: 'Product A', batchNumber: '003', units: 8, costPerUnit: 55, totalUnitsSold: 5 },
                { productName: 'Product C', batchNumber: '004', units: 15, costPerUnit: 35, totalUnitsSold: 10 },
            ],
        },
        {
            month: 'January',
            investment: 3000,
            sales: 2000,
            products: [
                { productName: 'Product B', batchNumber: '005', units: 5, costPerUnit: 45, totalUnitsSold: 3 },
                { productName: 'Product C', batchNumber: '006', units: 10, costPerUnit: 30, totalUnitsSold: 6 },
            ],
        },
    ];

    return (
        <ScrollView style={styles.container}>

            {/* Investment Details */}
            <Text style={styles.title}>Capital Details</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.columnHeader}>Month</DataTable.Title>
                    <DataTable.Title numeric style={styles.columnHeader}>Investment</DataTable.Title>
                    <DataTable.Title numeric style={styles.columnHeader}>Sales</DataTable.Title>
                    <DataTable.Title numeric style={styles.columnHeader}>Profit/Loss</DataTable.Title>
                </DataTable.Header>

                {profitLossData.map((data, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell style={styles.cell}>{data.month}</DataTable.Cell>
                        <DataTable.Cell numeric style={styles.cell}>${data.investment}</DataTable.Cell>
                        <DataTable.Cell numeric style={styles.cell}>${data.sales}</DataTable.Cell>
                        <DataTable.Cell numeric style={styles.cell}>
                            <Text style={{ color: data.sales > data.investment ? '#00FF00' : '#FF0000' }}>
                                ${data.sales - data.investment} {'  '}
                                {data.sales > data.investment ? (
                                    <Icon name="arrow-up" size={16} color="#00FF00" />
                                ) : (
                                    <Icon name="arrow-down" size={16} color="#FF0000" />
                                )}
                            </Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>

            {/* Month-wise Product Data */}
            <Text style={styles.title}>Month-wise Product Data</Text>
            {profitLossData.map((data, index) => (
                <View key={index}>
                    <Text style={styles.subtitle}>{data.month}</Text>
                    <ScrollView horizontal>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title style={styles.columnHeader}>Product Name</DataTable.Title>
                                <DataTable.Title style={styles.columnHeader}>Batch No.</DataTable.Title>
                                <DataTable.Title numeric style={styles.columnHeader}>Units</DataTable.Title>
                                <DataTable.Title numeric style={styles.columnHeader}>Cost/Unit</DataTable.Title>
                                <DataTable.Title numeric style={styles.columnHeader}>Total Units Sold</DataTable.Title>
                                <DataTable.Title numeric style={styles.columnHeader}>Total Cost</DataTable.Title>
                                <DataTable.Title numeric style={styles.columnHeader}>Profit/Loss</DataTable.Title>
                            </DataTable.Header>

                            {data.products.map((product, idx) => (
                                <DataTable.Row key={idx}>
                                    <DataTable.Cell style={styles.cell}>{product.productName}</DataTable.Cell>
                                    <DataTable.Cell style={styles.cell}>{product.batchNumber}</DataTable.Cell>
                                    <DataTable.Cell numeric style={styles.cell}>{product.units}</DataTable.Cell>
                                    <DataTable.Cell numeric style={styles.cell}>${product.costPerUnit}</DataTable.Cell>
                                    <DataTable.Cell numeric style={styles.cell}>{product.totalUnitsSold}</DataTable.Cell>
                                    <DataTable.Cell numeric style={styles.cell}>${product.units * product.costPerUnit}</DataTable.Cell>
                                    <DataTable.Cell numeric style={styles.cell}>
                                        <Text style={{ color: product.totalUnitsSold * product.costPerUnit > data.investment ? '#00FF00' : '#FF0000' }}>
                                            ${product.totalUnitsSold * product.costPerUnit - data.investment} {'  '}
                                            {product.totalUnitsSold * product.costPerUnit > data.investment ? (
                                                <Icon name="arrow-up" size={16} color="#00FF00" />
                                            ) : (
                                                <Icon name="arrow-down" size={16} color="#FF0000" />
                                            )}
                                        </Text>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    </ScrollView>
                </View>
            ))}


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        height: '120%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop:10,
        color: 'purple'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    columnHeader: {
        paddingHorizontal: 5, // Add padding between column names
    },
    cell: {
        paddingHorizontal: 5, // Add padding to align cell content with column headers
    },
});

export default FinanceScreen;
