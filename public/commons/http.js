const api = {
	UPDATE_TOKEN: "user/token/refresh/", // * 토큰 갱신
	CHECK_TOKEN: "user/token/verify/", // * 토큰 검사
	
	READ_CATEGORY: "category/" // * 카테고리 리스트 조회
}

const axiosSetting = {
    scheme: "http",
    host: "15.165.198.243/api/v1",
    port: "",
    server: function() {
		return (this.scheme ? this.scheme + ":" : "") + "//" + this.host + (this.port ? ":" + this.port : "")
	},
	redirectPage: () => {
		window.location.href = "/index.html"
	}
}

axios = axios.create({
	baseURL: axiosSetting.server(),
	timeout: 2000
})

// * Add a request interceptor
axios.interceptors.request.use(function (config) {
	const accessToken = auth.getAccessToken()
	if(accessToken) config.headers.Authorization = "JWT " + accessToken
	return config
}, function (error) {
	return Promise.reject(error)
})

// * Add a response interceptor
axios.interceptors.response.use(function(response)  {
	return response
}, async (error) => {
	if (!error.response) error["response"] = { data: { message: "네트워크 연결이 끊어져 있습니다." } }
	const status = error.response && (error.response.status || "")
	const response = error.response && (error.response.data || "")
	const originalRequest = error.response && (error.config || "")
	const url = originalRequest.url || ""

	// * API 호출 시, accessToken 만료
	if (status === 401 && url.indexOf(api.UPDATE_TOKEN) === -1 && response.code === 'token_not_valid') {
		const refreshToken = auth.getRefreshToken()
		const checkToken = queryData["checkToken"]
		const updateToken = queryData["updateToken"]

		if(!refreshToken) axiosSetting.redirectPage() // * "token_not_valid => login(required)!!
		else updateToken.refresh = refreshToken

		return await axios.post(api.UPDATE_TOKEN, updateToken)
			.then(async (response) => {
				if (!response.data) throw new Error()
				else {
					auth.setAccessToken(response.data) // * 만료되지 않은 경우, accessToken ReSetting
					if(url.indexOf(api.CHECK_TOKEN) > -1) {
						const accessToken = auth.getAccessToken()
						checkToken.token = accessToken
						originalRequest.data = checkToken
					}
					return await axios.request(originalRequest)
				}
			})
			.catch(_err => {
				auth.removeAccessToken() // * 만료된 경우, localStorage 삭제
				axiosSetting.redirectPage() // * token_not_valid login => login(required)!!
			})
	}
	// * login 필수
	else if(status=== 401 && response.detail.indexOf("authentication credentials") > -1){
		axiosSetting.redirectPage() // * no authentication login!!
	}
	else return Promise.reject(error)
})