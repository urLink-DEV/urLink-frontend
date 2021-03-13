import { useEffect, useCallback } from 'react'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { historyLinkListRead, historyLinkSelector, setHistoryLinkChnageFilter } from '@modules/historyLink'

export function useHistoryLinkListData() {
  const dispatch = useDispatch()
  const filter = useSelector(historyLinkSelector.filter)
  const listData = useSelector(historyLinkSelector.listData)
  const pending = useSelector((state) => state.pending[historyLinkListRead.TYPE])
  const error = useSelector((state) => state.error[historyLinkListRead.TYPE])

  const reload = useCallback(() => {
    dispatch(
      setHistoryLinkChnageFilter({
        text: '',
        startTime: new Date(moment().add(-1, 'day')).getTime(),
        endTime: new Date().getTime(),
        isNext: false,
      })
    )
  }, [dispatch])

  const search = useCallback(
    (value) => {
      dispatch(
        setHistoryLinkChnageFilter({
          text: value,
          startTime: value ? 0 : new Date(moment().add(-1, 'day')).getTime(),
          endTime: new Date().getTime(),
          isNext: false,
        })
      )
    },
    [dispatch]
  )

  const next = useCallback(() => {
    dispatch(
      setHistoryLinkChnageFilter({
        startTime: new Date(moment(filter.startTime).add(-1, 'day')).getTime(),
        endTime: filter.startTime,
        isNext: true,
      })
    )
  }, [dispatch, filter.startTime])

  useEffect(() => {
    if (pending === undefined) reload()
  }, [pending, reload])

  useEffect(() => {
    if (MIN_TIME < filter.startTime || !filter.startTime) {
      dispatch(historyLinkListRead.request(filter))
    }
  }, [filter, dispatch])

  return { pending, error, filter, listData, reload, search, next }
}

const MIN_TIME = new Date(moment().add(-1, 'year')).getTime()
