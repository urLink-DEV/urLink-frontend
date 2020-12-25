import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import { Router } from "react-router-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createBrowserHistory } from "history"
import createSagaMiddleware from "redux-saga"
import { rootReducer, rootSaga } from "./modules"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/core/styles"
import MomentUtils from "@date-io/moment"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#2083ff",
		},
	},
	typography: {
		fontFamily: ['"Spoqa Han Sans"', '"Spoqa Han Sans JP"', "sans-serif"].join(
			","
		),
	},
})

const browserHistory = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware({
	context: {
		history: browserHistory,
	},
})

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware, thunkMiddleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
	<Router history={browserHistory}>
		<Provider store={store}>
			<StylesProvider injectFirst>
				<MuiThemeProvider theme={theme}>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<App />
					</MuiPickersUtilsProvider>
				</MuiThemeProvider>
			</StylesProvider>
		</Provider>
	</Router>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()