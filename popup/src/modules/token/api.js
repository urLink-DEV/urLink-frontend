import queryInfoData from './queryInfoData';
import { axios } from '@http/client';
import queryFilter from '@http/queryFilter';

export const updateToken = (data = {}) => {
  const queryData = queryInfoData['updateToken'];
  const info = queryFilter({ queryData, originDataInfo: data });
  return axios[queryData.method](queryData.API, info);
};
