import { axios } from '@commons/http/client'
import queryFilter from '@commons/http/queryFilter'
import queryInfoData from './queryInfoData'

export const alarmsRead = (data = {}) => {
  const queryData = queryInfoData['alarmsRead']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const alarmRemove = (data = {}) => {
  const queryData = queryInfoData['alarmRemove']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const alarmCreate = (data = {}) => {
  const queryData = queryInfoData['alarmCreate']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}
