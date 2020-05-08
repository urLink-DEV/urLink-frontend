import React from 'react';
import { axios, api } from '../commons/http';
import queryData from '../commons/queryData';
import auth from '../commons/auth';

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
            // window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
        console.log('login end ------------------------------->');
    };

    const nomalRegisterEvent = async (evt) => {
        evt.preventDefault();
        console.log('register start ------------------------------->');
        const nRegister = queryData["n_register"];

        nRegister.sign_up_type = "normal";
        nRegister.email = "user4@ok.com";
        nRegister.username = "다 했는데 자고 있으시나? 그럼 잘자요~";
        nRegister.password = "qwer1234!@";
            
        try {
            const response = await axios.post(api.N_MEMBER_REGISTER, nRegister);
            console.log(response.data);
            alert("가입 완료 Hello world! ~~");
        } catch (error) {
            console.log(error);
        }
        console.log('login end ------------------------------->');
    };

    const userReadEvent = async (evt) => {
        evt.preventDefault();
        console.log('userRead start ------------------------------->');
        const userRead = queryData["userRead"];
        try {
            const response = await axios.get(api.MEMBER+"6/", userRead);
            console.log(response);
            alert("회원정보 확인 완료 Hello world! ~~");
        } catch (error) {
            console.log(error);
        }
        console.log('userRead end ------------------------------->');
    };

    const userUpdateEvent = async (evt) => {
        evt.preventDefault();
        console.log('userUpdate start ------------------------------->');
        const userUpdate = queryData["userUpdate"];
        userUpdate.password = "qwer1234!@#$";
        userUpdate.email = "user2@ok.com";
        userUpdate.username ="okokokokok";
        delete userUpdate.sign_up_type;

        try {
            const response = await axios.put(api.MEMBER+"4/", userUpdate);
            console.log(response);
            alert("업데이트 완료 Hello world! ~~");
        } catch (error) {
            console.log(error);
        }
        console.log('userUpdate end ------------------------------->');
    };

    return (
      <div>
            <h1>JWT Token login test</h1>
            <button onClick={nomalLoginEvent}>
                normal login that is Test
            </button>
            <button onClick={nomalRegisterEvent}>
                nomal register that is Test
            </button> 
            <button onClick={userReadEvent}>
                user Read that is Test
            </button> 
            <button onClick={userUpdateEvent}>
                user Update that is Test
            </button> 
        </div>
    )
}