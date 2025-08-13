import { styled } from '@mui/material';
import { OutlinedInput, Select } from '@mui/material';

const baseInputStyles = {
  backgroundColor: '#1a1528',
  borderRadius: '10px',
  border: 'none',
  '& .MuiSelect-select, & input': {
    color: '#ffffff',
    padding: '12px 16px',
    fontFamily: 'Montserrat, sans-serif'
  },
  '& .MuiSvgIcon-root': {
    color: '#ffffff'
  },
  '&:hover': {
    backgroundColor: '#1a1528'
  },
  '&.Mui-focused': {
    backgroundColor: '#1a1528'
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    }
  }
};

export const StyledOutlinedInput = styled(OutlinedInput)({
  ...baseInputStyles
});

export const StyledSelect = styled(Select)({
  ...baseInputStyles,
  '& .MuiPaper-root': {
    backgroundColor: '#1a1528'
  },
  '& .MuiMenu-paper': {
    backgroundColor: '#1a1528'
  },
  '& .MuiMenuItem-root': {
    color: '#ffffff',
    fontFamily: 'Montserrat, sans-serif',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  }
});