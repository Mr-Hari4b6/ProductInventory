export interface Sale {
    id: string;
    date: string;
    amount: number;
    product: string;
    units: number;
    unitCost: number;
    totalCost: any
  }

export const sales: Sale[] = [
    { id: '1', date: '2024-04-01', amount: 12000, product: 'Axe', units: 50, unitCost: 240, totalCost: 12000 },
    { id: '2', date: '2024-04-02', amount: 12000, product: 'Gearbox', units: 10, unitCost: 1200, totalCost: 12000 },
    { id: '3', date: '2024-04-03', amount: 24000, product: 'Hammer', units: 20, unitCost: 1200, totalCost: 24000 },
    { id: '4', date: '2024-04-04', amount: 18000, product: 'Screwdriver', units: 30, unitCost: 600, totalCost: 18000 },
    { id: '5', date: '2024-04-05', amount: 36000, product: 'Wrench', units: 15, unitCost: 2400, totalCost: 36000 },
    { id: '6', date: '2024-04-06', amount: 18000, product: 'Drill', units: 12, unitCost: 1500, totalCost: 18000 },
    { id: '7', date: '2024-04-07', amount: 24000, product: 'Saw', units: 8, unitCost: 3000, totalCost: 24000 },
    { id: '8', date: '2024-04-08', amount: 12000, product: 'Pliers', units: 10, unitCost: 1200, totalCost: 12000 },
    { id: '9', date: '2024-04-09', amount: 18000, product: 'Sander', units: 6, unitCost: 3000, totalCost: 18000 },
    { id: '10', date: '2024-04-10', amount: 30000, product: 'Chisel', units: 15, unitCost: 2000, totalCost: 30000 },
    { id: '11', date: '2024-04-11', amount: 36000, product: 'Paintbrush', units: 24, unitCost: 1500, totalCost: 36000 },
    { id: '12', date: '2024-04-12', amount: 24000, product: 'Ruler', units: 16, unitCost: 1500, totalCost: 24000 },
    { id: '13', date: '2024-04-13', amount: 18000, product: 'Tape Measure', units: 12, unitCost: 1500, totalCost: 18000 },
    { id: '14', date: '2024-04-14', amount: 24000, product: 'Ladder', units: 4, unitCost: 6000, totalCost: 24000 },
    { id: '15', date: '2024-04-15', amount: 18000, product: 'Bucket', units: 9, unitCost: 2000, totalCost: 18000 },
    { id: '16', date: '2024-04-16', amount: 36000, product: 'Gloves', units: 18, unitCost: 2000, totalCost: 36000 },
    { id: '17', date: '2024-04-17', amount: 24000, product: 'Safety Glasses', units: 12, unitCost: 2000, totalCost: 24000 },
    { id: '18', date: '2024-04-18', amount: 30000, product: 'Mask', units: 20, unitCost: 1500, totalCost: 30000 },
    { id: '19', date: '2024-04-19', amount: 18000, product: 'Hard Hat', units: 12, unitCost: 1500, totalCost: 18000 },
    { id: '20', date: '2024-04-20', amount: 24000, product: 'Apron', units: 8, unitCost: 3000, totalCost: 24000 },
    { id: '21', date: '2024-04-21', amount: 12000, product: 'Toolbox', units: 6, unitCost: 2000, totalCost: 12000 },
    { id: '22', date: '2024-04-22', amount: 36000, product: 'Level', units: 18, unitCost: 2000, totalCost: 36000 },
    { id: '23', date: '2024-04-23', amount: 24000, product: 'Shovel', units: 12, unitCost: 2000, totalCost: 24000 },
    { id: '24', date: '2024-04-24', amount: 18000, product: 'Wheelbarrow', units: 6, unitCost: 3000, totalCost: 18000 },
    { id: '25', date: '2024-04-25', amount: 36000, product: 'Rake', units: 18, unitCost: 2000, totalCost: 36000 },
    { id: '26', date: '2024-04-26', amount: 24000, product: 'Hoe', units: 12, unitCost: 2000, totalCost: 24000 },
    { id: '27', date: '2024-04-27', amount: 18000, product: 'Pruner', units: 12, unitCost: 1500, totalCost: 18000 },
    { id: '28', date: '2024-04-28', amount: 24000, product: 'Trowel', units: 8, unitCost: 3000, totalCost: 24000 },
    { id: '29', date: '2024-04-29', amount: 36000, product: 'Sprinkler', units: 24, unitCost: 1500, totalCost: 36000 },
    { id: '30', date: '2024-04-30', amount: 48000, product: 'Hose', units: 30, unitCost: 1600, totalCost: 48000 },
    { id: '31', date: '2024-04-16', amount: 5000, product: 'Hose', units: 50, unitCost: 100, totalCost: 5000 },
    { id: '33', date: '2024-04-15', amount: 30000, product: 'Sprinkler', units: 150, unitCost: 200, totalCost: 30000 },


  ];
  