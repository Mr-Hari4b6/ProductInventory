const materialFormFields = [
    { name: 'materialName', label: 'Material Name' },
    { name: 'measurementType', label: 'Measurement Type' },
    { name: 'quantity', label: 'Quantity' },
    { name: 'cost', label: 'Cost' },
    { name: 'totalCost', label: 'Total Cost' },
];

const specificationsFormFields = [
    { name: 'color', label: 'Color' },
    { name: 'weight', label: 'Weight' },
    { name: 'height', label: 'Height' },
    { name: 'width', label: 'Width' },
    { name: 'quantity', label: 'Quantity' },
    { name: 'price', label: 'Price' }
];

const manPowerFormFields = [
    { name: 'persons', label: 'Persons' },
    { name: 'cost', label: 'Cost/Day' },
    { name: 'days', label: 'Days' },
    { name: 'totalCost', label: 'Total Cost' },
];

const machineFormFields = [
    { name: 'machineName', label: 'Machine Name' },
    { name: 'quantity', label: 'Quantity' },
    { name: 'cost', label: 'Cost' },
    { name: 'totalCost', label: 'Total Cost' },
];

export { machineFormFields, manPowerFormFields, materialFormFields, specificationsFormFields };