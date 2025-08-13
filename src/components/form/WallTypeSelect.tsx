import { FormControl } from '@mui/material';
import { wallTypes } from '../../constants/buildingData';
import { Select } from '../ui/select';

interface WallTypeSelectProps {
  value: string;
  onChange: (event: any) => void;
}

export function WallTypeSelect({ value, onChange }: WallTypeSelectProps) {
  const options = Object.entries(wallTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  return (
    <FormControl>
      <Select
        name="wallType"
        value={value}
        onChange={onChange}
        options={options}
        variant="wall"
      />
    </FormControl>
  );
}