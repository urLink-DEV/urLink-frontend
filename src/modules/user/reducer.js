import { createReducer } from '@reduxjs/toolkit'

import { createRequestAction, createRequestThunk } from '../helpers'

export const USER = 'USER'

export const userRegister = createRequestAction(`${USER}/REGISTER`)
export const userRegisterThunk = createRequestThunk(userRegister)

export const userLogin = createRequestAction(`${USER}/LOGIN`)
export const userLoginThunk = createRequestThunk(userLogin)

export const userLogout = createRequestAction(`${USER}/LOGOUT`)
export const userLogoutThunk = createRequestThunk(userLogout)

export const userGregister = createRequestAction(`${USER}/G_REGISTER`)
export const userGregisterThunk = createRequestThunk(userGregister)

export const userGlogin = createRequestAction(`${USER}/G_LOGIN`)
export const userGloginThunk = createRequestThunk(userGlogin)

export const userRead = createRequestAction(`${USER}/READ`)
export const userReadThunk = createRequestThunk(userRead)

export const userModify = createRequestAction(`${USER}/MODIFY`)
export const userModifyThunk = createRequestThunk(userModify)

export const userRemove = createRequestAction(`${USER}/REMOVE`)
export const userRemoveThunk = createRequestThunk(userRemove)

// Reducer
const initialState = {
  data: {},
}
export const userReducer = createReducer(initialState, {
  [userLogin.SUCCESS]: (state, { payload }) => {
    state.data = payload
  },
  [userGlogin.SUCCESS]: (state, { payload }) => {
    state.data = payload
  },
  [userRead.SUCCESS]: (state, { payload }) => {
    state.data = payload
  },
})

// Select
export const userSelector = {
  data: (state) => state[USER].data,
}
