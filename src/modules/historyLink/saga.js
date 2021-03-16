import { call, takeLatest } from 'redux-saga/effects'

import { getHistoryList } from '@utils/chromeApis/history'

import { createRequestSaga } from '../helpers'
import { historyLinkListRead } from './reducer'

const watchHistoryLinkListRead = createRequestSaga(historyLinkListRead, function* (action) {
  const resultList = yield call(getHistoryList, action.payload)
  return resultList
})

export function* historyLinkSaga() {
  yield takeLatest(historyLinkListRead.REQUEST, watchHistoryLinkListRead)
}
