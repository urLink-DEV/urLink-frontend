const queryInfoData = {
  /**
   * * JWT 갱신 POST
   * * /user/token/refresh/
   * * JWT 불필요
   */
  updateToken: {
    API: '/user/token/refresh/',
    method: 'post',
    bodyQuery: {
      refresh: '',
    },
    repaceAPI() {
      return this.API
    },
  },

  /**
   * * JWT 검사 POST
   * * /user/token/verify/
   * * JWT 불필요
   */
  checkToken: {
    API: '/user/token/verify/',
    method: 'post',
    bodyQuery: {
      token: '',
    },
    repaceAPI() {
      return this.API
    },
  },
}

export default queryInfoData
