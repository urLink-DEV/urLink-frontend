import { axios, api } from './http'
import queryData from './queryData'

const Auth = {
	/**
	 * * if false return, You Should be redirect page
	 * @return {Promise}
	 */
	tokenCheck: async function(){
		const accessToken = localStorage.getItem('accessToken') || ""
		const refreshToken = localStorage.getItem('refreshToken') || ""

		if(!accessToken) return false
		else {
			// * Access Token의 만료기간을 확인한다. (CHECK_TOKEN API)
			try {
				const checkToken = queryData["checkToken"]
				checkToken.token = accessToken

				const response = await axios.post(api.CHECK_TOKEN, checkToken)
				this.setAccessToken(response.data) // * 만료되지 않은 경우, token header 부여
				return true
			}
			catch (error) {
				if (!refreshToken) return false
				else this.refreshAccessToken(refreshToken)
			}
		}
	},
	
	/**
	 * * if false return, You Should be redirect page, and remove AccessToken in the localStorage
	 * @return {Promise}
	 */
	refreshAccessToken: async function(token){
		if(!token) return false
		else {
			// * refresh Token으로 accessToken을 업데이트한다. (UPDATE_TOKEN API)
			try {
				const refreshToken = queryData["updateToken"]
				refreshToken.refresh = token

				const response = await axios.post(api.UPDATE_TOKEN, refreshToken)
				this.setAccessToken(response.data) // * 만료되지 않은 경우, token header 부여
				return true
			}
			catch (error) {
				this.removeAccessToken() // * 만료된 경우, localStorage 삭제, return false
				return false
			}
		}
	},

	getAccessToken: function () {
		return localStorage.getItem('accessToken') || ""
	},

	setAccessToken: function (token) {
		const accessToken = token && (token.access || localStorage.getItem("accessToken") || "")
		const refreshToken = token && (token.refresh || localStorage.getItem("refreshToken") || "")
		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('refreshToken', refreshToken)
		// axios.defaults.headers.common['Authorization'] = "JWT " + accessToken
	},

	removeAccessToken: function () {
		localStorage.setItem('accessToken', "")
		localStorage.setItem('refreshToken', "")
	}
}

export default Auth