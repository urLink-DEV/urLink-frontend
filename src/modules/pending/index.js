import { produce } from "immer"
import { getActionName } from "../helpers"
import { createAction } from "@reduxjs/toolkit"

export const setPending = createAction("pending/SET_PENDING")
export const clearPendingHistory = createAction("pending/CLEAR_PENDING_HISTORY")

export const pendingReducer = (state = {}, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case setPending.type: {
				draft[action.payload] = true
				break
			}

			case clearPendingHistory.type: {
				const { actionName, key } = action.payload

				if (key !== undefined) {
					if (draft[actionName]?.[key]) {
						delete draft[actionName][key]
					}
				} else {
					delete draft[actionName]
				}
				break
			}
			default:
				const { type } = action
				const actionName = getActionName(type)
				if (
					actionName &&
					(type.endsWith("/REQUEST") ||
						type.endsWith("/SUCCESS") ||
						type.endsWith("/FAILURE"))
				) {
					const isPending = type.endsWith("/REQUEST")
					const key = action.meta?.key

					if (key !== undefined) {
						if (typeof draft[actionName] !== "object") draft[actionName] = {}
						draft[actionName][key] = isPending
					} else {
						draft[actionName] = isPending
					}
				}
				break
		}
	})
