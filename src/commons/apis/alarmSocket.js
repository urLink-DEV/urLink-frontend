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
          const data = JSON.parse(e.data);
          console.log(data);
        };
      }
    } catch(error) {
      console.warn(error)
    }
  },
  onclose: (callback) => {
    if(callback && typeof callback === "function") server.onclose = callback
    else {
      server.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
      };
    }
  },
  alarmRead: ({ id }) => {
    try {
      if(!id) throw new Error("id값은 필수 입니다.")
      const alarmReadMessage = queryData["alarmReadMessage"]
      alarmReadMessage.alarm_id = id
      server.send(JSON.stringify(alarmReadMessage))
    }
    catch(error) {
      console.warn(error)
    }
  },
  alarmNoReturn: ({ id }) => {
    try {
      if(!id) throw new Error("id값은 필수 입니다.")
      const alarmNoReturnMessage = queryData["alarmNoReturnMessage"]
      alarmNoReturnMessage.alarm_id = id
      server.send(JSON.stringify(alarmNoReturnMessage))
    }
    catch(error) {
      console.warn(error)
    }
  }
}

export default alarmSocket