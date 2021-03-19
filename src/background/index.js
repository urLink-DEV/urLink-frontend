import { requestAlarmReadNotice } from '@/modules/alarmNotice'
import { createTab } from '@/utils/chromeApis/tab'
import { getAccessToken } from '@/utils/http/auth'
import { onMessage, REMOVE_TOKEN, UPDATE_TOKEN } from '@utils/chromeApis/onMessage'
import { alarmSocket } from '@utils/http/ws'

function connectionWS() {
  try {
    if (alarmSocket.ws?.OPEN) alarmSocket.onClose()
    if (!getAccessToken()) return
    alarmSocket.onConnection().setOnmessage((event) => {
      const { message, status } = JSON.parse(event.data)
      if (status === 'alarm') {
        const notification = new Notification('urLink 알람이 도착했습니다.', {
          icon: message.url_favicon_path,
          body: message.url_title,
        })
        notification.onclick = () => {
          requestAlarmReadNotice({ alarm_id: message.id })
          createTab(message.url_path)
        }
      }
    })
  } catch (error) {
    console.dir('error', error)
  }
}

function connectionClose() {
  if (alarmSocket.ws?.OPEN) alarmSocket.onClose()
}

try {
  connectionWS()
  onMessage((request) => {
    switch (request.message) {
      case UPDATE_TOKEN:
        connectionWS()
        break
      case REMOVE_TOKEN:
        connectionClose()
        break
      default:
        break
    }
  })
} catch (error) {
  console.dir('error', error)
}
