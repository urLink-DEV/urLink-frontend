import Axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, removeAccessToken } from './auth';
import queryFilter from '@http/queryFilter';
import { updateToken, queryInfoData } from '@modules/token';
import { SERVER_TOKEN, SERVER_TOKEN_NOT_VALID, LOGIN_REQUIRED_VALID } from '@/setting';

/**
 * 	* Basic
 * 	* Security scheme type:	HTTP
 * 	* HTTP Authorization Scheme	basic
 
 * * JWT
 * * Security scheme type: API Key
 * * Header parameter name: Authorization
*/

export const axiosSetting = {
  scheme: 'http',
  host: '15.165.198.243',
  api: '/api/v1',
  port: '',
  server: function () {
    return (
      (this.scheme ? this.scheme + ':' : '') +
      '//' +
      this.host +
      this.api +
      (this.port ? ':' + this.port : '')
    );
  },
  redirectPage: () => {
    window.location.href = 'popup.html';
  },
};

export const axios = Axios.create({
  baseURL: axiosSetting.server(),
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) config.headers.Authorization = `${SERVER_TOKEN} ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      error.response = { data: { message: '네트워크 연결이 끊어져 있습니다.' } };
    }
    const UPDATE_TOKEN_API = queryInfoData['updateToken'].API;
    const CHECK_TOKEN_API = queryInfoData['checkToken'].API;

    const status = error.response.status || '';
    const response = error.response.data || {};
    const originalRequest = error.config || {};
    const url = originalRequest.url || '';

    // API 호출 시, accessToken 만료일 때
    if (
      status === 401 &&
      response.code === SERVER_TOKEN_NOT_VALID &&
      url.indexOf(UPDATE_TOKEN_API) === -1 // UPDATE TOKEN 요청이 아닐 때
    ) {
      try {
        const refresh = getRefreshToken();
        if (!refresh) throw new Error();

        const response = await updateToken({ refresh });
        if (!response.data) throw new Error();
        else {
          setAccessToken(response.data);
          // 만약 이전에 보냈던 url이 TOKEN 검사 요청이었을 때
          if (url.indexOf(CHECK_TOKEN_API) > -1) {
            const token = getAccessToken();
            const queryData = queryInfoData['updateToken'];
            const checkToken = queryFilter({ queryData, originDataInfo: { token } });
            originalRequest.data = checkToken;
          }
          return axios.request(originalRequest);
        }
      } catch (error) {
        console.error(error);
        removeAccessToken();
        axiosSetting.redirectPage(); // token_not_valid login => go login!!
      }
    }
    // login 필수
    else if (status === 401 && response.detail?.indexOf(LOGIN_REQUIRED_VALID) > -1) {
      removeAccessToken();
      axiosSetting.redirectPage(); // no authentication => go login!!
    }
    // 그 외는 서버에서 내리는 에러
    else return Promise.reject(error);
  }
);
