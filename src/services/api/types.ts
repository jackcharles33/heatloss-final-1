import { BaseHouseData } from '../../types/HouseData';

export interface APIResponse {
  success: boolean;
  error?: string;
}

export interface CalculationData extends BaseHouseData {
  timestamp?: string;
}