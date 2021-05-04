import { getAccessToken } from './auth'
import { axiosSetting } from './client'

export const socketInfoData = {
  host: `wss://${axiosSetting.host}/ws/connection/?token={token}`,
  replaceWS(token) {
    return this.host.replace('{token}', token)
  },
}

class AlaramWS {
  connectionRetry = 1

  constructor() {
    this.ws = null
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

  setOnerror(callback) {
    try {
      if (!this.ws) return
      if (callback && typeof callback === 'function') this.ws.onerror = callback
      else {
        this.ws.onerror = (_e) => {
          if (this.ws.readyState === 3 && this.connectionRetry <= 10) {
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

export const alarmSocket = new AlaramWS()
