import { combineReducers } from "redux"
import { fork, all } from "redux-saga/effects"
import { pendingReducer, pendingSaga } from "./pending"
import { errorReducer, errorSaga } from "./error"

// root reducer
export const rootReducer = combineReducers({
	pending: pendingReducer,
	error: errorReducer,
})

// root saga
export function* rootSaga() {
	yield all([fork(errorSaga)])
}
