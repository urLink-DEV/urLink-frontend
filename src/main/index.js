import React from 'react'

import MomentUtils from '@date-io/moment'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { createBrowserHistory } from 'history'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'

import { rootReducer, rootSaga } from '@modules'
import '@assets/scss/font.scss'

import App from './App'
import theme from './theme'

const browserHistory = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools({ trace: true })(applyMiddleware(sagaMiddleware, thunkMiddleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Router history={browserHistory}>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <CssBaseline />
            <App />
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
)
