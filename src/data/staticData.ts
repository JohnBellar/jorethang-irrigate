// staticData.ts - demo static sensor + rover data for AgroSmart Dashboard

export interface RoverPosition {
  x: number;
  y: number;
  ts: string;
}

export interface SensorReading {
  ts: string;
  soilMoisture: number;
  soilTemp: number;
  airTemp: number;
  airHumidity: number;
  salinity: number;
  waterLevel: number;
  pressure: number;
  waterQuality: number;
}

export interface IrrigationData {
  x: number[];
  y: number;
}

export interface CropInfo {
  id: string;
  name: string;
  optimalMoistureRange: [number, number];
}

export const roverPath: RoverPosition[] = [
  // x,y are percentages relative to map container
  { x: 10, y: 20, ts: '2025-09-20T08:00:00' },
  { x: 18, y: 26, ts: '2025-09-20T08:02:00' },
  { x: 26, y: 33, ts: '2025-09-20T08:04:00' },
  { x: 35, y: 38, ts: '2025-09-20T08:06:00' },
  { x: 46, y: 42, ts: '2025-09-20T08:08:00' },
  { x: 55, y: 50, ts: '2025-09-20T08:12:00' },
  { x: 62, y: 58, ts: '2025-09-20T08:18:00' },
  { x: 70, y: 62, ts: '2025-09-20T08:22:00' }
];

export const sensorReadings: SensorReading[] = [
  { ts: '08:00', soilMoisture: 38, soilTemp: 20.5, airTemp: 22.1, airHumidity: 60, salinity: 1.1, waterLevel: 82, pressure: 1.3, waterQuality: 7.2 },
  { ts: '08:10', soilMoisture: 40, soilTemp: 20.8, airTemp: 22.3, airHumidity: 59, salinity: 1.15, waterLevel: 80, pressure: 1.28, waterQuality: 7.1 },
  { ts: '08:20', soilMoisture: 37, soilTemp: 21.0, airTemp: 22.6, airHumidity: 58, salinity: 1.2, waterLevel: 79, pressure: 1.26, waterQuality: 7.05 },
  { ts: '08:30', soilMoisture: 35, soilTemp: 21.2, airTemp: 23.0, airHumidity: 56, salinity: 1.25, waterLevel: 77, pressure: 1.2, waterQuality: 6.9 },
  { ts: '08:40', soilMoisture: 33, soilTemp: 21.5, airTemp: 23.5, airHumidity: 55, salinity: 1.3, waterLevel: 74, pressure: 1.18, waterQuality: 6.8 },
  { ts: '08:50', soilMoisture: 31, soilTemp: 21.9, airTemp: 24.0, airHumidity: 54, salinity: 1.35, waterLevel: 71, pressure: 1.15, waterQuality: 6.7 }
];

// tiny synthetic irrigation dataset for demo ML (features: [soilMoisture, soilTemp, airHumidity, salinity]; target: liters needed)
export const irrigationDataset: IrrigationData[] = [
  { x: [45, 18, 60, 1.1], y: 1.2 },
  { x: [40, 20, 65, 1.15], y: 1.6 },
  { x: [35, 22, 55, 1.2], y: 2.0 },
  { x: [30, 24, 50, 1.25], y: 2.5 },
  { x: [25, 25, 45, 1.3], y: 3.0 },
  { x: [20, 26, 40, 1.35], y: 3.8 },
  { x: [50, 17, 70, 1.05], y: 1.0 },
  { x: [55, 16, 75, 1.0], y: 0.8 },
  { x: [28, 23, 48, 1.28], y: 2.8 },
  { x: [33, 21, 53, 1.22], y: 2.2 }
];

export const cropDB: CropInfo[] = [
  { id: 'potato', name: 'Potato', optimalMoistureRange: [40, 60] },
  { id: 'maize', name: 'Maize', optimalMoistureRange: [35, 55] },
  { id: 'tomato', name: 'Tomato', optimalMoistureRange: [45, 70] }
];

export const alerts = [
  { ts: '08:50', text: 'Soil moisture below threshold at Zone A', level: 'critical' as const },
  { ts: '08:45', text: 'Tank water level dropped below 75%', level: 'warning' as const },
  { ts: '08:40', text: 'Rover battery low (25%)', level: 'info' as const }
];

export const kpis = [
  { title: 'Water Efficiency', value: '48%', subtitle: 'Water saved vs traditional', color: 'agro-water' },
  { title: 'Crop Health', value: 'Good', subtitle: 'Avg health index', color: 'agro-success' },
  { title: 'System Uptime', value: '99.2%', subtitle: 'Last 30 days', color: 'agro-green-light' },
  { title: 'Model Accuracy', value: '92%', subtitle: 'Soil moisture pred.', color: 'agro-leaf' },
  { title: 'Water Usage', value: '1.8 L/plant', subtitle: 'Avg (current)', color: 'agro-water' },
  { title: 'Alert Rate', value: '2/wk', subtitle: 'High-critical alerts', color: 'agro-warning' }
];