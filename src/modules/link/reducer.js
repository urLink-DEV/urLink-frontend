import { createAction, createReducer } from '@reduxjs/toolkit'

import { createRequestAction, createRequestThunk } from '../helpers'

export const LINK = 'LINK'

export const linksRead = createRequestAction(`${LINK}/LIST/READ`)

export const linkCreate = createRequestAction(`${LINK}/CREATE`)
export const linkCreateThunk = createRequestThunk(linkCreate)

export const linkModify = createRequestAction(`${LINK}/MODIFY`)
export const linkModifyThunk = createRequestThunk(linkModify)

export const linkRemove = createRequestAction(`${LINK}/REMOVE`)
export const linkRemoveThunk = createRequestThunk(linkRemove)

export const linksRemove = createRequestAction(`${LINK}/LIST/REMOVE`)
export const linksRemoveThunk = createRequestThunk(linksRemove)

export const linkSelectBoxChangeState = createAction(`${LINK}/SELECTED_STATE`)
export const linkSelect = createAction(`${LINK}/SELECT`)
export const linkCancleSelect = createAction(`${LINK}/CANCLE_SELECT`)
export const linkClearSelect = createAction(`${LINK}/CLEAR_SELECT`)

export const linkSearchFilterInit = createAction(`${LINK}/INIT_SEARCH_FILTER`)
export const linkSearchFilterChangeState = createAction(`${LINK}/CHANGE_SEARCH_FILTER`)

// Reducer
const initialState = {
  searchFilter: {
    selectedName: '',
    keyword: '',
  },
  linksData: {},
  isOpenLinkSelectBox: false,
  selectedLink: [],
  createLinksCategoryId: undefined,
}
export const linkReducer = createReducer(initialState, {
  [linkSearchFilterInit]: (state) => {
    state.searchFilter = initialState.searchFilter
  },
  [linkSearchFilterChangeState]: (state, { payload: data }) => {
    state.searchFilter = { ...state.searchFilter, ...data }
  },
  [linksRead.SUCCESS]: (state, { payload, meta }) => {
    state.linksData[meta.key] = payload
  },
  [linkCreate.REQUEST]: (state, { payload }) => {
    state.createLinksCategoryId = payload.categoryId
  },
  [linkSelectBoxChangeState]: (state, { payload }) => {
    state.isOpenLinkSelectBox = payload
  },
  [linkSelect]: (state, { payload: linkData }) => {
    if (!state.selectedLink.find((data) => data.id === linkData.id)) {
      state.selectedLink.push(linkData)
    }
  },
  [linkCancleSelect]: (state, { payload: linkData }) => {
    state.selectedLink = state.selectedLink.filter((data) => data.id !== linkData.id)
  },
  [linkClearSelect]: (state) => {
    state.selectedLink = initialState.selectedLink
  },
})

// Select
export const linkSelector = {
  linksData: (state) => state[LINK].linksData,
  isOpenLinkSelectBox: (state) => state[LINK].isOpenLinkSelectBox,
  selectSelectedLink: (state) => state[LINK].selectedLink,
  searchFilter: (state) => state[LINK].searchFilter,
  createLinksCategoryId: (state) => state[LINK].createLinksCategoryId,
}
