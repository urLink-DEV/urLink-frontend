import axios from 'axios';

/**
 * 	* Basic
 * 	* Security scheme type:	HTTP
 * 	* HTTP Authorization Scheme	basic
 
 * * JWT
 * * Security scheme type: API Key
 * * Header parameter name: Authorization
*/

const server = {
    scheme: "http",
    host: "bc4407b5.ngrok.io/api/v1",
    port: "",
    addr: function () {
		return (this.scheme ? this.scheme + ":" : "") + "//" + this.host + (this.port ? ":" + this.port : "");
    },
    api: {
        GET_TOKEN: "user/token/", // * 토근 생성
        UPDATE_TOKEN: "user/token/refresh/", // * 토큰 갱신
        CHECK_TOKEN: "user/token/verify/", // * 토큰 검사

        G_MEMBER_REGISTER: "user/google/sign-up/", // * 구글 회원가입
        G_MEMBER_LOGIN: "user/google/sign-in/", // * 구글 로그인

        N_MEMBER_REGISTER: "user/sign-up/", // * 일반 회원가입
        N_MEMBER_LOGIN: "user/sign-in/", // * 일반 로그인
        
        MEMBER_LOGOUT: "user/sign-out/", // * 로그아웃

        MEMBER: "user/", // * 회원정보 관련
	},
	
	getAxios: function (apiName, query, cb) {
        let url = this.addr() + '/' + apiName;
        let query_options = query || {};

		axios.get(url, query_options)
			.then(function ({ data }) {
				cb({ data, err: '' });
			}).catch((e) => {
				cb({ data: {}, err: e });
			});
	},
	
    postAxios: function (apiName, query, cb) {
        let url = this.addr() + '/' + apiName;
		let query_options = query || {};
		
        axios.post(url, query_options)
			.then(function ({ data }) {
				cb({ data, err: '' });
			}).catch((e) => {
				cb({ data: {}, err: e });
			});
    },

	putAxios: function (apiName, query, cb) {
        let url = this.addr() + '/' + apiName;
		let query_options = query || {};

		axios.put(url, query_options)
			.then(function ({ data }) {
				cb({ data, err: '' })
			}).catch((e) => {
				cb({ data: {}, err: e })
			});
    },
	
	patchAxios: function (apiName, query, cb) {
        let url = this.addr() + '/' + apiName;
		let query_options = query || {};
		
		axios.patch(url, query_options)
			.then(function ({ data }) {
				cb({ data, err: '' })
			}).catch((e) => {
				cb({ data: {}, err: e })
			});
	},
	
	deleteAxios: function (apiName, query, cb) {
        let url = this.addr() + '/' + apiName;
		let query_options = query || {};

		axios.delete(url, query_options)
			.then(function ({ data }) {
				cb({ data, err: '' })
			}).catch((e) => {
				cb({ data: {}, err: e })
			});
	},
};

export default server;