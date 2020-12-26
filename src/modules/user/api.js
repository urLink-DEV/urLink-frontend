import { axios, api } from '@commons/http/client';
import queryData, { selialize } from '@commons/http/queryData';

export const nRegister = (data = {}) => {
  const info = selialize({ type: 'nRegister', originDataInfo: data });
  return axios[queryData.nRegister.method](api.N_MEMBER_REGISTER, info);
};

export const nLogin = (data = {}) => {
  const info = selialize({ type: 'nLogin', originDataInfo: data });
  return axios[queryData.nLogin.method](api.N_MEMBER_LOGIN, info);
};

export const gRegister = (data = {}) => {
  const info = selialize({ type: 'gRegister', originDataInfo: data });
  return axios[queryData.gRegister.method](api.G_MEMBER_REGISTER, info);
};

export const gLogin = (data = {}) => {
  const info = selialize({ type: 'gLogin', originDataInfo: data });
  return axios[queryData.nLogin.method](api.G_MEMBER_LOGIN, info);
};
