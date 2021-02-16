import queryInfoData from './queryInfoData';
import { axios } from '@commons/http/client';
import queryFilter from '@commons/http/queryFilter';

export const updateToken = (data = {}) => {
  const queryData = queryInfoData['updateToken'];
  const info = queryFilter({ queryData, originDataInfo: data });
  return axios[queryData.method](queryData.API, info);
};
