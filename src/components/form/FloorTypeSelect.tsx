import { FormControl } from '@mui/material';
import { floorTypes } from '../../constants/buildingData';
import { Select } from '../ui/select';

interface FloorTypeSelectProps {
  value: string;
  onChange: (event: any) => void;
}

export function FloorTypeSelect({ value, onChange }: FloorTypeSelectProps) {
  const options = Object.entries(floorTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  return (
    <FormControl>
      <Select
        name="floorType"
        value={value}
        onChange={onChange}
        options={options}
        variant="floor"
      />
    </FormControl>
  );
}