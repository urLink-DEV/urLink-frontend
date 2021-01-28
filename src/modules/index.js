import { combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { pendingReducer } from './pending';
import { errorReducer, errorSaga } from './error';
import { categoryReducer, categorySaga } from './category';
import { USER, userReducer, userSaga } from './user';
import { HISTORY_LINK, historyLinkReducer, historyLinkSaga } from './historyLink';
import { ALARM_NOTICE, alaramNoticeReducer, alarmNoticeSaga } from './alarmNotice';
import { UI, uiReducer } from './ui';

// root reducer
export const rootReducer = combineReducers({
  pending: pendingReducer,
  error: errorReducer,
  category: categoryReducer,
  [USER]: userReducer,
  [HISTORY_LINK]: historyLinkReducer,
  [ALARM_NOTICE]: alaramNoticeReducer,
  [UI]: uiReducer,
});

// root saga
export function* rootSaga() {
  yield all([
    fork(errorSaga),
    fork(categorySaga),
    fork(userSaga),
    fork(historyLinkSaga),
    fork(alarmNoticeSaga),
  ]);
}
