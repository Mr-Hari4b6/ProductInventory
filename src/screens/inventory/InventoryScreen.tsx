import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

interface MaterialDetails {
  materialName: string;
  materialQuantity: string;
  materialCost: string;
}

interface MachineDetails {
  machineName: string;
  machineCost: string;
  machineQuantity: string;
}

interface ManpowerDetails {
  numberOfPersons: string;
  wagePerPerson: string;
}

const InventoryForm: React.FC = () => {
  const [materialDetails, setMaterialDetails] = useState<MaterialDetails>({
    materialName: '',
    materialCost: '',
    materialQuantity: '',
  });

  const [machineDetails, setMachineDetails] = useState<MachineDetails>({
    machineName: '',
    machineCost: '',
    machineQuantity: '',
  });

  const [manpowerDetails, setManpowerDetails] = useState<ManpowerDetails>({
    numberOfPersons: '',
    wagePerPerson: '',
  });

  const calculateTotalCost = (): number => {
    const totalMaterialCost = parseFloat(materialDetails.materialCost) * parseInt(materialDetails.materialQuantity);
    const totalMachineCost = parseFloat(machineDetails.machineCost) * parseInt(machineDetails.machineQuantity);
    const totalManpowerCost = parseFloat(manpowerDetails.numberOfPersons) * parseFloat(manpowerDetails.wagePerPerson);
    const totalCost = totalMaterialCost + totalMachineCost + totalManpowerCost;
    return totalCost;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ color: 'purple', fontWeight: '600', textAlign: 'center' }}>Product Cost Details</Text>

        <View>
          <Text>Product Name</Text>
          <TextInput
            style={{borderWidth:1}}
            placeholder="Product Name"
          />
        </View>
        <View style={styles.section}>
          <Text>Material Details</Text>
          <TextInput
            placeholder="Material Name"
            onChangeText={(text) => setMaterialDetails({ ...materialDetails, materialName: text })}
            value={materialDetails.materialName}
            style={styles.input}
          />
          <TextInput
            placeholder="Material Cost"
            onChangeText={(text) => setMaterialDetails({ ...materialDetails, materialCost: text })}
            value={materialDetails.materialCost}
            keyboardType="numeric"
            style={styles.input}
          />
          {/* <Dropdown
            value={materialDetails.materialQuantity}
            onChange={(text: any) => setMaterialDetails({ ...materialDetails, materialQuantity: text })}
            data={[
              { label: 'Piece', value: 'piece' },
              { label: 'Kilogram', value: 'kg' },
              { label: 'Gram', value: 'g' },
              // Add more measurement options as needed
            ]}
            labelField="label"
            valueField="value"
            placeholder='Select Quantity Measurement'
            renderLeftIcon={() => (
              <Icon
                style={styles.icon}
                color='black'
                name="line-chart"
                size={20}
              />
            )}
          /> */}
          <TextInput
            placeholder="Material Quantity"
            onChangeText={(text) => setMaterialDetails({ ...materialDetails, materialQuantity: text })}
            value={materialDetails.materialQuantity}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text>Machine Details</Text>
          <TextInput
            placeholder="Machine Name"
            onChangeText={(text) => setMachineDetails({ ...machineDetails, machineName: text })}
            value={machineDetails.machineName}
            style={styles.input}
          />
          <TextInput
            placeholder="Machine Cost"
            onChangeText={(text) => setMachineDetails({ ...machineDetails, machineCost: text })}
            value={machineDetails.machineCost}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Machine Quantity"
            onChangeText={(text) => setMachineDetails({ ...machineDetails, machineQuantity: text })}
            value={machineDetails.machineQuantity}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text>Manpower Details</Text>
          <TextInput
            placeholder="Number of Persons"
            onChangeText={(text) => setManpowerDetails({ ...manpowerDetails, numberOfPersons: text })}
            value={manpowerDetails.numberOfPersons}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Wage Per Person"
            onChangeText={(text) => setManpowerDetails({ ...manpowerDetails, wagePerPerson: text })}
            value={manpowerDetails.wagePerPerson}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text>Total Cost: {calculateTotalCost()}</Text>
        </View>

        <Button title="Submit" onPress={() => console.log("Form submitted")} />
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
  section: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  icon: {
    marginRight: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'purple'
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default InventoryForm;
