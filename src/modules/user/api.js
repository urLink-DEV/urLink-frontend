import queryInfoData from './queryInfoData';

import { axios } from '@commons/http/client';
import queryFilter from '@commons/http/queryFilter';

export const nRegister = (data = {}) => {
  const queryData = queryInfoData['nRegister'];
  const info = queryFilter({ queryData, originDataInfo: data });
  return axios[queryData.method](queryData.API, info);
};

export const nLogin = (data = {}) => {
  const queryData = queryInfoData['nLogin'];
  const info = queryFilter({ queryData, originDataInfo: data });
  return axios[queryData.method](queryData.API, info);
};

export const gRegister = (data = {}) => {
  const queryData = queryInfoData['gRegister'];
  const info = queryFilter({ queryData, originDataInfo: data });
  return axios[queryData.method](queryData.API, info);
};

export const gLogin = (data = {}) => {
  const queryData = queryInfoData['gLogin'];
  const info = queryFilter({ queryData, originDataInfo: data });
  return axios[queryData.method](queryData.API, info);
};

export const userRead = (data = {}) => {
  const queryData = queryInfoData['userRead'];
  const info = queryFilter({ queryData, originDataInfo: data });
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data });
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info);
};

export const userModiify = (data = {}) => {
  const queryData = queryInfoData['userModiify'];
  const info = queryFilter({ queryData, originDataInfo: data });
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data });
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info);
};

export const userRemove = (data = {}) => {
  const queryData = queryInfoData['userRemove'];
  const info = queryFilter({ queryData, originDataInfo: data });
  const urlData = queryFilter({ queryData, queryType: 'urlQuery', originDataInfo: data });
  return axios[queryData.method](queryData.replaceAPI({ ...urlData }), info);
};
