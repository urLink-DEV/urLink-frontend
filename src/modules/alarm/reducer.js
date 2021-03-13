import { createReducer } from '@reduxjs/toolkit'

import { createRequestAction, createRequestThunk } from '../helpers'

export const ALARM = 'ALARM'

export const alarmsRead = createRequestAction(`${ALARM}/READ`)

export const alarmCreate = createRequestAction(`${ALARM}/CREATE`)
export const alarmCreateThunk = createRequestThunk(alarmCreate)

export const alarmRemove = createRequestAction(`${ALARM}/REMOVE`)

// Reducer
const initialState = {}
export const alarmReducer = createReducer(initialState, {})

// Select
