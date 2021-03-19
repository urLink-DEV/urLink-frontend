import { requestAlarmReadNotice } from '@/modules/alarmNotice'
import { createTab } from '@/utils/chromeApis/tab'
import { getAccessToken } from '@/utils/http/auth'
import { notifications, notificationsAddListener } from '@utils/chromeApis/notifications'
import { onMessage, REMOVE_TOKEN, UPDATE_TOKEN } from '@utils/chromeApis/onMessage'
import { alarmSocket } from '@utils/http/ws'

function connectionWS() {
  try {
    if (alarmSocket.ws?.OPEN) alarmSocket.onClose()
    if (!getAccessToken()) return
    alarmSocket.onConnection().setOnmessage((event) => {
      const { message, status } = JSON.parse(event.data)
      if (status === 'alarm') {
        notifications('alarm', {
          type: 'basic',
          title: 'urLink 알람이 도착했습니다.',
          message: message.url_title,
          iconUrl: message.url_favicon_path,
        })
        notificationsAddListener(() => {
          requestAlarmReadNotice({ alarm_id: message.id })
          createTab(message.url_path)
        })
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
