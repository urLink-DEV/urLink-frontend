import { combineReducers } from "redux"
import { fork, all } from "redux-saga/effects"
import { pendingReducer } from "./pending"
import { errorReducer, errorSaga } from "./error"
import { categoryReducer, categorySaga } from "./category"
import { userReducer, userSaga } from './user';

// root reducer
export const rootReducer = combineReducers({
	pending: pendingReducer,
	error: errorReducer,
	category: categoryReducer,
  user: userReducer,
})

// root saga
export function* rootSaga() {
	yield all([fork(errorSaga), fork(categorySaga), fork(userSaga)])
}
