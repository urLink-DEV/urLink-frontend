import { createReducer, createSelector } from '@reduxjs/toolkit';
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

// Reducer
const initialState = {
  data: {},
};
export const categoryReducer = createReducer(initialState, {
  [categoriesRead.SUCCESS]: (state, { payload }) => {
    state.data = payload;
  },
});

// Select
const selectAllState = createSelector(
  (state) => state,
  (state) => {
    return state;
  }
);
export const categorySelector = {
  data: (state) => selectAllState(state[CATEGORY].data),
};
