import { call, debounce, takeLatest } from 'redux-saga/effects'

import { createRequestSaga } from '../helpers'
import * as api from './api'
import { categoriesRead, categoryCreate, categoryModify, categoryRemove } from './reducer'

const watchCategoriesRead = createRequestSaga(categoriesRead, function* () {
  const { data } = yield call(api.requestCategoriesRead)
  return data
})

const watchCategoryCreate = createRequestSaga(categoryCreate, function* (action) {
  const { data } = yield call(api.requestCategoryCreate, action.payload)
  return data
})

const watchCategoryModify = createRequestSaga(categoryModify, function* (action) {
  const { data } = yield call(api.requestCategoryModify, action.payload)
  return data
})

const watchCategoryRemove = createRequestSaga(categoryRemove, function* (action) {
  const { data } = yield call(api.requestCategoryRemove, action.payload)
  return data
})

export function* categorySaga() {
  yield debounce(100, categoriesRead.REQUEST, watchCategoriesRead)
  yield debounce(300, categoryCreate.REQUEST, watchCategoryCreate)
  yield takeLatest(categoryModify.REQUEST, watchCategoryModify)
  yield takeLatest(categoryRemove.REQUEST, watchCategoryRemove)
}
