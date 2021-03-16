import { call, takeLatest } from 'redux-saga/effects'

import { getAuthToken, removeCachedAuthToken } from '@utils/chromeApis/OAuth'
import { UPDATE_TOKEN } from '@utils/chromeApis/onMessage'
import { sendMessage } from '@utils/chromeApis/sendMessage'
import { setAccessToken, removeAccessToken } from '@utils/http/auth'

import { createRequestSaga } from '../helpers'
import * as api from './api'
import {
  userRegister,
  userLogin,
  userLogout,
  userGregister,
  userGlogin,
  userRead,
  userModify,
  userRemove,
} from './reducer'

const watchUserRegister = createRequestSaga(userRegister, function* (action) {
  const { data } = yield call(api.requestNregister, action.payload)
  yield call(setAccessToken, data.token)
  yield call(sendMessage, { message: UPDATE_TOKEN })
  return data
})

const watchUserLogin = createRequestSaga(userLogin, function* (action) {
  const { data } = yield call(api.requestNlogin, action.payload)
  yield call(setAccessToken, data.token)
  yield call(sendMessage, { message: UPDATE_TOKEN })
  return data
})

const watchUserLogout = createRequestSaga(userLogout, function* (_action) {
  yield call(removeAccessToken)
})

const watchUserGregister = createRequestSaga(userGregister, function* (_action) {
  let token
  try {
    token = yield call(getAuthToken)
    const { data } = yield call(api.requestGregister, { token })
    yield call(setAccessToken, data.token)
    yield call(sendMessage, { message: UPDATE_TOKEN })
    return data
  } catch (error) {
    if (token && error.response?.status >= 400) {
      yield call(removeCachedAuthToken, token)
    }
    throw error
  }
})

const watchUserGlogin = createRequestSaga(userGlogin, function* (_action) {
  let token
  try {
    token = yield call(getAuthToken)
    const { data } = yield call(api.requestGLogin, { token })
    yield call(setAccessToken, data.token)
    yield call(sendMessage, { message: UPDATE_TOKEN })
    return data
  } catch (error) {
    if (token && error.response?.status >= 400) {
      yield call(removeCachedAuthToken, token)
    }
    throw error
  }
})

const watchUserRead = createRequestSaga(userRead, function* (action) {
  const { data } = yield call(api.requestUserRead, action.payload, null)
  return data
})

const watchUserModify = createRequestSaga(userModify, function* (action) {
  const { data } = yield call(api.requestUserModiify, action.payload, null)
  return data
})

const watchUserRemove = createRequestSaga(userRemove, function* (action) {
  const { data } = yield call(api.requestUserRemove, action.payload)
  yield call(removeAccessToken)
  return data
})

export function* userSaga() {
  yield takeLatest(userRegister.REQUEST, watchUserRegister)
  yield takeLatest(userLogin.REQUEST, watchUserLogin)
  yield takeLatest(userLogout.REQUEST, watchUserLogout)
  yield takeLatest(userGregister.REQUEST, watchUserGregister)
  yield takeLatest(userGlogin.REQUEST, watchUserGlogin)

  yield takeLatest(userRead.REQUEST, watchUserRead)
  yield takeLatest(userModify.REQUEST, watchUserModify)
  yield takeLatest(userRemove.REQUEST, watchUserRemove)
}
