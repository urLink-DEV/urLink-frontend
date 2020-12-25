import { axios, api } from '../http/client'
import queryData from '../http/queryData'
import { getQueryParams, getDashQueryParams } from '../http/quryParam'

const alarmAPI = {
  get : (alarmInfo) => {
    try {
      const alarmReadeKeys = Object.keys(queryData["alarmRead"])
      const alarmRead = {}
      Object.entries(alarmInfo).forEach(([key, value]) => {
        if (alarmReadeKeys.includes(key)) alarmRead[key] = value
      })
      return axios.get(api.ALARM, alarmRead)
    } catch (error) {
      return {error}
    }
  },

  write: (alarmInfo) => {
    try {
      const { category, url, reserved_time: { year, month, day } } = alarmInfo
      const queryParams = getQueryParams({ category, url })
      if (!queryParams) throw new Error(`category: ${category}, url: ${url} Id는 필수 입니다.`)
      else if(!year || !month || !day) throw new Error(`알람 필수 값을 넣어야 합니다. year : ${year} || month : ${month} || day : ${day}`)
      const alarmWriteKeys = Object.keys(queryData["alarmWrite"])
      const alarmWrite = {}
      Object.entries(alarmInfo).forEach(([key, value]) => {
        if (alarmWriteKeys.includes(key)) alarmWrite[key] = value
      })
      return axios.post(api.ALARM + queryParams, alarmWrite)
    } catch (error) {
      return {error}
    }
  },

  remove : (alarmInfo) => {
    try {
      const { id } = alarmInfo
      const dashQueryParams = getDashQueryParams([id])
      if(!dashQueryParams) throw new Error(`alarm : ${id} Id는 필수 입니다.`)
      const alarmDeleteKeys = Object.keys(queryData["alarmDelete"])
      const alarmDelete = {}
      Object.entries(alarmInfo).forEach(([key, value]) => {
        if (alarmDeleteKeys.includes(key)) alarmDelete[key] = value
      })
      return axios.delete(api.ALARM + dashQueryParams, alarmDelete)
    } catch (error) {
      return {error}
    }
  }
}
export default alarmAPI