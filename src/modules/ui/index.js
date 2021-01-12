import { produce } from "immer"
import { createAction } from "@reduxjs/toolkit"

export const setIsMobile = createAction("ui/SET_IS_MOBILE")
export const openDialog = createAction("ui/OPEN_DIALOG")
export const closeDialog = createAction("ui/CLOSE_DIALOG")
export const closeAllDialogs = createAction("ui/CLOSE_ALL_DIALOGS")

// initial state
const initialState = {
	dialogs: [],
}

// reducers
export const uiReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case openDialog.type: {
				if (
					!draft.dialogs.find((dialog) => dialog.type === action.payload.type)
				) {
					draft.dialogs.push(action.payload)
				}
				break
			}
			case closeDialog.type: {
				draft.dialogs = draft.dialogs.filter((dialog) => {
					if (action.payload?.meta?.key) {
						return dialog?.meta?.key !== action.payload.meta.key
					}
					return dialog.type !== action.payload.type
				})
				break
			}
			case closeAllDialogs.type:
				draft.dialogs = []
				break
			default:
				return state
		}
	})
