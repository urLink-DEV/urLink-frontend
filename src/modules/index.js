import { combineReducers } from "redux"
import { fork, all } from "redux-saga/effects"
import { pendingReducer } from "./pending"
import { errorReducer, errorSaga } from "./error"
import { categoryReducer, categorySaga } from "./category"
import { uiReducer } from "./ui"

// root reducer
export const rootReducer = combineReducers({
	pending: pendingReducer,
	error: errorReducer,
	category: categoryReducer,
	ui: uiReducer,
})

// root saga
export function* rootSaga() {
	yield all([fork(errorSaga), fork(categorySaga)])
}
