import { createAction, createReducer } from '@reduxjs/toolkit'

import { getActionName } from '../helpers'

export const PENDING = 'PENDING'
export const NO_KEY = undefined

export const setPending = createAction(`${PENDING}/SET_PENDING`)
export const clearPendingHistory = createAction(`${PENDING}/CLEAR_PENDING_HISTORY`)

// Reducer
const initialState = {}
export const pendingReducer = createReducer(
  initialState,
  {
    [setPending]: (state, { payload: actionName }) => {
      state[actionName] = true
    },
    [clearPendingHistory]: (state, { payload: { actionName, key } }) => {
      if (key !== NO_KEY) {
        if (state[actionName]?.[key]) {
          delete state[actionName][key]
        }
      } else {
        delete state[actionName]
      }
    },
  },
  [
    {
      matcher: ({ type }) => {
        return (
          getActionName(type) && (type.endsWith('/REQUEST') || type.endsWith('/SUCCESS') || type.endsWith('/FAILURE'))
        )
      },
      reducer(state, { meta, type }) {
        const actionName = getActionName(type)
        const isPending = type.endsWith('/REQUEST')
        const key = meta?.key

        if (key !== NO_KEY) {
          if (typeof state[actionName] !== 'object') state[actionName] = {}
          state[actionName][key] = isPending
        } else {
          state[actionName] = isPending
        }
      },
    },
  ]
)
