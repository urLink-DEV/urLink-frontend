import React from 'react';
import server from '../commons/http';
import '../App.scss';

export default function UserTest() {

    const tempStyle = {
        display: "inline",
        width: "150px",
        height: "150px",
        boder: "1px solid black",
        background: "orange",
    }

    const queryData = {

        /**
         * * 일반 회원가입 POST
         * * Authorization: JWT 불필요
         */
        n_register: {
            sign_up_type: "normal",
            email: "user1@ok.com",
            username: "됨?",
            password: "qwer1234!@",
            date_joined: "2020-04-04T06:14:56Z"
        },

        /**
         * * 일반 로그인 POST
         * * Authorization: JWT 불필요
         */
        n_login: {
            email: "user@ok.com",
            password: "qwer1234!@2"
        },

        /**
         * * 구글 로그인 POST
         * * Authorization: JWT 불필요
         * * email, password 불필요
         */
        g_login: {
            token: "",
        },

        /**
         * * 구글 회원가입 POST
         * * Authorization: JWT 불필요
         * * email, password 불필요
         */
        g_register: {
            token: "",
        },

        /**
         * * 로그아웃 POST
         * * JWT 불필요
         * * email, password 불필요
         */
        logout: {
        },

        /**
         * * JWT 발급 POST
         * * JWT 불필요
         */
        getToken: {
            email: "user1@ok.com",
            password: "qwer1234!@",
        },

        /**
         * * JWT 갱신 POST
         * * JWT 불필요
         */
        updateToken: {
            token: ""
        },

        /**
         * * JWT 검사 POST
         * * JWT 불필요
         */
        checkToken: {
            token: ""
        },

        /**
         * * 회원정보 조회 GET
         * * user/{id}/
         * * JWT 필요
         */
        userRead: {

        },

        /**
         * * 회원정보 수정 PUT
         * * user/{id}/
         * * JWT 필요
         */
        userUpdate: {
            "sign_up_type": "",
            "email": "",
            "username": "",
            "password": "",
        },

        /**
         * * 회원정보 부분 수정 PATCH
         * * user/{id}/
         * * JWT 필요
         */
        userPartialUpdate: {
            "email": "",
            "username": "",
        },

        /**
         * * 회원정보 삭제 DELETE
         * * user/{id}/
         * * JWT 필요
         */
        userDelete: {
        }
    };

    const isEmpty = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const nomalRegisterEvent = evt => {
        evt.preventDefault();
        console.log('nomal register start ------------------------------->');

        server.postAxios("N_MEMBER_REGISTER",
            queryData["n_register"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('register end ------------------------------->');
            });
    };

    const nomalLoginEvent = evt => {
        evt.preventDefault();
        console.log('login start ------------------------------->');

        server.postAxios("N_MEMBER_LOGIN",
            queryData["n_login"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('login end ------------------------------->');
            });
    };

    const googleRegiseterEvent = evt => {
        evt.preventDefault();
        console.log('google register start ------------------------------->');

        server.postAxios("G_MEMBER_REGISTER",
            queryData["g_register"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('google register end ------------------------------->');
            });
    };

    const googleLoginEvent = evt => {
        evt.preventDefault();
        console.log('google login start ------------------------------->');

        server.postAxios("G_MEMBER_LOGIN",
            queryData["g_login"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('google login end ------------------------------->');
            });
    };

    const logoutEvent = evt => {
        evt.preventDefault();
        console.log('logOut start ------------------------------->');

        server.postAxios("MEMBER_LOGOUT",
            queryData["logout"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('logOut end ------------------------------->');
            });
    };

    const getTokenEvent = evt => {
        evt.preventDefault();
        console.log('getToken start ------------------------------->');

        server.postAxios("GET_TOKEN",
            queryData["getToken"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('getToken end ------------------------------->');
            });
    };

    const updateTokenEvent = evt => {
        evt.preventDefault();
        console.log('updateToken start ------------------------------->');

        server.postAxios("UPDATE_TOKEN",
            queryData["updateToken"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('updateToken end ------------------------------->');
            });
    };

    const checkTokenEvent = evt => {
        evt.preventDefault();
        console.log('checkToken start ------------------------------->');

        server.postAxios("CHECK_TOKEN",
            queryData["checkToken"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('checkToken end ------------------------------->');
            });
    };

    const userReadEvent = evt => {
        evt.preventDefault();
        console.log('userRead start ------------------------------->');

        server.getAxios("MEMBER/{id}",
            queryData["userRead"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('userRead end ------------------------------->');
            });
    };

    const userUpdateEvent = evt => {
        evt.preventDefault();
        console.log('userUpdate start ------------------------------->');

        server.putAxios("MEMBER/{id}",
            queryData["userUpdate"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('userUpdate end ------------------------------->');
            });
    };

    const userDeleteEvent = evt => {
        evt.preventDefault();
        console.log('userDelete start ------------------------------->');

        server.deleteAxios("MEMBER/{id}",
            queryData["userDelete"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('userDelete end ------------------------------->');
            });
    };

    const userPartialUpdateEvent = evt => {
        evt.preventDefault();
        console.log('userPartialUpdate start ------------------------------->');

        server.patchAxios("MEMBER/{id}",
            queryData["userPartialUpdate"], function (response) {
                if (!isEmpty(response.data)) {
                    console.log(response);
                }
                else {
                    console.log(response.error);
                }
                console.log('userPartialUpdate end ------------------------------->');
            });
    }

    return (
        <div>
            <button onClick={nomalRegisterEvent} style={tempStyle}>
                normal Register
            </button>
            <button onClick={nomalLoginEvent} style={tempStyle}>
                normal Login
            </button>
            <button onClick={googleRegiseterEvent} style={tempStyle}>
                google Register
            </button>
            <button onClick={googleLoginEvent} style={tempStyle}>
                google Login
            </button>
            <button onClick={userReadEvent} style={tempStyle}>
                user Read
            </button>
            <button onClick={userUpdateEvent} style={tempStyle}>
                user Update
            </button>
            <button onClick={userPartialUpdateEvent} style={tempStyle}>
                user Partial Update
            </button>
            <button onClick={userDeleteEvent} style={tempStyle}>
                user Delete
            </button>
            <button onClick={getTokenEvent} style={tempStyle}>
                get Token
            </button>
            <button onClick={updateTokenEvent} style={tempStyle}>
                update Token
            </button>
            <button onClick={checkTokenEvent} style={tempStyle}>
                check Token
            </button>
            <button onClick={logoutEvent} style={tempStyle}>
                logout
            </button>
        </div>
    )
}