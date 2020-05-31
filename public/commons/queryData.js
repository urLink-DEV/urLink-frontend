const queryData = {
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
     * * 카테고리 리스트 조회
     * * category/ -> list
     * * category/{id}/ -> partical
     * * JWT 필요
     */
    categoryRead: {},

        /**
     * * URL 등록 POST
     * * url/?category={categoryId}
     * * JWT 필요
     */
    linkWrite: {
        "path":[]
    }
};