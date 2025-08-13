import { FormControl } from '@mui/material';
import { roofTypes } from '../../constants/buildingData';
import { Select } from '../ui/select';

interface RoofTypeSelectProps {
  value: string;
  onChange: (event: any) => void;
}

export function RoofTypeSelect({ value, onChange }: RoofTypeSelectProps) {
  const options = Object.entries(roofTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  return (
    <FormControl>
      <Select
        name="roofType"
        value={value}
        onChange={onChange}
        options={options}
        variant="roof"
      />
    </FormControl>
  );
}