import { useState } from 'react';
import { Container } from '@mui/material';
import { PropertyAgeField } from '../types/HouseData'; // <-- FIXED PATH
import { wallTypesByAge } from '../constants/construction';
import { HouseDiagramForm } from './HouseDiagramForm'; // <-- FIXED PATH


interface FormData {
  size: string;
  age: PropertyAgeField;
  propertyType: string;
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
    size: '',
    age: '',
    propertyType: '',
    wallType: '',
    floorType: '',
    windowType: '',
    roofType: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'age') {
      const validWallTypes = wallTypesByAge[value as PropertyAgeField] ?? [];
      const currentWallStillValid = formData.wallType === '' || validWallTypes.includes(formData.wallType);
      setFormData(prev => ({
        ...prev,
        age: value as PropertyAgeField,
        // Keep wall empty if not yet selected; reset to empty if current choice is invalid for new age
        wallType: currentWallStillValid ? prev.wallType : '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const isFormComplete = Boolean(
    formData.size && formData.age &&
    formData.wallType && formData.floorType && formData.windowType && formData.roofType
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !isFormComplete) return;
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
        isFormComplete={isFormComplete}
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