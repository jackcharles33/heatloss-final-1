import { FormControl } from '@mui/material';
import { PropertyAge } from '../../types/HouseData';
import { FormLabel } from '../styles/FormLabel';
import { CalendarRange } from 'lucide-react';
import { Select } from '../ui/select';

interface PropertyAgeSelectProps {
  value: PropertyAge;
  onChange: (event: any) => void;
}

export function PropertyAgeSelect({ value, onChange }: PropertyAgeSelectProps) {
  const options = [
    { value: 'PRE_1960', label: 'Pre 1960' },
    { value: 'BETWEEN_1960_2000', label: '1960-2000' },
    { value: 'BETWEEN_2000_2008', label: '2000-2008' },
    { value: 'POST_2008', label: 'Post 2008' }
  ];

  return (
    <FormControl>
      <FormLabel>
        <CalendarRange size={20} color="#d85c9c" />
        Property Age
      </FormLabel>
      <Select
        name="age"
        value={value}
        onChange={onChange}
        options={options}
        variant="property-age"
      />
    </FormControl>
  );
}