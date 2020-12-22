import { produce } from "immer"
import { getActionName } from "../helpers"
import { all, put, takeEvery } from "redux-saga/effects"
// import { toast } from 'react-toastify';

import { createAction } from "@reduxjs/toolkit"
export const removeError = createAction("error/REMOVE_ERROR")

export const errorReducer = (state = {}, action) =>
	produce(state, (draft) => {
		const { type } = action
		const actionName = getActionName(type)

		if (type === removeError.type) {
			delete draft[action.payload]
		}

		if (actionName) {
			const key = action.meta?.key

			if (type.endsWith("/FAILURE")) {
				if (key !== undefined) {
					if (typeof draft[actionName] !== "object") draft[actionName] = {}
					draft[actionName][key] = action.payload
				} else {
					draft[actionName] = action.payload
				}
			} else if (type.endsWith("/SUCCESS") || type.endsWith("/REQUEST")) {
				if (key !== undefined) {
					if (typeof draft[actionName] !== "object") draft[actionName] = {}
					delete draft[actionName][key]
				} else {
					delete draft[actionName]
				}
			}
		}
	})

function* handleError(action) {
	const error = action.payload

	if (!error?.response) {
		console.error(error?.message)
		return
		// return toast.error(error.message);
	}

	console.error(error.response.data)
}

export function* errorSaga() {
	yield all([
		takeEvery((action) => /\/FAILURE$/.test(action.type), handleError),
	])
}
