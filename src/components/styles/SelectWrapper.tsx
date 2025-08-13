import { styled, Box } from '@mui/material';

export const SelectWrapper = styled(Box)({
  position: 'absolute',
  width: '240px',
  zIndex: 10,
  '& .MuiFormControl-root': {
    width: '100%'
  },
  '& .MuiOutlinedInput-root, & .MuiSelect-root': {
    backgroundColor: '#1a1528',
    borderRadius: '10px'
  },
  '& .MuiSelect-select': {
    color: '#ffffff',
    padding: '12px 16px'
  },
  '& .MuiSvgIcon-root': {
    color: '#ffffff'
  },
  '& .MuiMenu-paper, & .MuiPopover-paper': {
    backgroundColor: '#1a1528',
    borderRadius: '10px'
  },
  '& .MuiMenuItem-root': {
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  }
});