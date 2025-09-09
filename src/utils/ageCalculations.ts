import { PropertyAge } from '../types/HouseData';
import { wallTypes } from '../constants/buildingData';

export const ageMultipliers: Record<PropertyAge, number> = {
  'PRE_1960': 1.05,          // Slight increase for older construction quality
  'BETWEEN_1960_2000': 1.0,  // Establish this as the baseline
  'BETWEEN_2000_2008': 0.95, // 5% improvement due to better standards
  'POST_2008': 0.9           // 10% improvement for modern, well-built homes
};

export function getAvailableWallTypes(age: PropertyAge) {
  switch (age) {
    case 'PRE_1960':
      return {
        'solid-brick-102': wallTypes['solid-brick-102'],
        'solid-brick-228': wallTypes['solid-brick-228'],
        'solid-brick-343': wallTypes['solid-brick-343'],
        'cavity-pre60-unfilled': wallTypes['cavity-pre60-unfilled'],
        'cavity-pre60-filled': wallTypes['cavity-pre60-filled']
      };
    case 'BETWEEN_1960_2000':
      return {
        'cavity-post60-290-310-filled': wallTypes['cavity-post60-290-310-filled'],
        'cavity-post60-290-310-unfilled': wallTypes['cavity-post60-290-310-unfilled'],
        'cavity-post60-under290-filled': wallTypes['cavity-post60-under290-filled'],
        'cavity-post60-under290-unfilled': wallTypes['cavity-post60-under290-unfilled']
      };
    case 'BETWEEN_2000_2008':
    case 'POST_2008':
      return {
        'cavity-post60-310': wallTypes['cavity-post60-310'],
        'timber-frame': wallTypes['timber-frame']
      };
    default:
      return wallTypes;
  }
}
