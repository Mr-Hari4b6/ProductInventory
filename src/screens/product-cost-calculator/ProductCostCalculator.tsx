import React, { useState } from 'react';
import { Alert, RefreshControl, ScrollView, Switch } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { MachineData, ManPowerData, MaterialData, Specifications } from './types';
import { machineFormFields, manPowerFormFields, materialFormFields } from './fields';
import { SpecificationsForm } from './SpecificationsForm';
import { ProductInventoryForm } from './ProductInventoryForm';

// Function to generate unique IDs
const generateUniqueID = (lastID?: string | null): string => {
  let sequenceNumber = lastID ? parseInt(lastID?.split('PRODINVOT')[1]) + 1 : 1;
  const paddedSequence = sequenceNumber.toString().padStart(3, '0');
  return `PRODINVOT${paddedSequence}`;
};

interface ProductionPeriod {
  startDate: string;
  endDate: string
}
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
  const [refreshing, setRefreshing] = React.useState(false);

  // Add two state variables for start and end dates
  const [showStartDateModel, setShowStartDateModel] = useState(false);
  const [showEndDateModel, setShowEndDateModel] = useState(false)
  const [productionPeriod, setProductionPeriod] = useState<ProductionPeriod>({ startDate: '', endDate: '' });

  const handlConfirm = (date: any, fieldName: 'startDate' | 'endDate') => {
    setProductionPeriod({ ...productionPeriod, [fieldName]: date })
  };

  // Function to check if any required state is empty
  const checkEmptyStates = (): string[] => {
    const missingDetails: string[] = [];

    if (!productName) {
      missingDetails.push('Product Name');
    }

    if (!productionPeriod.startDate) {
      missingDetails.push('Start Date');
    }

    if (!productionPeriod.endDate) {
      missingDetails.push('End Date');
    }

    if (materialDetails.length === 0) {
      missingDetails.push('Material Details');
    }

    if (machineDetails.length === 0) {
      missingDetails.push('Machine Details');
    }

    if (manpowerDetails.length === 0) {
      missingDetails.push('Manpower Details');
    }

    if (specifications.length === 0) {
      missingDetails.push('Specifications');
    }

    return missingDetails;
  };
  // Function to calculate the total cost from specifications table
  const calculateSpecificationsTotalCost = (): number => {
    let specificationsTotalCost = 0;
    for (const spec of specifications) {
      const specCost = parseFloat(spec.price) * parseInt(spec.quantity);
      specificationsTotalCost += isNaN(specCost) ? 0 : specCost;
    }
    return specificationsTotalCost;
  };
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

  // const handleSubmit = async (navigation: any) => {
  //   const missingDetails = checkEmptyStates();

  //    // Calculate total cost and base cost
  //    const newTotalCost = calculateTotalCost();
  //    const saleCost = calculateSpecificationsTotalCost();
  //    const baseCost = includePercentage ? newTotalCost / (1 + parseFloat(percentage) / 100) : newTotalCost;
  //    // Retrieve existing products from AsyncStorage
  //    const existingProductsJSON = await AsyncStorage.getItem('products');
  //    const existingProducts = existingProductsJSON ? JSON.parse(existingProductsJSON) : [];
 
  //    // Find the index of the existing product in the array
  //    const existingProductIndex = existingProducts.findIndex((product: any) => product.productName === productName);
 
  //    const lastID = existingProducts.length > 0 ? existingProducts[existingProducts.length - 1].productID : null;
  //    const newID = generateUniqueID(lastID);
 
  //    console.log('#########',lastID,newID)
  //   if (missingDetails.length > 0) {
  //     Alert.alert(`Please fill in the following details: ${missingDetails.join(', ')}`);
  //     return;
  //   }

   
  //   // Create the product detail object
  //   const productDetail = {
  //     startDate: moment(productionPeriod.startDate).format('DD/MM/YYYY'),
  //     endDate: moment(productionPeriod.endDate).format('DD/MM/YYYY'),
  //     materialDetails,
  //     machineDetails,
  //     manpowerDetails,
  //     specifications,
  //     capitalCost: baseCost.toFixed(2),
  //     totalCost: newTotalCost.toFixed(2),
  //     percentage: includePercentage ? percentage + '%' : '',
  //     profitLoss: saleCost < newTotalCost ? `Loss of $${(newTotalCost - saleCost).toFixed(2)}` :
  //       (saleCost > newTotalCost ? `Profit of $${(saleCost - newTotalCost).toFixed(2)}` : 'No profit or loss')
  //   };

  //   // If the product exists, update its details, otherwise create a new product object
  //   if (existingProductIndex !== -1) {
  //     existingProducts[existingProductIndex].productDetails.push(productDetail);
  //   } else {
  //     const newProduct = {
  //       productID: newID,
  //       productName,
  //       productDetails: [productDetail]
  //     };
  //     existingProducts.push(newProduct);
  //   }

  //   // Determine the message for the confirmation alert
  //   let message = '';
  //   if (saleCost < newTotalCost) {
  //     const lossAmount = newTotalCost - saleCost;
  //     message = `You will incur a loss of $${lossAmount.toFixed(2)}.`;
  //   } else if (saleCost > newTotalCost) {
  //     const profitAmount = saleCost - newTotalCost;
  //     message = `You will gain a profit of $${profitAmount.toFixed(2)}.`;
  //   } else {
  //     message = 'Your costs are balanced, no profit or loss.';
  //   }

  //   // Show confirmation alert with options to confirm or cancel
  //   Alert.alert(
  //     'Confirm Submission',
  //     message,
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => {
  //           console.log('Submission canceled');
  //         },
  //         style: 'cancel'
  //       },
  //       {
  //         text: 'Confirm',
  //         onPress: async () => {
  //           try {
  //             // Update AsyncStorage with the updated or new products array
  //             await AsyncStorage.setItem('products', JSON.stringify(existingProducts));
  //             // Reset form fields and states after saving
  //             setMachineDetails([]);
  //             setManpowerDetails([]);
  //             setMaterialDetails([]);
  //             setSpecifications([]);
  //             setTotalCost(0);
  //             setIncludePercentage(false);
  //             setProductName('');
  //             setProductionPeriod({ startDate: '', endDate: '' });
  //             navigation.navigate('MyHome');
  //           } catch (error) {
  //             console.error('Error saving product:', error);
  //           }
  //         }
  //       }
  //     ]
  //   );
  // };

  const handleSubmit = async (navigation: any) => {
    const missingDetails = checkEmptyStates();

    // Calculate total cost and base cost
    const newTotalCost = calculateTotalCost();
    const saleCost = calculateSpecificationsTotalCost();
    const baseCost = includePercentage ? newTotalCost / (1 + parseFloat(percentage) / 100) : newTotalCost;

    // Retrieve existing products from AsyncStorage
    const existingProductsJSON = await AsyncStorage.getItem('products');
    const existingProducts = existingProductsJSON ? JSON.parse(existingProductsJSON) : [];

    // Find the index of the existing product in the array
    const existingProductIndex = existingProducts.findIndex((product: any) => product.productName === productName);

    if (missingDetails.length > 0) {
        Alert.alert(`Please fill in the following details: ${missingDetails.join(', ')}`);
        return;
    }

    // Create the product detail object
    const productDetail = {
        startDate: moment(productionPeriod.startDate).format('DD/MM/YYYY'),
        endDate: moment(productionPeriod.endDate).format('DD/MM/YYYY'),
        materialDetails,
        machineDetails,
        manpowerDetails,
        specifications,
        capitalCost: baseCost.toFixed(2),
        totalCost: newTotalCost.toFixed(2),
        percentage: includePercentage ? percentage + '%' : '',
        profitLoss: saleCost < newTotalCost ? `Loss of $${(newTotalCost - saleCost).toFixed(2)}` :
            (saleCost > newTotalCost ? `Profit of $${(saleCost - newTotalCost).toFixed(2)}` : 'No profit or loss')
    };

    // If the product exists and there's a matching detail, update it
    if (existingProductIndex !== -1) {
        const product = existingProducts[existingProductIndex];
        const existingDetailIndex = product.productDetails.findIndex((detail: any) =>
            detail.startDate === productDetail.startDate && detail.endDate === productDetail.endDate
        );

        if (existingDetailIndex !== -1) {
            // Update existing detail
            product.productDetails[existingDetailIndex] = productDetail;
        } else {
            // Add new detail
            product.productDetails.push(productDetail);
        }

        // Update product in the existing products array
        existingProducts[existingProductIndex] = product;
    } else {
        // Product not found, create a new one
        const newID = generateUniqueID(existingProducts.length > 0 ? existingProducts[existingProducts.length - 1].productID : null);
        const newProduct = {
            productID: newID,
            productName,
            productDetails: [productDetail]
        };
        existingProducts.push(newProduct);
    }

    // Determine the message for the confirmation alert
    let message = '';
    if (saleCost < newTotalCost) {
        const lossAmount = newTotalCost - saleCost;
        message = `You will incur a loss of $${lossAmount.toFixed(2)}.`;
    } else if (saleCost > newTotalCost) {
        const profitAmount = saleCost - newTotalCost;
        message = `You will gain a profit of $${profitAmount.toFixed(2)}.`;
    } else {
        message = 'Your costs are balanced, no profit or loss.';
    }

    // Show confirmation alert with options to confirm or cancel
    Alert.alert(
        'Confirm Submission',
        message,
        [
            {
                text: 'Cancel',
                onPress: () => {
                    console.log('Submission canceled');
                },
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: async () => {
                    try {
                        // Update AsyncStorage with the updated or new products array
                        await AsyncStorage.setItem('products', JSON.stringify(existingProducts));
                        // Reset form fields and states after saving
                        setMachineDetails([]);
                        setManpowerDetails([]);
                        setMaterialDetails([]);
                        setSpecifications([]);
                        setTotalCost(0);
                        setIncludePercentage(false);
                        setProductName('');
                        setProductionPeriod({ startDate: '', endDate: '' });
                        navigation.navigate('MyHome');
                    } catch (error) {
                        console.error('Error saving product:', error);
                    }
                }
            }
        ]
    );
};


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

        <View style={styles.checkboxContainer}>
          <Text style={{ color: 'black' }}>Include Percentage</Text>
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
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>Select Production Period</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ gap: 10 }}>
              <Button mode='elevated' onPress={() => setShowStartDateModel(!showStartDateModel)}>Start Date</Button>
              {productionPeriod.startDate && <Text style={{ color: 'black' }}>
                Start Date: {moment(productionPeriod.startDate).format('DD/MM/YYYY')}
              </Text>}
            </View>
            <View style={{ gap: 10 }}>
              <Button mode='elevated' onPress={() => setShowEndDateModel(!showEndDateModel)}>End Date</Button>

              {productionPeriod.endDate && <Text style={{ color: 'black' }}>
                End Date: {moment(productionPeriod.endDate).format('DD/MM/YYYY')}
              </Text>}
            </View>
          </View>

          <DateTimePickerModal
            isVisible={showStartDateModel}
            mode="date"
            onConfirm={(date) => handlConfirm(date, 'startDate')}
            onCancel={() => setShowStartDateModel(!showStartDateModel)}
          />
          <DateTimePickerModal
            isVisible={showEndDateModel}
            mode="date"
            onConfirm={(date) => handlConfirm(date, 'endDate')}
            onCancel={() => setShowEndDateModel(!showStartDateModel)}
          />
        </View>

        <Button style={{ borderRadius: 5 }} onPress={() => handleSubmit(navigation)} buttonColor='purple' textColor='white'>Submit</Button>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ProductCostCalculator;
