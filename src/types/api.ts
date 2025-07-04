// GET /api/sensors
export interface Sensor {
  id: string;
  name: string;
  factory: string;
  type: 'temperature' | 'pressure' | 'vibration' | 'humidity';
  status: 'normal' | 'warning' | 'critical';
  value: number;
  unit: string;
  location: string;
  lastUpdated: string;
  threshold: {
    warning: number;
    critical: number;
  };
}

// GET /api/sensors/history?sensorId={id}&timeRange={range}
export interface SensorHistory {
  timestamp: string;
  value: number;
  status: 'normal' | 'warning' | 'critical';
}

// GET /api/factories
export interface Factory {
  id: string;
  name: string;
  location: string;
  sensorCount: number;
  status: 'normal' | 'warning' | 'critical';
}
