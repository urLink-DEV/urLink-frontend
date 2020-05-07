/* global chrome */
import React from 'react';
import {axios,api} from '../commons/http';
import queryData from '../commons/queryData';
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

  const props = {
    onClickSignup,
    onClickGoogleSignup,
  }
  
  return <SignupPage {...props}/>
}

const onClickSignup = async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nRegister = queryData["n_register"];
    nRegister.email = data.get("email");
    nRegister.username = data.get("username");
    nRegister.password = data.get("password");

    await axios.post(api.N_MEMBER_REGISTER, nRegister);
    alert("가입 완료!!\n환영 합니다~");
    window.location.href = "/index.html";
  } catch (error) {
    alert("가입 실패\n"+error.response.data.message);
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