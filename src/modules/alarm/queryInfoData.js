const queryInfoData = {
  /**
   * * alarm 리스트 모두 조회 GET
   * * alarm/
   * * JWT 필요
   */
  alarmsRead: {
    API: 'alarm/',
    method: 'get',
    bodyQuery: {},
    urlQuery: {},
    replaceAPI() {
      return this.API
    },
  },

  /**
   * * alarm 등록 POST
   * * alarm/?category={categoryId}&url={urlId} (all Required)
   * * JWT 필요
   */
  alarmCreate: {
    API: 'alarm/?category={categoryId}&url={urlId}',
    method: 'post',
    bodyQuery: {
      name: '',
      reserved_time: {
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
      }
    },
    urlQuery: {
      categoryId: '',
      urlId: '',
    },
    replaceAPI({ categoryId, urlId }) {
      if (!categoryId || !urlId) return
      return this.API.replace('{categoryId}', categoryId).replace('{urlId}', urlId)
    },
  },

  /**
   * * alarm 등록 DELETE
   * * alarm/{alarmId}/ (Required)
   * * JWT 필요
   */
  alarmRemove: {
    API: 'alarm/{alarmId}/',
    method: 'delete',
    bodyQuery: {},
    urlQuery: {
      alarmId: '',
    },
    replaceAPI({ alarmId }) {
      if (!alarmId) return
      return this.API.replace('{alarmId}', alarmId)
    },
  },
}

export default queryInfoData
