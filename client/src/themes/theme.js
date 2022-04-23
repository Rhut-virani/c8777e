import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'bold',
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: 'bold',
      },
    },
    MuiInputLabel: {
      root: {
        color: '#B0B0B0',
      },
    },
  },
  palette: {
    primary: { main: '#3A8DFF', contrastText: '#ffffff' },
    secondary: { main: '#ffffff', contrastText: '#3A8DFF' },
  },
});
