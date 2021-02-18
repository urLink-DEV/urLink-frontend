import { createAction, createReducer } from '@reduxjs/toolkit'
import { createRequestAction, createRequestThunk } from '../helpers'

export const LINK = 'LINK'

export const linksRead = createRequestAction(`${LINK}/READ`)
export const linksReadThunk = createRequestThunk(linksRead)

export const linkCreate = createRequestAction(`${LINK}/CREATE`)
export const linkCreateThunk = createRequestThunk(linkCreate)

export const linkModify = createRequestAction(`${LINK}/MODIFY`)
export const linkModifyThunk = createRequestThunk(linkModify)

export const linkRemove = createRequestAction(`${LINK}/REMOVE`)
export const linkRemoveThunk = createRequestThunk(linkRemove)

export const linkSelect = createAction(`${LINK}/SELECT`)

const initialState = {
  data: [],
  selectedLink: {},
}

export const linkReducer = createReducer(initialState, {
  [linksRead.SUCCESS]: (state, { payload }) => {
    state.data = payload
  },
  [linkSelect]: (state, { payload }) => {
    state.selectedLink = { ...state.selectedLink, ...payload }
  },
})

export const selectLinks = state => state[LINK].data
export const selectSelectedLink = state => state[LINK].selectedLink