import { FormControl } from '@mui/material';
import { wallTypes } from '../../constants/buildingData';
import { wallTypesByAge } from '../../constants/construction';
import { PropertyAgeField } from '../../types/HouseData';
import { Select } from '../ui/select';

interface WallTypeSelectProps {
  value: string;
  onChange: (event: any) => void;
  propertyAge?: PropertyAgeField;
}

export function WallTypeSelect({ value, onChange, propertyAge }: WallTypeSelectProps) {
  const allOptions = Object.entries(wallTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  const ageKey: PropertyAgeField = propertyAge || '';
  const options = ageKey
    ? allOptions.filter(opt => (wallTypesByAge[ageKey] || []).includes(opt.value))
    : allOptions;

  return (
    <FormControl>
      <Select
        name="wallType"
        value={value}
        onChange={onChange}
        options={options}
        variant="wall"
        placeholder="Select wall type"
      />
    </FormControl>
  );
}