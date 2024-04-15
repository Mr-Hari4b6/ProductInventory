import React, { useState } from 'react';
import { RefreshControl, ScrollView, Switch } from 'react-native';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import moment from 'moment';
import { MachineData, ManPowerData, MaterialData, Specifications } from './types';
import { machineFormFields, manPowerFormFields, materialFormFields, specificationsFormFields } from './fields';
import { SpecificationsForm } from './SpecificationsForm';
import { ProductInventoryForm } from './ProductInventoryForm';
import { useNavigation } from '@react-navigation/native';

// Function to generate unique IDs
const generateUniqueID = (lastID: string | null): string => {
  let sequenceNumber = lastID ? parseInt(lastID.split('PRODINVOT')[1]) + 1 : 1;
  const paddedSequence = sequenceNumber.toString().padStart(3, '0');
  return `PRODINVOT${paddedSequence}`;
};

const ProductCostCalculator: React.FC = () => {

  const navigation = useNavigation();

  const [includePercentage, setIncludePercentage] = useState(false);
  const [percentage, setPercentage] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [productName, setProductName] = useState('');

  const [materialDetails, setMaterialDetails] = useState<MaterialData[]>([]);
  const [machineDetails, setMachineDetails] = useState<MachineData[]>([]);
  const [manpowerDetails, setManpowerDetails] = useState<ManPowerData[]>([]);
  const [specifications, setSpecifications] = useState<Specifications[]>([]);

  const calculateTotalCost = (): number => {
    let totalCost = 0;

    // Calculate material cost
    for (const material of materialDetails) {
      const materialCost = parseFloat(material.cost) * parseInt(material.quantity);
      totalCost += isNaN(materialCost) ? 0 : materialCost;
    }

    // Calculate machine cost
    for (const machine of machineDetails) {
      const machineCost = parseFloat(machine.cost) * parseInt(machine.quantity);
      totalCost += isNaN(machineCost) ? 0 : machineCost;
    }

    // Calculate manpower cost
    for (const manpower of manpowerDetails) {
      const manpowerCost = parseFloat(manpower.cost) * parseInt(manpower.persons) * parseInt(manpower.days);
      totalCost += isNaN(manpowerCost) ? 0 : manpowerCost;
    }

    // Add percentage
    if (includePercentage) {
      const percentageValue = parseFloat(percentage);
      totalCost += isNaN(percentageValue) ? 0 : (totalCost * (percentageValue / 100));
    }

    return totalCost;
  };

  const handleSubmit = async (navigation:any) => {
    // Calculate total cost and base cost
    const newTotalCost = calculateTotalCost();
    const baseCost = includePercentage ? newTotalCost / (1 + parseFloat(percentage) / 100) : newTotalCost;
  
    // Retrieve existing products from AsyncStorage
    const existingProductsJSON = await AsyncStorage.getItem('products');
    const existingProducts = existingProductsJSON ? JSON.parse(existingProductsJSON) : [];
  
    console.log('***',existingProducts)
    // Generate a new ID
    const lastID = existingProducts.length > 0 ? existingProducts[existingProducts.length - 1].id : null;
    const newID = generateUniqueID(lastID);
  
    // Create the new product object
    const product = {
      id: newID,
      productName,
      materialDetails,
      machineDetails,
      manpowerDetails,
      specifications,
      includePercentage,
      percentage: includePercentage ? percentage + '%' : '',
      baseCost: baseCost.toFixed(2),
      totalCost: newTotalCost.toFixed(2),
      createdDate: moment().format('DD/MM/YYYY hh:mm:s')
    };
  
    try {
      // Update AsyncStorage with the new product
      await AsyncStorage.setItem('products', JSON.stringify([...existingProducts, product]));
  
      // Reset form fields and states after saving
      setMachineDetails([]);
      setManpowerDetails([]);
      setMaterialDetails([]);
      setSpecifications([]);
      setTotalCost(0);
      setIncludePercentage(false);
      setProductName('');
      navigation.navigate('MyHome')
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Product Cost Details</Text>
        <View>
          <TextInput
            placeholder="Type something"
            label='Product Name'
            mode='outlined'
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        <ProductInventoryForm
          formFields={materialFormFields}
          title="Material Details"
          buttonTitle="Add Material Details"
          details={materialDetails}
          setDetails={setMaterialDetails}
          columns={['Material', 'Measument', 'Quantity', 'Cost', 'Total Cost']}
        />
        <ProductInventoryForm
          formFields={machineFormFields}
          title="Machine Details"
          buttonTitle="Add Machine Details"
          details={machineDetails}
          setDetails={setMachineDetails}
          columns={['Machine', 'Quantity', 'Cost', 'Total Cost']}
        />
        <ProductInventoryForm
          formFields={manPowerFormFields}
          title="Manpower Details"
          buttonTitle="Add Manpower Details"
          details={manpowerDetails}
          setDetails={setManpowerDetails}
          columns={['Persons', 'Cost/Day', 'Days', 'Total Cost']}
        />

        <SpecificationsForm details={specifications} setDetails={setSpecifications} />

        <View style={styles.section}>
          <Text>Total Cost: {totalCost}</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Text>Include Percentage</Text>
          <Switch
            value={includePercentage}
            onValueChange={setIncludePercentage}
          />
        </View>
        {includePercentage && (
          <TextInput
            placeholder="Percentage"
            keyboardType="numeric"
            value={percentage}
            onChangeText={setPercentage}
            style={styles.input}
          />
        )}
        <Button title="Submit" onPress={()=>handleSubmit(navigation)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: 'purple',
    fontWeight: '600',
    marginBottom: 10
  },
  section: {
    marginBottom: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'purple',
    marginBottom: 10,
  },
});

export default ProductCostCalculator;
