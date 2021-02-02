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
   * * 카테고리 수정 PUT
   * * /category/{categoryId}/
   * * Authorization: JWT 필요
   */
  categoryModify: {
    API: 'category/{userId}/',
    method: 'put',
    bodyQuery: {
      name: '',
      order: '',
      is_favorited: '',
    },
    urlQuery: {
      categoryId: '',
    },
    replaceAPI({ categoryId }) {
      return this.API.replace('{categoryId}/', categoryId ? `${categoryId}/` : '');
    },
  },

  /**
   * * 카테고리 삭제 DELETE
   * * /category/{categoryId}/
   * * Authorization: JWT 필요
   */
  categoryRemove: {
    API: 'category/{categoryId}/',
    method: 'delete',
    urlQuery: {
      categoryId: '',
    },
    replaceAPI({ categoryId }) {
      return this.API.replace('{categoryId}/', categoryId ? `${categoryId}/` : '');
    },
  },
};

export default queryInfoData;
