import queryInfoData from './queryInfoData';
import { axios } from '@http/client';
import queryFilter from '@http/queryFilter';

export const linkCreate = (data = {}) => {
  const queryData = queryInfoData['linkCreate'];
  const info = queryFilter({ queryData, originDataInfo: data });
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data });
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info);
};
