import { createAction, createReducer, createSelector } from '@reduxjs/toolkit'
import { createRequestAction, createRequestThunk } from '../helpers'

export const LINK = 'LINK'

export const linksRead = createRequestAction(`${LINK}/READ`)

export const linkCreate = createRequestAction(`${LINK}/CREATE`)
export const linkCreateThunk = createRequestThunk(linkCreate)

export const linkModify = createRequestAction(`${LINK}/MODIFY`)
export const linkModifyThunk = createRequestThunk(linkModify)

export const linkRemove = createRequestAction(`${LINK}/REMOVE`)
export const linkRemoveThunk = createRequestThunk(linkRemove)

export const linkSelect = createAction(`${LINK}/SELECT`)

// Reducer
const initialState = {
  listData: [],
  selectedLink: {},
}
export const linkReducer = createReducer(initialState, {
  [linksRead.SUCCESS]: (state, { payload }) => {
    state.listData = payload
  },
  [linkSelect]: (state, { payload }) => {
    state.selectedLink = { ...state.selectedLink, ...payload }
  },
})

// Select
const selectAllState = createSelector(
  (state) => state,
  (state) => {
    return state
  }
)
export const linkSelector = {
  listData: (state) => selectAllState(state[LINK].listData),
  selectSelectedLink: (state) => state[LINK].selectedLink,
}
