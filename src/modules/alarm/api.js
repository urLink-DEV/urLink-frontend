import { axios } from '@utils/http/client'
import queryFilter from '@utils/http/queryFilter'

import queryInfoData from './queryInfoData'

export const requestAlarmsRead = (data = {}) => {
  const queryData = queryInfoData['alarmsRead']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const requestAlarmRemove = (data = {}) => {
  const queryData = queryInfoData['alarmRemove']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const requestAlarmCreate = (data = {}) => {
  const queryData = queryInfoData['alarmCreate']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}
