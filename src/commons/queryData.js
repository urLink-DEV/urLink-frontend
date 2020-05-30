const queryData = {

    /**
     * * 일반 회원가입 POST
     * * /user/sign-up/
     * * Authorization: JWT 불필요
     */
    n_register: {
        "sign_up_type": "normal",
        "email": "",
        "username": "",
        "password": ""
    },

    /**
     * * 일반 로그인 POST
     * * /user/sign-in/
     * * Authorization: JWT 불필요
     */
    n_login: {
        "email": "",
        "password": ""
    },

    /**
     * * 구글 로그인 POST
     * * /user/google/sign-in/
     * * Authorization: JWT 불필요
     * * email, password 불필요
     */
    g_login: {
        "token": ""
    },

    /**
     * * 구글 회원가입 POST
     * * /user/google/sign-up/
     * * Authorization: JWT 불필요
     * * email, password 불필요
     */
    g_register: {
        "token": ""
    },

    /**
     * * 로그아웃 POST
     * * /user/sign-out/
     * * JWT 불필요
     * * email, password 불필요
     */
    logout: {},

    /**
     * * JWT 발급 POST
     * * /user/token/
     * * JWT 불필요
     */
    getToken: {
        "email": "",
        "password": ""
    },

    /**
     * * JWT 갱신 POST
     * * /user/token/refresh/
     * * JWT 불필요
     */
    updateToken: {
        "refresh": ""
    },

    /**
     * * JWT 검사 POST
     * * /user/token/verify/
     * * JWT 불필요
     */
    checkToken: {
        "token": ""
    },

    /**
     * * 회원정보 조회 GET
     * * user/{id}/
     * * JWT 필요
     */
    userRead: {},

    /**
     * * 회원정보 수정 PUT
     * * user/{id}/
     * * JWT 필요
     */
    userUpdate: {
        "sign_up_type": "",
        "email": "",
        "username": "",
        "password": ""
    },

    /**
     * * 회원정보 부분 수정 PATCH
     * * user/{id}/
     * * JWT 필요
     */
    userPartialUpdate: {
        "username": "",
        "password": ""
    },

    /**
     * * 회원정보 삭제 DELETE
     * * user/{id}/
     * * JWT 필요
     */
    userDelete: {},

    /**
     * * 카테고리 리스트 조회 GET
     * * category/ -> list
     * * category/{id}/ -> partical
     * * JWT 필요
     */
    categoryRead: {},

    /**
     * * 카테고리 등록 POST
     * * category/
     * * JWT 필요
     * !! order가 필요 없으면 delete
     */
    categoryWrite: {
        "name": "",
        "is_favorited": false,
        "order": 0
    },

    /**
     * * 카테고리 수정 PATCH
     * * category/{id}/
     * * JWT 필요
     * !! order가 필요 없으면 delete
     */
    categoryUpdate: {
        "name": "",
        "is_favorited": false,
        "order": 0
    },
    
    /**
     * * 카테고리 삭제 DLETE
     * * category/{id}/
     * * JWT 필요
     */
    categoryDelete: {},

    /**
     * * Link 리스트 조회 GET
     * * url/?category={categoryId}&path={path}&title={title}
     * * JWT 필요
     */
    linkRead: {},
    
    /**
     * * URL 등록 POST
     * * url/?category={categoryId}
     * * JWT 필요
     */
    linkWrite: {
        "path":[]
    },
    
    /**
     * * URL 삭제 DELETE
     * * url/{id}/
     * * JWT 필요
     */
    linkDelete: {}

};

export default  queryData;