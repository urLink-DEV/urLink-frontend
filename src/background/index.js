import iconImg from '@assets/images/logo/logo16.png'
import { notifications } from '@utils/chromeApis/notifications'
import { onMessage, UPDATE_TOKEN } from '@utils/chromeApis/onMessage'
import { alarmSocket } from '@utils/http/ws'

function connectionWS() {
  try {
    if (alarmSocket.ws?.OPEN) alarmSocket.onClose()
    alarmSocket
      .onConnection()
      .setOnmessage((event) => {
        const { message, status } = JSON.parse(event.data)
        if (status === 'alarm') {
          notifications({
            type: 'basic',
            title: message.url_title,
            message: message.url_path,
            iconUrl: message.url_favicon_path,
          })
        }
      })
      .setOnerror(() => {
        notifications({
          type: 'basic',
          title: 'urLink',
          message: '로그인 하여 알람을 받아보세요.',
          iconUrl: iconImg,
        })
      })
  } catch (error) {
    console.dir('error', error)
  }
}

try {
  connectionWS()
  onMessage((request) => {
    if (request.message === UPDATE_TOKEN) connectionWS()
  })
} catch (error) {
  console.dir('error', error)
}
