import React from 'react'

import AdapterMoment from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
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
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CssBaseline />
            <App />
          </LocalizationProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
)
