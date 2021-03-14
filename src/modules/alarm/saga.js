import { call, takeLatest } from 'redux-saga/effects'

import { createRequestSaga } from '../helpers'
import * as api from './api'
import { alarmsRead, alarmCreate, alarmRemove } from './reducer'

const watchAlarmsRead = createRequestSaga(alarmsRead, function* () {
  const { data } = yield call(api.requestAlarmsRead)
  return data
})

const watchalarmCreate = createRequestSaga(alarmCreate, function* (action) {
  const { data } = yield call(api.requestAlarmCreate, action.payload)
  return data
})

const watchAlarmRemove = createRequestSaga(alarmRemove, function* (action) {
  const { data } = yield call(api.requestAlarmRemove, action.payload)
  return data
})

export function* alarmSaga() {
  yield takeLatest(alarmsRead.REQUEST, watchAlarmsRead)
  yield takeLatest(alarmCreate.REQUEST, watchalarmCreate)
  yield takeLatest(alarmRemove.REQUEST, watchAlarmRemove)
}
