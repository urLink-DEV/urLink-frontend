import { axios, api } from '../http'
import queryData from '../queryData'
import { getQueryParams, getDashQueryParams } from '../quryParam'

const alarmAPI = {
  get : ({ }) => {
    try {
      const alarmRead = queryData["alarmRead"]
      return axios.get(api.ALARM, alarmRead)
    } catch (error) {
      console.warn(error)
    }
  },

  write: ({ name, category, url, year, month, day, hour, minute }) => {
    try {
      const queryParams = getQueryParams({ category, url })
      if (!queryParams) throw new Error(`category: ${category}, url: ${url} Id는 필수 입니다.`)
      else if(!year || !month || !day || !hour || !minute) throw new Error(`알람 필수 값을 넣어야 합니다. year : ${year} || month : ${month} || day : ${day} || hour :${hour} || minute: ${minute}`)
      const alarmWrite = Object.assign(queryData["alarmWrite"])
      alarmWrite.name = name
      alarmWrite.reserved_time = { year, month, day, hour, minute }
      return axios.post(api.ALARM + queryParams, alarmWrite)
    } catch (error) {
      console.warn(error)
    }
  },

  remove : ({ id }) => {
    try {
      const dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`alarm : ${id} Id는 필수 입니다.`)
      const alarmDelete = Object.assign(queryData["alarmDelete"])
      return axios.delete(api.ALARM + dashQueryParams, alarmDelete)
    } catch (error) {
      console.warn(error)
    }
  }
}
export default alarmAPI