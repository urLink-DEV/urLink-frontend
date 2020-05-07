/* global chrome */
import React from 'react';
import {axios,api} from '../commons/http';
import queryData from '../commons/queryData';
import LoginPage from '../pages/LoginPage';
import auth from '../commons/auth';

export default function LoginContainer() {

  const props = {
    onClickGoogleLogin,
    onClickLogin
  }

  return <LoginPage {...props} />
}

const onClickGoogleLogin = e => {
  console.log('google login')
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