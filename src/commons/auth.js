import { axios, api } from './http';
import queryData from './queryData';
/**
 * * JWT Token Check Flow

 * * 1. accesss Flow [Basic]
 * 	* 사용자가 접속한다.
 * 	* token check in [local Storage]
 *  * JWT(encoding name) + token 통신
  	
 * * 2-1.[토큰 검사 필수 페이지-> ex. main 페이지] [local Storage]에 토큰이 있는 경우 
 * 	* Body에 token을 담아서 Access Token의 만료기간을 확인한다. (CHECK_TOKEN API)
 * 	* 만료되지 않은 경우, [local Storage] 저장, header에 [JWT + accessToken]부여 => return true
 * 	* 만료된 경우, Refresh Token 담아서 토큰을 다시 받는다. (REFRESH_TOKEN API)
 * 	* Refresh Token 도 만료된 경우, [local Storage]에 모든 token 삭제 => return false

 * * 2-2. [토큰 검사 필수 페이지-> ex. main 페이지] [local Storage]에 토큰이 없는 경우
 * 	* (LOGIN API)
 * 	* 로그인 성공 시 Access Token, Refresh Token을 받고 [local Storage] 저장, header에 [JWT + accessToken]부여 => return true

 * * 3. axios interceptor
 * 	* axios 생성시, [local Storage]에 accessToken이 있을 경우 header에 [JWT + accessToken]부여

 * * 3-1. interceptor [request] 
 * 	* [local Storage]에 accessToken이 있을 경우 header에 [JWT + accessToken]부여

 * * 3-2. interceptor [response] 
 * 	* token 만료 메시지를 받을 경우 => move [2-1.] Refresh Token Flow
 * 	* 만료가 안되었으면 => accessToken 갱신 후, 이전 API 재요청
 * 	* API에서 access Token 필수 message 받을 경우
 * 	* login 페이지 이동 [redirect]
 */

const Auth = {
	/**
	 * * if false return, You Should be redirect page
	 * @async
	 * @returns {boolean | Promise}
	 */
	tokenCheck: async function(){
		const accessToken = localStorage.getItem('accessToken') || false;
		const refreshToken = localStorage.getItem('refreshToken') || false;

		// * local Storage token check
		if(!accessToken) return false;
		else {
			// * 기존에 토큰이 있는 경우 Body에 token을 담아서
			const checkToken = queryData["checkToken"];
			checkToken.token = accessToken;

			// * Access Token의 만료기간을 확인한다. (CHECK_TOKEN API)
			try {
				// * 만료되지 않은 경우, token header 부여
				const response = await axios.post(api.CHECK_TOKEN, checkToken);
				this.setAccessToken(response.data);
				return true;
			} catch (error) {
				if(!refreshToken) return false;
				else return this.refreshAccessToken(refreshToken);
			}
		}
	},
	
	/**
	 * * if false return, You Should be redirect page, and remove AccessToken in the localStorage
	 * @async
	 * @returns {boolean|Promise}
	 */
	refreshAccessToken: async function(token){
		if(!token) return false;
		else{
			const refreshToken = queryData["updateToken"];
			refreshToken.access = token;

			// * refresh Token으로 accessToken을 업데이트한다. (UPDATE_TOKEN API)
			try {
				// * 만료되지 않은 경우, token header 부여
				const response = await axios.post(api.UPDATE_TOKEN, refreshToken);
				this.setAccessToken(response.data);
				return true;
			}
			catch (error) {
				// * 만료된 경우, localStorage 삭제, return false
				this.removeAccessToken();
				return false;
			}
		}
	},

	getAccessToken: function(){
		return localStorage.getItem('accessToken') || "";
	},

	setAccessToken: function(token){
		const accessToken = token.access || localStorage.getItem("accessToken") || "";
		const refreshToken = token.refresh || localStorage.getItem("refreshToken") || "";
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		axios.defaults.headers.common['Authorization'] = "JWT " + accessToken;
	},

	removeAccessToken: function(){
		localStorage.setItem('accessToken',""); 
		localStorage.setItem('refreshToken',""); 
	}
}

export default Auth;