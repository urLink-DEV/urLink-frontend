const queryInfoData = {
  /**
   * * Link 리스트 조회 GET
   * * url/?category={categoryId}&path={path}&title={title}
   * * JWT 필요
   */
  linksRead: {
    API: 'url/?category={categoryId}&path={path}&title={title}',
    method: 'get',
    bodyQuery: {},
    urlQuery: {
      categoryId: '',
      path: '',
      title: '',
    },
    replaceAPI({ categoryId, path, title }) {
      if (!categoryId) return
      return this.API.replace('{categoryId}', categoryId)
        .replace('&path={path}', path ? `&path=${path}` : '')
        .replace('&title={title}', title ? `&title=${title}` : '')
    },
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
      if (!categoryId) return
      return this.API.replace('{categoryId}', categoryId)
    },
  },

  /**
   * * URL 등록 PATCH
   * * /url/{urlId}/
   * * JWT 필요
   */
  linkModify: {
    API: 'url/{urlId}/',
    method: 'patch',
    bodyQuery: {
      title: '',
      description: '',
      is_favorited: '',
    },
    urlQuery: {
      urlId: '',
    },
    replaceAPI({ urlId }) {
      if (!urlId) return
      return this.API.replace('{urlId}', urlId)
    },
  },

  /**
   * * URL 삭제 DELETE
   * * url/{urlId}/
   * * JWT 필요
   */
  linkRemove: {
    API: 'url/{urlId}/',
    method: 'delete',
    bodyQuery: {},
    urlQuery: {
      urlId: '',
    },
    replaceAPI({ urlId }) {
      if (!urlId) return
      return this.API.replace('{urlId}', urlId)
    },
  },
}

export default queryInfoData
