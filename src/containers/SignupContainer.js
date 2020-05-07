/* global chrome */
import React from 'react';
import {axios,api} from '../commons/http';
import queryData from '../commons/queryData';
import SignupPage from '../pages/SignupPage';

export default function SignupContainer() {

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
}

let retry = true;

const onClickGoogleSignup = e => {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    requestGoogleSignUp(token)
      .then(res => {
        if (res.status >= 400 && retry) {
          console.log('res', res)
          retry = false
          chrome.identity.removeCachedAuthToken({token}, onClickGoogleSignup)
        }
      }).catch(e => console.log(e))
  })
}

function requestGoogleSignUp(token) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json')
  return fetch('http://15.165.198.243/api/v1/user/google/sign-up/', {
    method: 'POST',
    headers,
    body: JSON.stringify({token}),
  })
}