import { createAction, createReducer } from '@reduxjs/toolkit'

export const UI = 'UI'

export const setIsMobile = createAction(`${UI}/SET_IS_MOBILE`)
export const openDialog = createAction(`${UI}/OPEN_DIALOG`)
export const closeDialog = createAction(`${UI}/CLOSE_DIALOG`)
export const closeAllDialogs = createAction(`${UI}/CLOSE_ALL_DIALOGS`)
export const setToast = createAction(`${UI}/SET_TOAST`)
export const openDropZone = createAction(`${UI}/OPEN_DROP_ZONE`)
export const closeDropZone = createAction(`${UI}/CLOSE_DROP_ZONE`)
export const closeAllDropZones = createAction(`${UI}/CLOSE_ALL_DROP_ZONES`)
export const setDrag = createAction(`${UI}/SET_DRAG`)
export const clearDrag = createAction(`${UI}/CLEAR_DRAG`)

// Reducer
const initialState = {
  dialogs: [],
  toast: {
    open: false,
    type: 'success',
    message: '',
  },
  dropZones: [],
  drag: {
    type: '',
    status: '',
    link: {
      listData: [],
      data: {
        id: -1,
        path: '',
      },
    },
    category: {
      listData: [],
      data: {
        id: -1,
        name: '',
        order: -1,
        is_favorited: undefined, // true | false
        dragFinished: undefined, // true | false
      },
    },
  },
}
export const uiReducer = createReducer(initialState, {
  [openDialog]: (state, { payload }) => {
    if (!state.dialogs.find((dialog) => dialog.type === payload.type)) {
      state.dialogs.push(payload)
    }
  },
  [closeDialog]: (state, { payload }) => {
    state.dialogs = state.dialogs.filter((dialog) => {
      if (payload.meta?.key) {
        return dialog.meta?.key !== payload.meta?.key
      }
      return dialog.type !== payload.type
    })
  },
  [closeAllDialogs]: (state) => {
    state.dialogs = initialState.dialogs
  },
  [setToast]: (state, { payload }) => {
    state.toast = { ...state.toast, ...payload }
  },
  [openDropZone]: (state, { payload }) => {
    if (!state.dropZones.find((dropZone) => dropZone.type === payload.type)) {
      state.dropZones.push(payload)
    }
  },
  [closeDropZone]: (state, { payload }) => {
    state.dropZones = state.dropZones.filter((dropZone) => {
      if (payload.meta?.key) {
        return dropZone.meta?.key !== payload.meta?.key
      }
      return dropZone.type !== payload.type
    })
  },
  [closeAllDropZones]: (state) => {
    state.dropZones = initialState.dropZones
  },
  [setDrag]: (state, { payload: { type, status, ...props } }) => {
    state.drag.type = type
    state.drag.status = status
    state.drag[type] = { ...state.drag[type], ...props }
  },
  [clearDrag]: (state) => {
    state.drag = initialState.drag
  },
})

// Select
export const uiSelector = {
  dialogs: (state) => state[UI].dialogs,
  toast: (state) => state[UI].toast,
  dropZones: (state) => state[UI].dropZones,
  drag: (state) => state[UI].drag,
}
