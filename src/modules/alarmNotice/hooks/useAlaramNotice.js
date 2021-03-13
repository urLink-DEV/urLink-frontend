import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { alaramNoticeConnection } from '@modules/alarmNotice'
import { alarmSocket } from '@utils/http/ws'

const OPEN = 1
const CLOSED = 3
const LIMIT_RETRY_CONNECT_COUNT = 1

export function useAlaramNoticeConnection() {
  const dispatch = useDispatch()
  const pending = useSelector((state) => state.pending[alaramNoticeConnection.TYPE])
  const error = useSelector((state) => state.error[alaramNoticeConnection.TYPE])

  useEffect(() => {
    if (!alarmSocket.ws || alarmSocket.ws?.readyState !== OPEN) {
      alarmSocket
        .onConnection()
        .setOnmessage((event) => dispatch(alaramNoticeConnection.request({ event })))
        .setOnerror(
          function (event) {
            if (this.ws.readyState === CLOSED && this.connectionRetry <= LIMIT_RETRY_CONNECT_COUNT) {
              setTimeout(() => {
                this.onConnection(this.ws)
                this.connectionRetry++
              }, 2000)
            } else dispatch(alaramNoticeConnection.failure({ event }))
          }.bind(alarmSocket)
        )
    }
    return () => {
      alarmSocket.onClose()
    }
  }, [dispatch])

  return { pending, error }
}
