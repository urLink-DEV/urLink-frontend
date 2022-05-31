import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1098,
      lg: 1435,
      xl: 1770,
    },
  },
  palette: {
    colorGroup: {
      battleshipGrey: '#737b84',
      lightGrey: '#fafafa',
      blueGrey: '#868e96',
      paleGrey: '#f6f7f9',
      salmon: '#ff6b6b',
      greenBlue: '#00b381',
    },
    common: {
      black: '#212529',
    },
    primary: {
      main: '#1D78FF',
    },
  },
  typography: {
    fontFamily: ['"Spoqa Han Sans"', '"Spoqa Han Sans JP"', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar {
          display: none;
        }

        *: {
          // box-sizing: border-box;
          font-family: "Spoqa Han Sans", "Spoqa Han Sans JP", "sans-serif";
        }

        button: {
          cursor: pointer;
          outline: 0;
          border: unset;
          background-color: transparent;
        }
      `,
    },
  },
})

export default theme
