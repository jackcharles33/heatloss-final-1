import { useState } from 'react';
import { Container } from '@mui/material';
import { PropertyAge, PropertyType } from '../types/HouseData'; // <-- FIXED PATH
import { wallTypesByAge } from '../constants/construction';
import { HouseDiagramForm } from './HouseDiagramForm'; // <-- FIXED PATH


interface FormData {
  size: string;
  age: PropertyAge;
  propertyType: PropertyType; // We still collect it, just don't send to the model
  wallType: string;
  floorType: string;
  windowType: string;
  roofType: string;
}

interface PredictionFormProps {
  onPredict: (data: any) => void;
  isLoading: boolean;
  onEpcPopulated?: () => void;  // called after EPC autofill — lets App clear old results
}

export function PredictionForm({ onPredict, isLoading, onEpcPopulated }: PredictionFormProps) {
  const [epcPopulatedFields, setEpcPopulatedFields] = useState<Set<string> | null>(null);
  const [epcPostcode, setEpcPostcode] = useState<string>('');
  const [epcAddress, setEpcAddress] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    size: '100',
    age: 'BETWEEN_1960_2000',
    propertyType: 'Detached', // Default hidden value
    wallType: 'cavity-post60-290-310-filled',
    floorType: 'concrete-75',
    windowType: 'wood-pvc-double', // This value must match a key in your model's training
    roofType: 'pitched-100' // This value must match a key in your model's training
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'age') {
      const validWallTypes = wallTypesByAge[value as PropertyAge] ?? [];
      const currentWallStillValid = validWallTypes.includes(formData.wallType);
      setFormData(prev => ({
        ...prev,
        age: value as PropertyAge,
        wallType: currentWallStillValid ? prev.wallType : (validWallTypes[0] ?? prev.wallType),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // <-- Prevent submit while loading
    try {
      onPredict({
        ...formData,
        size: Number(formData.size),
        // pass EPC-sourced address data so App.tsx can store it
        _postcode: epcPostcode,
        _address: epcAddress,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* ⚡ Autofill card moved into HouseDiagramForm */}
      <HouseDiagramForm
        values={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        epcPopulatedFields={epcPopulatedFields}
        onClearResults={onEpcPopulated}
        onPopulate={(epcValues, populated, postcode, address) => {
          setFormData(prev => ({ ...prev, ...epcValues }));
          setEpcPopulatedFields(populated);
          setEpcPostcode(postcode);
          setEpcAddress(address);
          onEpcPopulated?.();
        }}
      />
    </Container>
  );
}