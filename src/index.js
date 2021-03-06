import React from 'react';
import { Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MuiThemeProvider, createMuiTheme, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import App from './App';
import '@assets/scss/font.scss';
import * as serviceWorker from './serviceWorker';
import { rootReducer, rootSaga } from './modules';

const theme = createMuiTheme({
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

const browserHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: browserHistory,
  },
});

const store = createStore(
  rootReducer,
  composeWithDevTools({ trace: true })(applyMiddleware(sagaMiddleware, thunkMiddleware))
);

sagaMiddleware.run(rootSaga);

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
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
