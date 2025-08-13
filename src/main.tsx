import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#100030',
      paper: 'rgba(255, 255, 255, 0.08)',
    },
    primary: {
      main: '#ff6b95',
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h4: {
      fontWeight: 600,
      color: '#ffffff',
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '2rem'
    },
    h6: {
      color: '#ffffff',
      opacity: 0.8,
      textAlign: 'center',
      marginBottom: '3rem',
      fontWeight: 400
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#100030',
          color: '#ffffff',
          fontFamily: 'Montserrat, sans-serif',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#20142c',
          backdropFilter: 'none',
          borderRadius: '16px',
          padding: '2rem'
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#20142c !important',
          backgroundImage: 'none !important',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          '& .MuiList-root': {
            padding: 0,
            backgroundColor: '#20142c !important'
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          padding: '12px 16px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)'
          }
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);