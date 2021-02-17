import { createReducer, createSelector, createAction } from '@reduxjs/toolkit';
import { createRequestAction, createRequestThunk } from '../helpers';

export const CATEGORY = 'CATEGORY';

export const categoriesRead = createRequestAction(`${CATEGORY}/READ`);
export const categoriesReadThunk = createRequestThunk(categoriesRead);

export const categoryCreate = createRequestAction(`${CATEGORY}/CREATE`);
export const categoryCreateThunk = createRequestThunk(categoryCreate);

export const categoryModify = createRequestAction(`${CATEGORY}/MODIFY`);
export const categoryModifyThunk = createRequestThunk(categoryModify);

export const categoryRemove = createRequestAction(`${CATEGORY}/REMOVE`);
export const categoryRemoveThunk = createRequestThunk(categoryRemove);

export const categorySelect = createAction(`${CATEGORY}/SELECT`);

// Reducer
const initialState = {
  data: [],
  selectedCategory: {},
};

export const categoryReducer = createReducer(initialState, {
  [categoriesRead.SUCCESS]: (state, { payload }) => {
    state.data = payload;
  },
  [categorySelect]: (state, { payload }) => {
    state.selectedCategory = { ...state.selectedCategory, ...payload };
  },
});

// Select

export const selectCategories = (state) => state[CATEGORY].data;
export const selectSelectedCategory = (state) => state[CATEGORY].selectedCategory;
