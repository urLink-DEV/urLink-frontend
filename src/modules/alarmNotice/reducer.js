import { createReducer } from '@reduxjs/toolkit'

import { createRequestAction, createRequestThunk } from '../helpers'

export const ALARM_NOTICE = 'ALARM_NOTICE'

export const alaramNoticeConnection = createRequestAction(`${ALARM_NOTICE}/CONNECTION`)
export const alaramNoticeListLoad = createRequestAction(`${ALARM_NOTICE}/LIST_LOAD`)
export const alaramNoticeAdd = createRequestAction(`${ALARM_NOTICE}/ADD`)
export const alaramNoticeModify = createRequestAction(`${ALARM_NOTICE}/MODIFY`)
export const alaramNoticeReadNotice = createRequestAction(`${ALARM_NOTICE}/READ_NOTICE`)
export const alaramNoticeReadNoticeThunk = createRequestThunk(alaramNoticeReadNotice)
export const alaramNoticeNoReturnNotice = createRequestAction(`${ALARM_NOTICE}/NO_RETURN_NOTICE`)
export const alaramNoticeNoReturnNoticeThunk = createRequestThunk(alaramNoticeNoReturnNotice)

// Reducer
const initialState = {
  listData: [],
}
export const alaramNoticeReducer = createReducer(initialState, {
  [alaramNoticeListLoad.SUCCESS]: (state, { payload: listData }) => {
    state.listData = listData
  },
  [alaramNoticeAdd.SUCCESS]: (state, { payload: data }) => {
    state.listData.push(data)
  },
  [alaramNoticeModify.SUCCESS]: (state, { payload: listData }) => {
    state.listData = listData
  },
})

// Select
export const alaramNoticeSelector = {
  listData: (state) => state[ALARM_NOTICE].listData,
}
