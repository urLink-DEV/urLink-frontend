const queryData = {

    /**
     * * 일반 회원가입 POST
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
     * * Authorization: JWT 불필요
     */
    n_login: {
        "email": "",
        "password": ""
    },

    /**
     * * 구글 로그인 POST
     * * Authorization: JWT 불필요
     * * email, password 불필요
     */
    g_login: {
        "token": ""
    },

    /**
     * * 구글 회원가입 POST
     * * Authorization: JWT 불필요
     * * email, password 불필요
     */
    g_register: {
        "token": ""
    },

    /**
     * * 로그아웃 POST
     * * JWT 불필요
     * * email, password 불필요
     */
    logout: {},

    /**
     * * JWT 발급 POST
     * * JWT 불필요
     */
    getToken: {
        "email": "",
        "password": ""
    },

    /**
     * * JWT 갱신 POST
     * * JWT 불필요
     */
    updateToken: {
        "refresh": ""
    },

    /**
     * * JWT 검사 POST
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
        "email": "",
        "username": ""
    },

    /**
     * * 회원정보 삭제 DELETE
     * * user/{id}/
     * * JWT 필요
     */
    userDelete: {},

    /**
     * * 카테고리 리스트 조회
     * * category/ -> list
     * * category/{id}/ -> partical
     * * JWT 필요
     */
    categoryRead: {},

    /**
     * * 카테고리 등록
     * * category/
     * * JWT 필요
     */
    categoryWrite: {
        "name": "",
        "is_favorited": false,
        "order": 0
    },

    /**
     * * 카테고리 수정
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
     * * 카테고리 삭제
     * * category/{id}/
     * * JWT 필요
     */
    categoryDelete: {}

};

export default  queryData;