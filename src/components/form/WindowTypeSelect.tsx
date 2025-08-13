import { FormControl } from '@mui/material';
import { windowTypes } from '../../constants/buildingData';
import { Select } from '../ui/select';

interface WindowTypeSelectProps {
  value: string;
  onChange: (event: any) => void;
}

export function WindowTypeSelect({ value, onChange }: WindowTypeSelectProps) {
  const options = Object.entries(windowTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  return (
    <FormControl>
      <Select
        name="windowType"
        value={value}
        onChange={onChange}
        options={options}
        variant="window"
      />
    </FormControl>
  );
}