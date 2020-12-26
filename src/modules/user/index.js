import * as api from './api';
import { produce } from 'immer';
import { createRequestAction, createRequestSaga, createRequestThunk } from '../helpers';
import { call, all, takeEvery } from 'redux-saga/effects';

export const userRegister = createRequestAction('user/REGISTER');
export const userRegisterThunk = createRequestThunk(userRegister);

export const userLogin = createRequestAction('user/LOGIN');
export const userLoginThunk = createRequestThunk(userLogin);

export const userGregister = createRequestAction('user/G_REGISTER');
export const userGregisterThunk = createRequestThunk(userGregister);

export const userGlogin = createRequestAction('user/G_LOGIN');
export const userGloginThunk = createRequestThunk(userGlogin);

const initialState = {
  user: {},
};

// Reducer
export const userReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case userRegister.SUCCESS:
        break;
      default:
        break;
    }
  });

// Saga
const watchuserRegister = createRequestSaga(userRegister, function* (action) {
  const response = yield call(api.nRegister, action.payload, null);
  return response.data;
});

const watchuserLogin = createRequestSaga(userLogin, function* (action) {
  const response = yield call(api.nLogin, action.payload, null);
  return response.data;
});

const watchuserGregister = createRequestSaga(userGregister, function* (action) {
  const response = yield call(api.gRegister, action.payload, null);
  return response.data;
});

const watchuserGlogin = createRequestSaga(userGlogin, function* (action) {
  const response = yield call(api.gLogin, action.payload, null);
  return response.data;
});

export function* userSaga() {
  yield all([
    takeEvery(userRegister.REQUEST, watchuserRegister),
    takeEvery(userLogin.REQUEST, watchuserLogin),
    takeEvery(userGregister.REQUEST, watchuserGregister),
    takeEvery(userGlogin.REQUEST, watchuserGlogin),
  ]);
}
