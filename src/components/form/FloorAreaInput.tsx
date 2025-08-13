import { FormControl } from '@mui/material';
import { FormLabel } from '../styles/FormLabel';
import { StyledOutlinedInput } from '../styles/FormStyles';
import { Calculator } from 'lucide-react';

interface FloorAreaInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FloorAreaInput({ value, onChange }: FloorAreaInputProps) {
  return (
    <FormControl>
      <FormLabel sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '7px',
        color: '#d8b4fe'
      }}>
        <Calculator size={20} color="#d85c9c" />
        Floor Area
      </FormLabel>
      <StyledOutlinedInput
        name="size"
        type="number"
        value={value}
        onChange={onChange}
        endAdornment={<span style={{ opacity: 0.7 }}>m²</span>}
        sx={{ 
          height: '44px',
          backgroundColor: '#211934',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid rgba(216, 92, 156, 0.3)'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #d85c9c'
          }
        }}
      />
    </FormControl>
  );
}