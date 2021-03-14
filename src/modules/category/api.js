import { axios } from '@utils/http/client'
import queryFilter from '@utils/http/queryFilter'

import queryInfoData from './queryInfoData'

export const requestCategoriesRead = (data = {}) => {
  const queryData = queryInfoData['categoriesRead']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const requestCategoryCreate = (data = {}) => {
  const queryData = queryInfoData['categoryCreate']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const requestCategoryModify = (data = {}) => {
  const queryData = queryInfoData['categoryModify']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const requestCategoryRemove = (data = {}) => {
  const queryData = queryInfoData['categoryRemove']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}
