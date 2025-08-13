import { styled, Typography } from '@mui/material';

export const StepHeading = styled(Typography)({
  color: '#fff',
  fontSize: '1.1rem',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 500,
  letterSpacing: '0.02em',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  
  '&[data-step="1"]::before': {
    content: '""',
    display: 'inline-block',
    width: '20px',
    height: '20px',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23ffffff\'%3E%3Cpath d=\'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z\'/%3E%3C/svg%3E")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  '&[data-step="2"]': {
    marginBottom: '12px',
    marginTop: '12px'
  },
  '&[data-step="2"]::before': {
    content: '""',
    display: 'inline-block',
    width: '20px',
    height: '20px',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23ffffff\'%3E%3Cpath d=\'M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7zm-9 .7c0-1.1.9-2 2-2s2 .9 2 2h-4z\'/%3E%3C/svg%3E")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  }
});