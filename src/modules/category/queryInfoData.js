const queryInfoData = {
  /**
   * * 카테고리 리스트 조회 GET
   * * /category/
   * * Authorization: JWT 필요
   */
  categoriesRead: {
    API: 'category/',
    method: 'get',
    bodyQuery: {},
  },
};

export default queryInfoData;
