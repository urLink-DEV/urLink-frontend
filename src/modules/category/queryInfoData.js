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

  /**
   * * 카테고리 생성 POST
   * * /category/
   * * Authorization: JWT 필요
   */
  categoryCreate: {
    API: 'category/',
    method: 'post',
    bodyQuery: {
      name: '',
      is_favorited: '',
    },
  },

  /**
   * * 카테고리 수정 PATCH
   * * /category/{id}/
   * * Authorization: JWT 필요
   */
  categoryModify: {
    API: 'category/{id}/',
    method: 'patch',
    bodyQuery: {
      id: '',
      name: '',
      order: '',
      is_favorited: '',
    },
    urlQuery: {
      id: '',
    },
    replaceAPI({ id }) {
      return this.API.replace('{id}/', id ? `${id}/` : '');
    },
  },

  /**
   * * 카테고리 삭제 DELETE
   * * /category/{id}/
   * * Authorization: JWT 필요
   */
  categoryRemove: {
    API: 'category/{id}/',
    method: 'delete',
    bodyQuery: {},
    urlQuery: {
      id: '',
    },
    replaceAPI({ id }) {
      return this.API.replace('{id}/', id ? `${id}/` : '');
    },
  },
};

export default queryInfoData;
