import { createRequestAction, createRequestSaga, getHeaders } from '@modules/helpers';
// import { createAction } from "@reduxjs/toolkit"
import { call, all, takeEvery } from 'redux-saga/effects';
import { produce } from 'immer';
import axios from 'axios';
import { URLINK_HOST } from '@config';

const api = axios.create({
  baseURL: `${URLINK_HOST}/api/v1/category`,
  timeout: 10000,
  responseType: 'json',
});

export const getCategories = createRequestAction('category/GET_CATEGORIES');
export const createCategoy = createRequestAction('category/CREATE_CATEGORY');
export const updateCategoy = createRequestAction('category/UPDATE_CATEGORY');
export const removeCategoy = createRequestAction('category/REMOVE_CATEGORY');

// initial state
const initialState = {
  categories: null,
};

// reducers
export const categoryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getCategories.SUCCESS:
        draft.categories = action.payload;
        break;

      default:
        break;
    }
  });

// sagas
const handleGetCategories = createRequestSaga(getCategories, function* () {
  const headers = yield getHeaders();
  const response = yield call(api.get, '/', { headers });
  console.log(response);

  return response.data;
});

const handleCreateCategory = createRequestSaga(createCategoy, function* (action) {
  const headers = yield getHeaders();
  const { name, is_favorited } = action.payload;
  const response = yield call(api.post, '/', { name, is_favorited }, { headers });
  return response.data;
});

const handleUpdateCategoy = createRequestSaga(updateCategoy, function* (action) {
  const headers = yield getHeaders();
  const { id, name, order, is_favorited } = action.payload;
  yield call(api.put, `/${id}`, { name, order, is_favorited }, { headers });
});

const handleRemoveCategory = createRequestSaga(removeCategoy, function* (action) {
  const headers = yield getHeaders();
  const { id } = action.payload;
  yield call(api.delete, `/${id}`, { headers });
});

export function* categorySaga() {
  yield all([
    takeEvery(getCategories.REQUEST, handleGetCategories),
    takeEvery(createCategoy.REQUEST, handleCreateCategory),
    takeEvery(updateCategoy.REQUEST, handleUpdateCategoy),
    takeEvery(removeCategoy.REQUEST, handleRemoveCategory),
  ]);
}

export * from './api';
