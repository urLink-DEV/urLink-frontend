import { call, takeLatest } from 'redux-saga/effects';
import { createRequestSaga } from '../helpers';
import { historyLinkListRead } from './reducer';
import { getHistoryList } from '@commons/chromeApis/history';

const watchHistoryLinkListRead = createRequestSaga(historyLinkListRead, function* (action) {
  const resultList = yield call(getHistoryList, action.payload);
  return resultList;
});

export function* historyLinkSaga() {
  yield takeLatest(historyLinkListRead.REQUEST, watchHistoryLinkListRead);
}
