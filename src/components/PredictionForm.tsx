import { useState } from 'react';
import { Container } from '@mui/material';
import { PropertyAge, PropertyType } from '../types/HouseData'; // <-- FIXED PATH
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
  isLoading: boolean; // <-- Add this prop
}

export function PredictionForm({ onPredict, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    size: '100',
    age: 'BETWEEN_1960_2000',
    propertyType: 'Semi-Detached / End-Terrace',
    wallType: 'cavity-post60-290-310-filled',
    floorType: 'concrete-75',
    windowType: 'wood-pvc-double', // This value must match a key in your model's training
    roofType: 'pitched-100' // This value must match a key in your model's training
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // <-- Prevent submit while loading
    try {
      // We pass all form data, including 'size' as a number
      onPredict({
        ...formData,
        size: Number(formData.size)
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <HouseDiagramForm 
        values={formData} 
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading} // <-- Pass isLoading to the diagram form
      />
    </Container>
  );
}