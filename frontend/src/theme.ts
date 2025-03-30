import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    button: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    caption: { fontWeight: 400 },
  },
  palette: {
    background: {
      default: '#f5e8d2',
    },
    text: {
      primary: '#304F48',
    },
  },
});

export default theme;