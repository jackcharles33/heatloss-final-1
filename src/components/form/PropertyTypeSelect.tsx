import { FormControl } from '@mui/material';
import { PropertyType } from '../../types/HouseData';
import { FormLabel } from '../styles/FormLabel';
import { Home } from 'lucide-react';
import { Select } from '../ui/select';

interface PropertyTypeSelectProps {
  value: PropertyType;
  onChange: (event: any) => void;
}

export function PropertyTypeSelect({ value, onChange }: PropertyTypeSelectProps) {
  const options = [
    { value: 'Detached', label: 'Detached' },
    { value: 'Semi-Detached / End-Terrace', label: 'Semi-Detached / End-Terrace' },
    { value: 'End of Terrace', label: 'End of Terrace' },
    { value: 'Terrace', label: 'Terrace' },
    { value: 'Bungalow', label: 'Bungalow' }
  ];

  return (
    <FormControl>
      <FormLabel>
        <Home size={20} color="#d85c9c" />
        Property Type
      </FormLabel>
      <Select
        name="propertyType"
        value={value}
        onChange={onChange}
        options={options}
        variant="property-type"
      />
    </FormControl>
  );
}