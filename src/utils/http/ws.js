import { getAccessToken } from './auth'
import { axiosSetting } from './client'

export const SOCKET_READY_STATE = {
  OPEN: 1,
  CLOSED: 3,
}

export const socketInfoData = {
  host: `wss://${axiosSetting.host}/ws/connection/?token={token}`,
  replaceWS(token) {
    return this.host.replace('{token}', token)
  },
}

class AlarmWS {
  constructor() {
    this.connectionRetry = 1
    this.ws = null
    this.connectionRetry = 1
  }

  onConnection(settingWs = {}) {
    this.ws = new WebSocket(socketInfoData.replaceWS(getAccessToken()))
    const { onmessage, onerror, onclose } = settingWs
    this.ws.onmessage = onmessage
    this.ws.onerror = onerror
    this.ws.onclose = onclose
    return this
  }

  onClose() {
    if (!this.ws) return
    this.ws.close()
    return this
  }

  setOnmessage(callback) {
    try {
      if (!this.ws) this.onConnection()
      if (callback && typeof callback === 'function') this.ws.onmessage = callback
      else {
        this.ws.onmessage = (e) => {
          const { data } = JSON.parse(e.data)
          console.log(data)
        }
      }
      return this
    } catch (error) {
      console.error(error)
    }
  }

  setOnerror(callback, noRequestConnection = false) {
    try {
      if (!this.ws) return
      if (noRequestConnection && callback && typeof callback === 'function') this.ws.onerror = callback
      else {
        this.ws.onerror = async (event) => {
          if (callback && typeof callback === 'function') callback(event)
          if (this.ws.readyState === SOCKET_READY_STATE.CLOSED && this.connectionRetry <= 10) {
            setTimeout(() => {
              this.onConnection(this.ws)
              this.connectionRetry++
            }, 2000)
          }
        }
      }
      return this
    } catch (error) {
      console.error(error)
    }
  }
}

export const alarmSocket = new AlarmWS()
