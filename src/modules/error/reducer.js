import { createReducer, createAction } from '@reduxjs/toolkit'

import { getActionName } from '../helpers'

export const ERROR = 'ERROR'
const NO_KEY = undefined

export const removeError = createAction('error/REMOVE_ERROR')

// Reducer
const initialState = {}
export const errorReducer = createReducer(
  initialState,
  {
    [removeError]: (state, { payload: actionName }) => {
      delete state[actionName]
    },
  },
  [
    {
      matcher: ({ type }) => {
        return (
          getActionName(type) && (type.endsWith('/REQUEST') || type.endsWith('/SUCCESS') || type.endsWith('/FAILURE'))
        )
      },
      reducer(state, { meta, payload, type }) {
        const actionName = getActionName(type)
        const key = meta?.key

        if (type.endsWith('/FAILURE')) {
          if (key !== NO_KEY) {
            if (typeof state[actionName] !== 'object') state[actionName] = {}
            state[actionName][key] = payload
          } else {
            state[actionName] = payload
          }
        } else if (type.endsWith('/SUCCESS') || type.endsWith('/REQUEST')) {
          if (key !== NO_KEY) {
            if (typeof state[actionName] !== 'object') state[actionName] = {}
            delete state[actionName][key]
          } else {
            delete state[actionName]
          }
        }
      },
    },
  ]
)
