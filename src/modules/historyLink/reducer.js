import { createAction, createReducer, createSelector } from '@reduxjs/toolkit';
import { createRequestAction } from '../helpers';

export const HISTORY_LINK = 'HISTORY_LINK';

export const setInitHistoryLinkFilter = createAction(`${HISTORY_LINK}/INIT_FILTER`);
export const setHistoryLinkChnageFilter = createAction(`${HISTORY_LINK}/CHANGE_FILTER`);
export const historyLinkListRead = createRequestAction(`${HISTORY_LINK}/LIST_READ`);

// Reducer
const initialState = {
  filter: {
    text: '',
    startTime: 0,
    endTime: 0,
    maxResults: 0,
    isNext: false,
  },
  listData: [],
};
export const historyLinkReducer = createReducer(initialState, {
  [setInitHistoryLinkFilter]: (state) => {
    state.filter = initialState.filter;
  },
  [setHistoryLinkChnageFilter]: (state, { payload: data }) => {
    state.filter = { ...state.filter, ...data };
  },
  [historyLinkListRead.SUCCESS]: (state, { payload: listData }) => {
    if (state.filter.isNext) state.listData.push(...listData);
    else state.listData = listData;
  },
});

// Select
const selectAllState = createSelector(
  (state) => state,
  (state) => {
    return state;
  }
);
const selectfilterState = createSelector(
  (state) => state.text,
  (state) => state.startTime,
  (state) => state.endTime,
  (state) => state.maxResults,
  (state) => state.isNext,
  (text, startTime, endTime, maxResults, isNext) => {
    return {
      text,
      startTime,
      endTime,
      maxResults,
      isNext,
    };
  }
);
export const historyLinkSelector = {
  listData: (state) => selectAllState(state[HISTORY_LINK].listData),
  filter: (state) => selectfilterState(state[HISTORY_LINK].filter),
};
