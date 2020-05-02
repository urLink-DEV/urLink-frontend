/* global chrome */
import { axios, api } from '../commons/http';
import queryData from '../commons/queryData';

export const onClickSignup = async ({email,username,password}) => {
  const nRegister = queryData["n_register"];

  nRegister.email = email;
  nRegister.username = username;
  nRegister.password = password;
  try {
    const response = await axios.post(api.N_MEMBER_REGISTER, nRegister);
    // console.log(response.data);
    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
};

let retry = true;

export const onClickGoogleSignup = e => {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    let init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      'contentType': 'json'
    };
    requestStart(init)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log('token', token)
        return requestGoogleSignUp(token)
      })
      .then(res => {
        if (res.status >= 401 && retry) {
          retry = false
          chrome.identity.removeCachedAuthToken({token}, onClickGoogleSignup)
        }
      })
      .catch(e => console.log('error', e));
  })
}


function requestStart(init) {
  return fetch(
    'https://people.googleapis.com/v1/contactGroups/all?key=AIzaSyD9VzCBawbBZR6LNJdbFWVJF_HYdiGQc_Y',
    init)
}

function requestGoogleSignUp(token) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json')
  return fetch('http://15.165.198.243/api/v1/user/google/sign-up/', {
    method: 'POST',
    headers,
    body: {token},
  })
}

// function xhrWithAuth(method, url, interactive, callback) {
//   var access_token;

//   var retry = true;

//   getToken();

//   function getToken() {
//     chrome.identity.getAuthToken({ interactive: interactive }, function(token) {
//       if (chrome.runtime.lastError) {
//         callback(chrome.runtime.lastError);
//         return;
//       }

//       access_token = token;
//       requestStart();
//     });
//   }

//   function requestStart() {
//     var xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
//     xhr.onload = requestComplete;
//     xhr.send();
//   }

//   function requestComplete() {
//     if (this.status == 401 && retry) {
//       retry = false;
//       chrome.identity.removeCachedAuthToken({ token: access_token },
//                                             getToken);
//     } else {
//       callback(null, this.status, this.response);
//     }
//   }
// }