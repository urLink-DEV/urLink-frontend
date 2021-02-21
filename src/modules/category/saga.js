import { call, takeLatest, put } from 'redux-saga/effects'
import { createRequestSaga } from '../helpers'
import { categoriesRead, categoryCreate, categoryModify, categoryRemove } from './reducer'
import * as api from './api'

const watchCategoriesRead = createRequestSaga(categoriesRead, function* () {
  const { data } = yield call(api.categoriesRead)
  return data
})

const watchCategoryCreate = createRequestSaga(categoryCreate, function* (action) {
  const { data } = yield call(api.categoryCreate, action.payload)
  return data
})

const watchCategoryModify = createRequestSaga(categoryModify, function* (action) {
  const { data } = yield call(api.categoryModify, action.payload)
  return data
})

const watchCategoryRemove = createRequestSaga(categoryRemove, function* (action) {
  const { data } = yield call(api.categoryRemove, action.payload, null)
  yield put(categoriesRead.request())
  return data
})

export function* categorySaga() {
  yield takeLatest(categoriesRead.REQUEST, watchCategoriesRead)
  yield takeLatest(categoryCreate.REQUEST, watchCategoryCreate)
  yield takeLatest(categoryModify.REQUEST, watchCategoryModify)
  yield takeLatest(categoryRemove.REQUEST, watchCategoryRemove)
}
