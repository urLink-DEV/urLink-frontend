const queryInfoData = {
  /**
   * * 일반 회원가입 POST
   * * /user/sign-up/
   * * Authorization: JWT 불필요
   */
  nRegister: {
    API: '/user/sign-up/',
    method: 'post',
    bodyQuery: {
      sign_up_type: '', // * (normal default [server])
      email: '',
      username: '',
      password: '',
    },
    urlQuery: {},
    replaceAPI() {
      return this.API
    },
  },

  /**
   * * 일반 로그인 POST
   * * /user/sign-in/
   * * Authorization: JWT 불필요
   */
  nLogin: {
    API: '/user/sign-in/',
    method: 'post',
    bodyQuery: {
      email: '',
      password: '',
    },
    urlQuery: {},
    replaceAPI() {
      return this.API
    },
  },

  /**
   * * 구글 회원가입 POST
   * * /user/google/sign-up/
   * * Authorization: JWT 불필요
   */
  gRegister: {
    API: 'user/google/sign-up/',
    method: 'post',
    bodyQuery: {
      token: '',
    },
    urlQuery: {},
    replaceAPI() {
      return this.API
    },
  },

  /**
   * * 구글 로그인 POST
   * * /user/google/sign-in/
   * * Authorization: JWT 불필요
   * * email, password 불필요
   */
  gLogin: {
    API: '/user/google/sign-in/',
    method: 'post',
    bodyQuery: {
      token: '',
    },
    urlQuery: {},
    replaceAPI() {
      return this.API
    },
  },

  /**
   * * 로그아웃 POST
   * * /user/sign-out/
   * * Authorization: JWT 불필요
   * * email, password 불필요
   */
  logout: {
    API: '/user/sign-out/',
    method: 'post',
    bodyQuery: {},
    urlQuery: {},
    replaceAPI() {
      return this.API
    },
  },

  /**
   * * 회원정보 조회 GET
   * * /user/{userId}/ (option)
   * * Authorization: JWT 필요
   */
  userRead: {
    API: 'user/{userId}/',
    method: 'get',
    bodyQuery: {},
    urlQuery: {
      userId: '',
    },
    replaceAPI({ userId }) {
      return this.API.replace('{userId}/', userId ? `${userId}/` : '')
    },
  },

  /**
   * * 회원정보 부분 수정 PATCH
   * * /user/{userId}/ (option)
   * * Authorization: JWT 필요
   */
  userModiify: {
    API: 'user/{userId}/',
    method: 'patch',
    bodyQuery: {
      // "sign_up_type": "",
      // "email": "",
      username: '',
      password: '',
    },
    urlQuery: {
      userId: '',
    },
    replaceAPI({ userId }) {
      return this.API.replace('{userId}/', userId ? `${userId}/` : '')
    },
  },

  /**
   * * 회원정보 삭제 DELETE
   * * /user/{userId}/ (option)
   * * Authorization: JWT 필요
   */
  userRemove: {
    API: 'user/{userId}/',
    method: 'delete',
    bodyQuery: {},
    urlQuery: {
      userId: '',
    },
    replaceAPI({ userId }) {
      return this.API.replace('{userId}/', userId ? `${userId}/` : '')
    },
  },
}

export default queryInfoData
