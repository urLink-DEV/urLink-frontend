/* global chrome */
import React from 'react';
import LoginPage from '../pages/LoginPage';

export default function LoginContainer() {

  const props = {
    onClickGoogleLogin,
    onClickLogin,
  }
    
  return <LoginPage {...props} />
}

const onClickGoogleLogin = e => {
  console.log('google login')
}

const onClickLogin = e => {
  e.preventDefault();
  console.log('normal login')
}