import { call, takeLatest } from 'redux-saga/effects'
import { createRequestSaga } from '../helpers'
import { linksRead, linkCreate, linkModify, linkRemove } from './reducer'
import * as api from './api'

const watchLinksRead = createRequestSaga(linksRead, function* (action) {
  const { data } = yield call(api.linksRead, action.payload)
  return data
})

const watchLinkCreate = createRequestSaga(linkCreate, function* (action) {
  const { data } = yield call(api.linkCreate, action.payload)
  return data
})

const watchLinkModify = createRequestSaga(linkModify, function* (action) {
  const { data } = yield call(api.linkModify, action.payload)
  return data
})

const watchLinkRemove = createRequestSaga(linkRemove, function* (action) {
  const { data } = yield call(api.linkRemove, action.payload, null)
  return data
})

export function* linkSaga() {
  yield takeLatest(linksRead.REQUEST, watchLinksRead)
  yield takeLatest(linkCreate.REQUEST, watchLinkCreate)
  yield takeLatest(linkModify.REQUEST, watchLinkModify)
  yield takeLatest(linkRemove.REQUEST, watchLinkRemove)
}
