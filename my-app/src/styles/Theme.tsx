// src/theme.js
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#B8E3D7',
      light: '#D2F9EE',
      dark: '#D4DDBC',
    },
    secondary: {
      main: '#FFE9FF',
      light: '#FFF9FF',
      dark: '#F8DDF6',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#322f2f',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: ['Outfit', 'cursive', 'serif'].join(','),
    h1: {
      fontFamily: 'Caprasimo, serif',
      fontSize: '3rem',
    },
    h2: {
      fontFamily: 'Caprasimo, serif',
      fontSize: '2.25rem',
    },
    h3: {
      fontFamily: 'Caprasimo, serif',
      fontSize: '1.25rem',
    },
  },
});

export default Theme;