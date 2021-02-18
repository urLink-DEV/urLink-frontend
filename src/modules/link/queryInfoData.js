const queryInfoData = {
  
  /**
   * * Link 리스트 조회 GET
   * * url/?category={categoryId}&path={path}&title={title}
   * * JWT 필요
   */
  linksRead: { 
    API: 'url/',
    method: 'get',
    bodyQuery: {},
  },

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

  /**
   * * URL 등록 PATCH
   * * /url/{urlId}/
   * * JWT 필요
   */
  linkModify: {
    API: 'url/{urlId}',
    method: 'patch',
    bodyQuery: {
      title: '',
      description: '',
      is_favorited: '',
    },
    replaceAPI({ urlId }) {
      return this.API.replace('{urlId}', urlId ? `${urlId}` : '');
    },
  },

  /**
   * * URL 삭제 DELETE
   * * url/{urlId}/
   * * JWT 필요
   */
  linkRemove: { 
    API: 'url/{urlId}',
    method: 'delete',
    bodyQuery: {},
    replaceAPI({ urlId }) {
      return this.API.replace('{urlId}', urlId ? `${urlId}` : '');
    },
  },
};

export default queryInfoData
