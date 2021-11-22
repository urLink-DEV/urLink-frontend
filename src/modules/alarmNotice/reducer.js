import { createReducer } from '@reduxjs/toolkit'

import { createRequestAction, createRequestThunk } from '../helpers'

export const ALARM_NOTICE = 'ALARM_NOTICE'

export const alarmNoticeConnection = createRequestAction(`${ALARM_NOTICE}/CONNECTION`)
export const alarmNoticeListLoad = createRequestAction(`${ALARM_NOTICE}/LIST_LOAD`)
export const alarmNoticeAdd = createRequestAction(`${ALARM_NOTICE}/ADD`)
export const alarmNoticeModify = createRequestAction(`${ALARM_NOTICE}/MODIFY`)
export const alarmNoticeReadNotice = createRequestAction(`${ALARM_NOTICE}/READ_NOTICE`)
export const alarmNoticeReadNoticeThunk = createRequestThunk(alarmNoticeReadNotice)
export const alarmNoticeNoReturnNotice = createRequestAction(`${ALARM_NOTICE}/NO_RETURN_NOTICE`)
export const alarmNoticeNoReturnNoticeThunk = createRequestThunk(alarmNoticeNoReturnNotice)

// Reducer
const initialState = {
  listData: [],
}
export const alarmNoticeReducer = createReducer(initialState, {
  [alarmNoticeListLoad.SUCCESS]: (state, { payload: listData }) => {
    state.listData = listData
  },
  [alarmNoticeAdd.SUCCESS]: (state, { payload: data }) => {
    state.listData.push(data)
  },
  [alarmNoticeModify.SUCCESS]: (state, { payload: listData }) => {
    state.listData = listData
  },
})

// Select
export const alarmNoticeSelector = {
  listData: (state) => state[ALARM_NOTICE].listData,
}
