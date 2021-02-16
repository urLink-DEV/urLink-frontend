const queryInfoData = {
  /**
   * * URL 등록 POST
   * * url/?category={categoryId}
   * * JWT 필요
   */
  linkCreate: {
    API: 'url/?category={categoryId}',
    method: 'post',
    bodyQuery: {
      path: [],
    },
    urlQuery: {
      categoryId: '',
    },
    replaceAPI({ categoryId }) {
      return this.API.replace('{categoryId}', categoryId ? `${categoryId}` : '');
    },
  },
};

export default queryInfoData;
