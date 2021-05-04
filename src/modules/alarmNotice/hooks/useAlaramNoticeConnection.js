import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { alaramNoticeConnection } from '@modules/alarmNotice'
import { ERROR } from '@modules/error'
import { PENDING } from '@modules/pending'
import { alarmSocket } from '@utils/http/ws'

const OPEN = 1

const useAlaramNoticeConnection = () => {
  const dispatch = useDispatch()
  const pending = useSelector((state) => state[PENDING][alaramNoticeConnection.TYPE])
  const error = useSelector((state) => state[ERROR][alaramNoticeConnection.TYPE])

  useEffect(() => {
    if (!alarmSocket.ws || alarmSocket.ws?.readyState !== OPEN) {
      alarmSocket
        .onConnection()
        .setOnmessage((event) => {
          dispatch(alaramNoticeConnection.request({ event }))
        })
        .setOnerror((event) => {
          dispatch(alaramNoticeConnection.failure({ event }))
        })
    }
    return () => {
      alarmSocket.onClose()
    }
  }, [dispatch])

  return { pending, error }
}

export default useAlaramNoticeConnection
