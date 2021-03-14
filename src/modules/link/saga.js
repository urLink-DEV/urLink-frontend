import { all, call, debounce, takeLatest } from 'redux-saga/effects'

import { createRequestSaga } from '../helpers'
import * as api from './api'
import { linksRead, linkCreate, linkModify, linkRemove, linksRemove } from './reducer'

const watchLinksRead = createRequestSaga(linksRead, function* (action) {
  const { data } = yield call(api.requestLinksRead, action.payload)
  return data
})

const watchLinkCreate = createRequestSaga(linkCreate, function* (action) {
  const { data } = yield call(api.requestLinkCreate, action.payload)
  return data
})

const watchLinkModify = createRequestSaga(linkModify, function* (action) {
  const { data } = yield call(api.requestLinkModify, action.payload)
  return data
})

const watchLinkRemove = createRequestSaga(linkRemove, function* (action) {
  const { data } = yield call(api.requestLinkRemove, action.payload)
  return data
})

const watchLinksRemove = createRequestSaga(linksRemove, function* ({ payload: { urlIdList } }) {
  const listData = yield all(urlIdList.map((data) => call(api.requestLinkRemove, data)))
  return listData.map((res) => res.data)
})

export function* linkSaga() {
  yield debounce(100, linksRead.REQUEST, watchLinksRead)
  yield takeLatest(linkCreate.REQUEST, watchLinkCreate)
  yield takeLatest(linkModify.REQUEST, watchLinkModify)
  yield takeLatest(linkRemove.REQUEST, watchLinkRemove)
  yield takeLatest(linksRemove.REQUEST, watchLinksRemove)
}
