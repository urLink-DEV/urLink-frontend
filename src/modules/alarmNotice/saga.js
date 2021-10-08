import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

import { createRequestSaga } from '@modules/helpers'

import {
  alarmNoticeConnection,
  alarmNoticeListLoad,
  alarmNoticeAdd,
  alarmNoticeModify,
  alarmNoticeReadNotice,
  alarmNoticeNoReturnNotice,
} from './reducer'
import * as ws from './ws'

const watchAlarmNoticeConnection = createRequestSaga(alarmNoticeConnection, function* ({ payload: { event } }) {
  const { message, status } = JSON.parse(event.data)
  switch (status) {
    case 'initial':
      yield put(alarmNoticeListLoad.success(message))
      break
    case 'alarm':
      yield put(alarmNoticeAdd.success(message))
      break
    case 'update':
      yield put(alarmNoticeModify.success(message))
      break
    default:
      break
  }
})

const watchAlarmNoticeReadNotice = createRequestSaga(alarmNoticeReadNotice, function* (action) {
  yield call(ws.requestAlarmReadNotice, action.payload)
})

const watchAlarmNoticeNoReturnNotice = createRequestSaga(alarmNoticeNoReturnNotice, function* (action) {
  yield call(ws.requestAlarmNoReturn, action.payload)
})

export function* alarmNoticeSaga() {
  yield takeLatest(alarmNoticeConnection.REQUEST, watchAlarmNoticeConnection)
  yield takeEvery(alarmNoticeReadNotice.REQUEST, watchAlarmNoticeReadNotice)
  yield takeEvery(alarmNoticeNoReturnNotice.REQUEST, watchAlarmNoticeNoReturnNotice)
}
