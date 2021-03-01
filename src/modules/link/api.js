import queryInfoData from './queryInfoData'

import { axios } from '@commons/http/client'
import queryFilter from '@commons/http/queryFilter'

export const linksRead = (data = {}) => {
  const queryData = queryInfoData['linksRead']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const linkModify = (data = {}) => {
  const queryData = queryInfoData['linkModify']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const linkRemove = (data = {}) => {
  const queryData = queryInfoData['linkRemove']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}

export const linkCreate = (data = {}) => {
  const queryData = queryInfoData['linkCreate']
  const info = queryFilter({ queryData, originDataInfo: data })
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data })
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info)
}
