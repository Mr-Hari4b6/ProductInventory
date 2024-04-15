import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { HELPERS } from '../../constants';
import { Sale, sales } from './sales';

const SalesDashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'day' | 'week' | 'month'>('day');
  const [allSalesData] = useState<Sale[]>(sales);
  const [salesData, setSalesData] = useState<Sale[]>(allSalesData);

  const handleFilterChange = (filter: 'day' | 'week' | 'month') => {
    setSelectedFilter(filter);
    switch (filter) {
      case 'day':
        setSalesData(allSalesData.filter(sale => {
          const saleDate = new Date(sale.date);
          const today = new Date();
          return saleDate.getFullYear() === today.getFullYear() && 
            saleDate.getMonth() === today.getMonth() && 
            saleDate.getDate() === today.getDate();
        }));
        break;
      case 'week':
        setSalesData(allSalesData.filter(sale => {
          const saleDate = new Date(sale.date);
          const today = new Date();
          const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return saleDate > oneWeekAgo && saleDate <= today;
        }));
        break;
      case 'month':
        setSalesData(allSalesData.filter(sale => {
          const saleDate = new Date(sale.date);
          const today = new Date();
          return saleDate.getFullYear() === today.getFullYear() && 
            saleDate.getMonth() === today.getMonth();
        }));
        break;
      default:
        break;
    }
  };

  const calculateTotalSales = (): number => {
    return salesData.reduce((total, sale) => total + sale.amount, 0);
  };

  const getTotalSalesLabel = (): string => {
    const totalSales = calculateTotalSales();
    //const profitOrLoss = totalSales >= 0 ? 'Profit' : 'Loss';
    return `Total Sales: $${Math.abs(totalSales)}`;
  };

  useEffect(() => {
    // Apply default filter of 'day' when component mounts
    handleFilterChange('day');
  }, []);
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: salesData?.map((sale, index) => (index % 2 === 0 ? HELPERS.formatDate(sale.date) : '')),
          datasets: [{ data: salesData?.map((sale) => sale.amount) }],
        }}
        width={360}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />
      <Text style={styles.totalSalesLabel}>{getTotalSalesLabel()}</Text>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleFilterChange('day')}>
          <Text style={[styles.filterText, selectedFilter === 'day' && styles.selectedFilter]}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('week')}>
          <Text style={[styles.filterText, selectedFilter === 'week' && styles.selectedFilter]}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('month')}>
          <Text style={[styles.filterText, selectedFilter === 'month' && styles.selectedFilter]}>Month</Text>
        </TouchableOpacity>
      </View>
      {/* Sales Details */}
      <FlatList
        data={salesData}
        renderItem={({ item }) => (
          <View style={styles.saleItem}>
            <Text>{item.date}</Text>
            <Text>${item.amount}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    padding:5
  },
  selectedFilter: {
    fontWeight: 'bold',
    backgroundColor: 'orange',
    width: 100,
    height:40,
    padding:5
  },
  chart: {
    margin: 5,
    paddingHorizontal:5,
    alignSelf:'center',
  },
  saleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal:10,
    borderBottomWidth: 1,
  },
  totalSalesLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default SalesDashboard;
