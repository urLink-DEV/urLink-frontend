const queryInfoData = {
  /**
   * * alarm Read SOCKET
   * * 알람 봤다고 요청
   */
  alarmReadNotice: {
    method: 'socket',
    bodyQuery: {
      alarm_id: '',
      action: 'read',
    },
  },

  /**
   * * alarm No message return SOCKET
   * * 알람에 노출하지 않기로 요청
   */
  alarmNoReturn: {
    method: 'socket',
    bodyQuery: {
      alarm_id: '',
      action: 'done',
    },
  },
}

export default queryInfoData
