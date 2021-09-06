import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    colorGroup: {
      battleshipGrey: '#737b84',
      lightGrey: '#f6f6f6',
      blueGrey: '#868e96',
      paleGrey: '#f6f7f9',
      salmon: '#ff6b6b',
      greenBlue: '#00b381',
    },
    common: {
      black: '#212529',
    },
    primary: {
      main: '#2083ff',
    },
  },
  typography: {
    fontFamily: ['"Spoqa Han Sans"', '"Spoqa Han Sans JP"', 'sans-serif'].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '*': {
          // boxSizing: 'border-box',
          fontFamily: "'Spoqa Han Sans', 'Spoqa Han Sans JP', sans-serif",
        },
        button: {
          cursor: 'pointer',
          outline: 0,
          border: 'none',
        },
      },
    },
  },
})

export default theme
