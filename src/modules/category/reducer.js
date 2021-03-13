import { createReducer, createAction } from '@reduxjs/toolkit'

import { createRequestAction, createRequestThunk } from '../helpers'

export const CATEGORY = 'CATEGORY'

export const categoriesRead = createRequestAction(`${CATEGORY}/READ`)
export const categoriesReadThunk = createRequestThunk(categoriesRead)

export const categoryCreate = createRequestAction(`${CATEGORY}/CREATE`)
export const categoryCreateThunk = createRequestThunk(categoryCreate)

export const categoryModify = createRequestAction(`${CATEGORY}/MODIFY`)
export const categoryModifyThunk = createRequestThunk(categoryModify)

export const categoryRemove = createRequestAction(`${CATEGORY}/REMOVE`)
export const categoryRemoveThunk = createRequestThunk(categoryRemove)

export const categorySelect = createAction(`${CATEGORY}/SELECT`)

// Reducer
const initialState = {
  data: [],
  selectedCategory: {},
}

export const categoryReducer = createReducer(initialState, {
  [categoriesRead.SUCCESS]: (state, { payload, meta }) => {
    state.data = payload

    if (meta?.key === 'isFirstCategory') {
      state.selectedCategory = {
        ...state.selectedCategory,
        ...payload.filter((item) => !Boolean(item.is_favorited))[0],
      }
    }
  },

  [categorySelect]: (state, { payload }) => {
    state.selectedCategory = { ...state.selectedCategory, ...payload }
  },
})

// Select
export const selectCategories = (state) => state[CATEGORY].data
export const selectFavoriteCategories = (state) => state[CATEGORY].data.filter((item) => Boolean(item.is_favorited))
export const selectNotFavoriteCategories = (state) => state[CATEGORY].data.filter((item) => !Boolean(item.is_favorited))
export const selectSelectedCategory = (state) => state[CATEGORY].selectedCategory
