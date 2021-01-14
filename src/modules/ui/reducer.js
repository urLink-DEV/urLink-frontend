import { createAction, createReducer } from '@reduxjs/toolkit';

export const setIsMobile = createAction('ui/SET_IS_MOBILE');
export const openDialog = createAction('ui/OPEN_DIALOG');
export const closeDialog = createAction('ui/CLOSE_DIALOG');
export const closeAllDialogs = createAction('ui/CLOSE_ALL_DIALOGS');

// initial state
const initialState = {
  dialogs: [],
};

// Reducer
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
});
