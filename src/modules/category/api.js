import queryInfoData from './queryInfoData'

import { axios } from '@commons/http/client'
import queryFilter from '@commons/http/queryFilter'

export const categoriesRead = (data = {}) => {
  const queryData = queryInfoData['categoriesRead']
  const info = queryFilter({ queryData, originDataInfo: data })
  return axios[queryData.method](queryData.API, info)
}

export const categoryCreate = (data = {}) => {
  const queryData = queryInfoData['categoryCreate']
  const info = queryFilter({ queryData, originDataInfo: data })
  return axios[queryData.method](queryData.API, info)
}

export const categoryModify = (data = {}) => {
  const queryData = queryInfoData['categoryModify']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const categoryRemove = (data = {}) => {
  const queryData = queryInfoData['categoryRemove']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}
