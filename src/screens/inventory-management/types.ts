interface ProductDetail {
    startDate: string;
    endDate: string;
    materialDetails: MaterialDetail[];
    machineDetails: MachineDetail[];
    manpowerDetails: ManpowerDetail[];
    specifications: Specification[];
    capitalCost: string;
    totalCost: string;
    percentage: string;
    profitLoss: string;
}

interface MaterialDetail {
    materialName: string;
    measurementType: string;
    quantity: string;
    cost: string;
    totalCost: string;
}

interface MachineDetail {
    machineName: string;
    quantity: string;
    cost: string;
    totalCost: string;
}

interface ManpowerDetail {
    persons: string;
    cost: string;
    days: string;
    totalCost: string;
}

interface Specification {
    color: string;
    weight: string;
    height: string;
    width: string;
    quantity: string;
    price: string;
}


export type { ProductDetail };