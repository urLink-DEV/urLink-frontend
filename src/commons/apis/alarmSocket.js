import auth from './auth'
import { api } from '../http'
import queryData from '../queryData'
import { getQueryParams } from '../quryParam'

let queryParams = getQueryParams({token: auth.getAccessToken()})
let server = null

const alarmSocket = {
  onmessage: (callback) => {
    try{
      server = new WebSocket(api.SOCKET_ALARM+queryParams)
      if(callback && typeof callback === "function") server.onmessage = callback
      else {
        server.onmessage = function(e) {
          const data = JSON.parse(e.data)
          console.log(data)
        }
      }
    } catch(error) {
      return {error}
    }
  },
  onclose: (callback) => {
    if(callback && typeof callback === "function") server.onclose = callback
    else {
      server.onclose = function(e) {
        console.warn('Chat socket closed unexpectedly')
        console.warn(e)
      }
    }
  },
  alarmRead: (socketAlarmInfo) => {
    try {
      const { alarm_id } = socketAlarmInfo
      if(!alarm_id) throw new Error("id값은 필수 입니다.")
      const alarmReadMessageKeys = Object.keys(queryData["alarmReadMessage"])
      const alarmReadMessage = {}
      Object.entries(socketAlarmInfo).forEach(([key, value]) => {
        if (alarmReadMessageKeys.includes(key)) alarmReadMessage[key] = value
      })
      server.send(JSON.stringify(alarmReadMessage))
    }
    catch(error) {
      return {error}
    }
  },
  alarmNoReturn: (socketAlarmInfo) => {
    try {
      const { alarm_id } = socketAlarmInfo
      if(!alarm_id) throw new Error("id값은 필수 입니다.")
      const alarmNoReturnMessageKeys = Object.keys(queryData["alarmNoReturnMessage"])
      const alarmNoReturnMessage = {}
      Object.entries(socketAlarmInfo).forEach(([key, value]) => {
        if (alarmNoReturnMessageKeys.includes(key)) alarmNoReturnMessage[key] = value
      })
      server.send(JSON.stringify(alarmNoReturnMessage))
    }
    catch(error) {
      return {error}
    }
  }
}

export default alarmSocket