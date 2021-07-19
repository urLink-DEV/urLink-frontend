import { useEffect, useCallback } from 'react'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { ERROR } from '@modules/error'
import { historyLinkListRead, historyLinkSelector, setHistoryLinkChangeFilter } from '@modules/historyLink'
import { INIT, PENDING } from '@modules/pending'

const MIN_TIME = new Date(moment().add(-1, 'year')).getTime()

const useHistoryLinks = () => {
  const dispatch = useDispatch()
  const pending = useSelector((state) => state[PENDING][historyLinkListRead.TYPE])
  const error = useSelector((state) => state[ERROR][historyLinkListRead.TYPE])
  const filter = useSelector(historyLinkSelector.filter)
  const listData = useSelector(historyLinkSelector.listData)

  const reload = useCallback(() => {
    dispatch(
      setHistoryLinkChangeFilter({
        text: '',
        startTime: new Date(moment().add(-1, 'day')).getTime(),
        endTime: new Date().getTime(),
        isNext: false,
      })
    )
  }, [dispatch])

  const keywordSearch = useCallback(
    (value) => {
      dispatch(
        setHistoryLinkChangeFilter({
          text: value,
          startTime: value ? 0 : new Date(moment().add(-1, 'day')).getTime(),
          endTime: new Date().getTime(),
          isNext: false,
        })
      )
    },
    [dispatch]
  )

  const dateSearch = useCallback(
    (value) => {
      dispatch(
        setHistoryLinkChangeFilter({
          startTime: new Date(moment(value).add(-1, 'day')).getTime(),
          endTime: new Date(value).getTime(),
          isNext: false,
        })
      )
    },
    [dispatch]
  )

  const next = useCallback(() => {
    dispatch(
      setHistoryLinkChangeFilter({
        startTime: new Date(moment(filter.startTime).add(-1, 'day')).getTime(),
        endTime: filter.startTime,
        isNext: true,
      })
    )
  }, [dispatch, filter.startTime])

  useEffect(() => {
    if (pending === INIT) reload()
  }, [pending, reload])

  useEffect(() => {
    if (MIN_TIME < filter.startTime || !filter.startTime) {
      dispatch(historyLinkListRead.request(filter))
    }
  }, [filter, dispatch])

  return { pending, error, filter, listData, reload, keywordSearch, dateSearch, next }
}

export default useHistoryLinks
