/* global chrome */
import React from 'react';
import SignupPage from '../pages/SignupPage';

export default function SignupContainer() {

  const props = {
    onClickSignup,
    onClickGoogleSignup,
  }
    
  return <SignupPage {...props}/>
}

const onClickSignup = e => {
  e.preventDefault();
  console.log('submit');
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
