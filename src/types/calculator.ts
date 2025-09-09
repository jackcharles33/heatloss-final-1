import { PropertyType } from "./HouseData";

export interface CalculatorInputs {
  region: string;
  postcode: string;
  wallType: string;
  windowType: string;
  floorType: string;
  roofType: string;
  floorArea: string;
  stories: number;
  indoorTemp: number;
  glazingRatio: number;
  age: string;
  // FIX: This property was missing
  propertyType: PropertyType; 
}

export interface HeatLossBreakdown {
  walls: string;
  windows: string;
  floor: string;
  roof: string;
  ventilation?: string;
}

export interface CalculationResults {
  totalHeatLoss: number;
  breakdown: HeatLossBreakdown;
}
