import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { pendingReducer, pendingSaga } from './pending';
import { errorReducer, errorSaga } from './error';
import { userReducer, userSaga } from './user';

// root reducer
export const rootReducer = combineReducers({
  pending: pendingReducer,
  error: errorReducer,
  user: userReducer,
});

// root saga
export function* rootSaga() {
  yield all([fork(errorSaga), fork(userSaga)]);
}
