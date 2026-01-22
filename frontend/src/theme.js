import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6200EE', // Indigo
      light: '#BB86FC',
      dark: '#3700B3',
    },
    secondary: {
      main: '#FFAB00', // Amber
    },
    background: {
      default: '#0A0A0A',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 24,
          padding: '10px 24px',
        },
      },
    },
  },
});

export default theme;
