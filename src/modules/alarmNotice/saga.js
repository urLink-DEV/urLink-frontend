import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { createRequestSaga } from '@modules/helpers'
import {
  alaramNoticeConnection,
  alaramNoticeListLoad,
  alaramNoticeAdd,
  alaramNoticeModify,
  alaramNoticeReadNotice,
  alaramNoticeNoReturnNotice,
} from './reducer'
import * as ws from './ws'

const watchAlarmNoticeConnection = createRequestSaga(
  alaramNoticeConnection,
  function* ({ payload: { event } }) {
    const { message, status } = JSON.parse(event.data)
    switch (status) {
      case 'initial':
        yield put(alaramNoticeListLoad.success(message))
        break
      case 'alarm':
        yield put(alaramNoticeAdd.success(message))
        break
      case 'update':
        yield put(alaramNoticeModify.success(message))
        break
      default:
        break
    }
  }
)

const watchAlarmNoticeReadNotice = createRequestSaga(alaramNoticeReadNotice, function* (action) {
  yield call(ws.alarmReadNotice, action.payload)
})

const watchAlarmNoticNoReturnNotice = createRequestSaga(
  alaramNoticeNoReturnNotice,
  function* (action) {
    yield call(ws.alarmNoReturn, action.payload)
  }
)

export function* alarmNoticeSaga() {
  yield takeLatest(alaramNoticeConnection.REQUEST, watchAlarmNoticeConnection)
  yield takeEvery(alaramNoticeReadNotice.REQUEST, watchAlarmNoticeReadNotice)
  yield takeEvery(alaramNoticeNoReturnNotice.REQUEST, watchAlarmNoticNoReturnNotice)
}
