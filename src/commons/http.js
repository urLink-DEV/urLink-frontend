import Axios from 'axios';
import auth from './auth';

/**
 * 	* Basic
 * 	* Security scheme type:	HTTP
 * 	* HTTP Authorization Scheme	basic
 
 * * JWT
 * * Security scheme type: API Key
 * * Header parameter name: Authorization
*/

const api = {
	GET_TOKEN: "user/token/", // * 토근 생성
	UPDATE_TOKEN: "user/token/refresh/", // * 토큰 갱신
	CHECK_TOKEN: "user/token/verify/", // * 토큰 검사

	G_MEMBER_REGISTER: "user/google/sign-up/", // * 구글 회원가입
	G_MEMBER_LOGIN: "user/google/sign-in/", // * 구글 로그인

	N_MEMBER_REGISTER: "user/sign-up/", // * 일반 회원가입
	N_MEMBER_LOGIN: "user/sign-in/", // * 일반 로그인
	
	MEMBER_LOGOUT: "user/sign-out/", // * 로그아웃

	MEMBER: "user/", // * 회원정보 관련
};

const axiosSetting = {
    scheme: "http",
    host: "15.165.198.243/api/v1",
    port: "",
    server: function() {
		return (this.scheme ? this.scheme + ":" : "") + "//" + this.host + (this.port ? ":" + this.port : "");
	},
	redirectPage: function(){
		window.location.href = "/login";
	}
};

const axios = Axios.create({
	baseURL: axiosSetting.server(),
	timeout: 2000,
});

if(localStorage.getItem('accessToken')) axios.defaults.headers.common['Authorization'] = "JWT " + localStorage.getItem('accessToken');

// * Add a request interceptor
axios.interceptors.request.use(function (config) {
	// * Do something before request is sent
	if(localStorage.getItem('accessToken')) config.headers.Authorization = "JWT " + localStorage.getItem('accessToken');
	return config;
}, function (error) {
	return Promise.reject(error)
});

// * Add a response interceptor
axios.interceptors.response.use((response) => {
	return response;
}, async (error) => {
		const status = error.response.status
		const response = error.response.data
		const originalRequest = error.config;
		const url = originalRequest.url;

		// * accessToken 만료
		if (status === 401 && url !== api.UPDATE_TOKEN && response.code === 'token_not_valid') {
			const refreshToken = localStorage.getItem("refreshToken");
			try {
				const response = await auth.refreshAccessToken(refreshToken);
				if(!response) {
					this.redirectPage(); // * "token_not_valid login!!
				}
				else if(response && localStorage.getItem('accessToken')) {
					axios.defaults.headers.common['Authorization'] = "JWT " + localStorage.getItem('accessToken');
					return axios.request(originalRequest);
				}
			} catch (error) {
				this.redirectPage(); // * token_not_valid login!!
			}
		}
		// * login 필수
		else if(status=== 401 && response.detail.indexOf("authentication credentials") >- 1){
			this.redirectPage(); // * no authentication login!!
		}
		return Promise.reject(error);
});

export { axios , api };