interface MaterialData {
    materialName: string;
    measurementType: string;
    quantity: string;
    cost: string;
    totalCost: string;
}
interface MachineData {
    machineName: string;
    quantity: string;
    cost: string;
    totalCost: string;
}

interface ManPowerData {
    persons: string;
    cost: string;
    days: string;
    totalCost: string;
}
interface Specifications {
   color:string;
   weight: string;
   height: string,
   width: string,
   quantity: string,
   price?: string
}

export type { MachineData, ManPowerData, MaterialData, Specifications };