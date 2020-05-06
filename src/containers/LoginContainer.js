/* global chrome */
import React from 'react';
import LoginPage from '../pages/LoginPage';
import {axios, api} from '../commons/http';
import queryData from "../commons/queryData";
import Auth from '../commons/auth';

export default function LoginContainer() {

  const props = {
    onClickGoogleLogin,
    onClickLogin,
  }
    
  return <LoginPage {...props} />
}

let retry = true;

const onClickGoogleLogin = e => {
  chrome.identity.getAuthToken({interactive: true}, token => {
    requestGoogleLogin(token)
      .then(res => {
        console.log('res', res)
        if (res.status === 200) Auth.setAccessToken(res.data.token);
        if (res.status >= 400 && retry) {
          retry = false;
          chrome.identity.removeCachedAuthToken({token}, onClickGoogleLogin);
        }
      })
      .then(() => window.location.href='/index.html')
      .catch(e => console.log(e))
  })
}

const onClickLogin = e => {
  e.preventDefault();
  console.log('normal login')
}

function requestGoogleLogin(token) {
  const gToken = queryData['g_login'];
  gToken.token = token;
  return axios.post(api.G_MEMBER_LOGIN, gToken);
}