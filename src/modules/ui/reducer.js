import { createAction, createReducer, createSelector } from '@reduxjs/toolkit';

export const UI = 'UI';

export const setIsMobile = createAction(`${UI}/SET_IS_MOBILE`);
export const openDialog = createAction(`${UI}/OPEN_DIALOG`);
export const closeDialog = createAction(`${UI}/CLOSE_DIALOG`);
export const closeAllDialogs = createAction(`${UI}/CLOSE_ALL_DIALOGS`);
export const setToast = createAction(`${UI}/SET_TOAST`);

// Reducer
const initialState = {
  dialogs: [],
  toast: {
    open: false,
    type: 'success',
    message: '',
  },
};
export const uiReducer = createReducer(initialState, {
  [openDialog.type]: (state, { payload }) => {
    if (!state.dialogs.find((dialog) => dialog.type === payload.type)) {
      state.dialogs.push(payload);
    }
  },
  [closeDialog.type]: (state, { payload }) => {
    state.dialogs = state.dialogs.filter((dialog) => {
      if (payload.meta?.key) {
        return dialog.meta?.key !== payload.meta?.key;
      }
      return dialog.type !== payload.type;
    });
  },
  [closeAllDialogs.type]: (state) => {
    state.dialogs = initialState.dialogs;
  },
  [setToast.type]: (state, { payload }) => {
    state.toast = { ...state.toast, ...payload };
  },
});

// Select
const selectAllState = createSelector(
  (state) => state,
  (state) => {
    return state;
  }
);
export const uiSelector = {
  dialogs: (state) => selectAllState(state[UI].dialogs),
  toast: (state) => selectAllState(state[UI].toast),
};
