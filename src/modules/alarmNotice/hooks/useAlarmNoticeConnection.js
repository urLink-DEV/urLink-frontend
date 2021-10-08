import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { alarmNoticeConnection } from '@modules/alarmNotice'
import { ERROR } from '@modules/error'
import { PENDING } from '@modules/pending'
import { alarmSocket } from '@utils/http/ws'

const OPEN = 1

const useAlarmNoticeConnection = () => {
  const dispatch = useDispatch()
  const pending = useSelector((state) => state[PENDING][alarmNoticeConnection.TYPE])
  const error = useSelector((state) => state[ERROR][alarmNoticeConnection.TYPE])

  useEffect(() => {
    if (!alarmSocket.ws || alarmSocket.ws?.readyState !== OPEN) {
      alarmSocket
        .onConnection()
        .setOnmessage((event) => {
          dispatch(alarmNoticeConnection.request({ event }))
        })
        .setOnerror((event) => {
          dispatch(alarmNoticeConnection.failure({ event }))
        })
    }
    return () => {
      alarmSocket.onClose()
    }
  }, [dispatch])

  return { pending, error }
}

export default useAlarmNoticeConnection
