/* global chrome */
import React from 'react';
import SignupPage from '../pages/SignupPage';
import {axios, api} from '../commons/http';
import Auth from '../commons/auth';
import queryData from "../commons/queryData";
export default function SignupContainer() {
  let retry = true;
  const onClickGoogleSignup = e => {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      requestGoogleSignup(token)
        .then(res => {
          if (res.status === 201) requestGoogleLoginAfterSignup(token)
          if (res.status >= 400 && retry) {
            console.log('res', res)
            retry = false
            return chrome.identity.removeCachedAuthToken({token}, onClickGoogleSignup)
          }
        })
        .then(res => {
          if (res.status === 201) {
            console.log(res.json())
            return res.json();
          }
        })
        .then(res => Auth.setAccessToken(res.token))
        .catch(e => console.log(e))
    })
  }

  const onClickSignup = e => {
    e.preventDefault();
    console.log('submit');
  }

  const props = {
    onClickSignup,
    onClickGoogleSignup,
  }

  return <SignupPage {...props}/>
}

function requestGoogleSignup(token) {
  const gToken = queryData['g_register'];
  gToken.token = token;
  return axios.post(api.G_MEMBER_REGISTER, gToken);
}

function requestGoogleLoginAfterSignup(token) {
  const gToken = queryData['g_login']
  gToken.token = token;
  return axios.post(api.G_MEMBER_LOGIN, gToken);
}