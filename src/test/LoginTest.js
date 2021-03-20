import React from 'react';
import { axios, api } from '../commons/http';
import queryData from '../commons/queryData';
import auth from '../commons/apis/auth';
import userAPI from '../commons/apis/user'
/*
 * "id": 8,
 * "token": {
 *   "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5NTU5NjUyOCwianRpIjoiMWJjNWVmZjgxN2FhNDU4ZjkxNWIxOTJkOWFiNDk4NDYiLCJ1c2VyX2lkIjo4fQ.WrOdVBBSe9HKkTZKIEm5eQ8Xla8NBlMenbLY-K66XVw",
 *   "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkzMDExNzI4LCJqdGkiOiJmYTlkN2ViMGE2MjQ0YzkxYjYyYjA3NzRiMzM2ODRkYiIsInVzZXJfaWQiOjh9.PW63N34PRbFTao2LHom2LXxMVqYO-b3UbG8o3Mcb8uo"
 * },
 * "sign_up_type": "normal",
 * "email": "test3@naver.com",
 * "username": "asfasf",
 * "date_joined": "2020-05-06T19:45:31.261978+09:00"
*/
export default function Login() {
    
  const nomalLoginEvent = async (evt) => {
    evt.preventDefault();
    console.log('login start ------------------------------->');
    const nLogin = queryData["n_login"];

    nLogin.email = "user4@ok.com";
    nLogin.password = "qwer1234!@";

    try {
        const response = await axios.post(api.N_MEMBER_LOGIN, nLogin);
        console.log(response.data);
        auth.setAccessToken(response.data.token);
        alert("로그인 완료 Hello world! ~~");
    } catch (error) {
        console.log(error);
    }
    console.log('login end ------------------------------->');
  }

  const nomalRegisterEvent = async (evt) => {
    evt.preventDefault();
    const nRegister = queryData["n_register"];

    nRegister.sign_up_type = "normal";
    nRegister.email = "user4@ok.com";
    nRegister.username = "hi";
    nRegister.password = "qwer1234!@";
    try {
        const response = await axios.post(api.N_MEMBER_REGISTER, nRegister);
        console.log(response.data);
        alert("가입 완료 Hello world! ~~");
    } catch (error) {
        console.log(error);
    }
  }

  const getUser = () => {
    const get = userAPI.get({})
    if (get) {
      get.then((response) => {
        console.log(response)
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  const updateUser = (username, password) => {
    const update = userAPI.update({ username, password })
    if (update) {
        update.then((response) => {
        console.log(response)
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }

  const removeUser = () => {
    const remove = userAPI.remove({})
    if (remove) {
      remove.then((response) => {
        console.log(response)
      })
        .catch((error) => console.warn("response" in error ? error.response.data.message : error))
    }
  }
  return (
    <div>
        <h1>JWT Token login test</h1>
        <button onClick={nomalLoginEvent}>
            normal login that is Test
        </button>
        <button onClick={nomalRegisterEvent}>
            nomal register that is Test
        </button> 
        <button onClick={getUser}>
            user Read that is Test
        </button> 
        <button onClick={() => updateUser("dd","qwer1234!@")}>
            user Update that is Test
        </button> 
        <button onClick={removeUser}>
            user Update that is Test
        </button> 
    </div>
  )
}