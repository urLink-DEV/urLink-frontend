import { call, takeLatest } from 'redux-saga/effects'
import { createRequestSaga } from '../helpers'
import { alarmsRead, alarmCreate, alarmRemove } from './reducer'
import * as api from './api'

const watchAlarmsRead = createRequestSaga(alarmsRead, function* () {
  const { data } = yield call(api.alarmsRead)
  return data
})

const watchalarmCreate = createRequestSaga(alarmCreate, function* (action) {
  const { data } = yield call(api.alarmCreate, action.payload)
  return data
})

const watchAlarmRemove = createRequestSaga(alarmRemove, function* (action) {
  const { data } = yield call(api.alarmRemove, action.payload)
  return data
})

export function* alarmSaga() {
  yield takeLatest(alarmsRead.REQUEST, watchAlarmsRead)
  yield takeLatest(alarmCreate.REQUEST, watchalarmCreate)
  yield takeLatest(alarmRemove.REQUEST, watchAlarmRemove)
}
