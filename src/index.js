import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/core/styles'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2083ff',
      }
    },
    typography: {
      fontFamily: [
        '"Spoqa Han Sans"', 
        '"Spoqa Han Sans JP"',
        'sans-serif',
      ].join(','),
    },
  });

ReactDOM.render(
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App/>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </StylesProvider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
