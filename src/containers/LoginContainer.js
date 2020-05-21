/* global chrome */
import React from 'react'
import {axios,api} from '../commons/http'
import queryData from '../commons/queryData'
import LoginPage from '../pages/LoginPage'
import auth from '../commons/apis/auth'

export default function LoginContainer() {

  const props = {
    onClickGoogleLogin,
    onClickLogin
  }

  return <LoginPage {...props} />
}

let retry = true;

const onClickGoogleLogin = e => {
  chrome.identity.getAuthToken({interactive: true}, token => {
    requestGoogleLogin(token)
      .then(res => {
        console.log('res', res)
        if (res.status === 200) auth.setAccessToken(res.data.token);
        if (res.status >= 400 && retry) {
          retry = false;
          chrome.identity.removeCachedAuthToken({token}, onClickGoogleLogin);
        }
      })
      .then(() => window.location.href='/index.html')
      .catch(e => console.log(e))
  })
}

const onClickLogin = async (e) => {
  e.preventDefault();
  const nLogin = queryData["n_login"];
  const data = new FormData(e.currentTarget)
  nLogin.email = data.get("email");
  nLogin.password = data.get("password");

  try {
      const response = await axios.post(api.N_MEMBER_LOGIN, nLogin);
      auth.setAccessToken(response.data.token);
      window.location.href = "/index.html";
  } catch (error) {
    alert("로그인 실패\n"+error.response.data.message);
  }
}

function requestGoogleLogin(token) {
  const gToken = queryData['g_login'];
  gToken.token = token;
  return axios.post(api.G_MEMBER_LOGIN, gToken);
}