import { combineReducers } from 'redux'
import { fork, all } from 'redux-saga/effects'

import { ALARM, alarmReducer, alarmSaga } from './alarm'
import { ALARM_NOTICE, alarmNoticeReducer, alarmNoticeSaga } from './alarmNotice'
import { CATEGORY, categoryReducer, categorySaga } from './category'
import { ERROR, errorReducer } from './error'
import { HISTORY_LINK, historyLinkReducer, historyLinkSaga } from './historyLink'
import { LINK, linkReducer, linkSaga } from './link'
import { PENDING, pendingReducer } from './pending'
import { UI, uiReducer } from './ui'
import { USER, userReducer, userSaga } from './user'

// root reducer
export const rootReducer = combineReducers({
  [PENDING]: pendingReducer,
  [ERROR]: errorReducer,
  [CATEGORY]: categoryReducer,
  [LINK]: linkReducer,
  [ALARM]: alarmReducer,
  [USER]: userReducer,
  [HISTORY_LINK]: historyLinkReducer,
  [ALARM_NOTICE]: alarmNoticeReducer,
  [UI]: uiReducer,
})

// root saga
export function* rootSaga() {
  yield all([
    fork(categorySaga),
    fork(linkSaga),
    fork(alarmSaga),
    fork(userSaga),
    fork(historyLinkSaga),
    fork(alarmNoticeSaga),
  ])
}
