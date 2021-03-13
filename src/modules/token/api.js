import { axios } from '@utils/http/client'
import queryFilter from '@utils/http/queryFilter'

import queryInfoData from './queryInfoData'

export const updateToken = (data = {}) => {
  const queryData = queryInfoData['updateToken']
  const info = queryFilter({ queryData, originDataInfo: data })
  return axios[queryData.method](queryData.API, info)
}
