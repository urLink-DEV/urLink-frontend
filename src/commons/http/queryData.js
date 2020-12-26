const queryData = {
  // ****************** USER ****************************** //
  /**
   * * 일반 회원가입 POST
   * * /user/sign-up/
   * * Authorization: JWT 불필요
   */
  nRegister: {
    method: 'post',
    bodyQuery: {
      sign_up_type: '', // * (normal default [server])
      email: '',
      username: '',
      password: '',
    },
  },

  /**
   * * 일반 로그인 POST
   * * /user/sign-in/
   * * Authorization: JWT 불필요
   */
  nLogin: {
    method: 'post',
    bodyQuery: {
      email: '',
      password: '',
    },
  },

  /**
   * * 구글 로그인 POST
   * * /user/google/sign-in/
   * * Authorization: JWT 불필요
   * * email, password 불필요
   */
  gLogin: {
    method: 'post',
    bodyQuery: {
      token: '',
    },
  },

  /**
   * * 구글 회원가입 POST
   * * /user/google/sign-up/
   * * Authorization: JWT 불필요
   */
  gRegister: {
    method: 'post',
    bodyQuery: {
      token: '',
    },
  },

  /**
   * * 로그아웃 POST
   * * /user/sign-out/
   * * JWT 불필요
   * * email, password 불필요
   */
  logout: {
    method: 'post',
  },

  /**
   * * 회원정보 조회 GET
   * * user/{userId}/ (option)
   * * JWT 필요
   */
  userRead: {
    method: 'get',
  },

  /**
   * * 회원정보 부분 수정 PATCH
   * * user/{userId}/ (option)
   * * JWT 필요
   */
  userUpdate: {
    method: 'patch',
    bodyQuery: {
      // "sign_up_type": "",
      // "email": "",
      username: '',
      password: '',
    },
  },

  /**
   * * 회원정보 삭제 DELETE
   * * user/{userId}/ (option)
   * * JWT 필요
   */
  userDelete: {
    method: 'delete',
  },
  // ****************** USER - END ************************ //

  // ****************** TOEKN ****************************** //
  /**
   * * JWT 발급 POST
   * * /user/token/
   * * JWT 불필요
   */
  // !! deprecated
  getToken: {
    method: 'post',
    bodyQuery: {
      email: '',
      password: '',
    },
  },

  /**
   * * JWT 갱신 POST
   * * /user/token/refresh/
   * * JWT 불필요
   */
  updateToken: {
    method: 'post',
    bodyQuery: {
      refresh: '',
    },
  },

  /**
   * * JWT 검사 POST
   * * /user/token/verify/
   * * JWT 불필요
   */
  checkToken: {
    method: 'post',
    bodyQuery: {
      token: '',
    },
  },
  // ****************** TOEKN - END ************************ //

  // ****************** CATEGORY *************************** //
  /**
   * * 카테고리 리스트 조회 GET
   * * category/ -> list
   * * category/{categoryId}/
   * * JWT 필요
   */
  categoryRead: {
    method: 'get',
  },

  /**
   * * 카테고리 등록 POST
   * * category/
   * * JWT 필요
   */
  categoryWrite: {
    method: 'post',
    bodyQuery: {
      name: '',
      is_favorited: '',
    },
  },

  /**
   * * 카테고리 수정 PATCH
   * * category/{categoryId}/
   * * JWT 필요
   */
  categoryUpdate: {
    method: 'patch',
    bodyQuery: {
      name: '',
      is_favorited: '',
      order: '',
    },
  },

  /**
   * * 카테고리 삭제 DLETE
   * * category/{id}/
   * * JWT 필요
   */
  categoryDelete: {
    method: 'delete',
  },
  // ****************** CATEGORY - END ********************** //

  // ****************** LINK ******************************* //
  /**
   * * Link 리스트 조회 GET
   * * url/?category={categoryId}&path={path}&title={title}
   * * JWT 필요
   */
  linkRead: { method: 'get' },

  /**
   * * URL 등록 POST
   * * url/?category={categoryId}
   * * JWT 필요
   */
  linkWrite: {
    method: 'post',
    bodyQuery: {
      path: [],
    },
  },

  /**
   * * URL 등록 PATCH
   * * /url/{urlId}/
   * * JWT 필요
   */
  linkUpdate: {
    method: 'patch',
    bodyQuery: {
      title: '',
      description: '',
      is_favorited: '',
    },
  },

  /**
   * * URL 삭제 DELETE
   * * url/{urlId}/
   * * JWT 필요
   */
  linkDelete: { method: 'delete' },
  // ****************** LINK - END ************************* //

  // ****************** ALRAM ***************************** //
  /**
   * * alarm 리스트 모두 조회 GET
   * * alarm/
   * * JWT 필요
   */
  alarmRead: { method: 'get' },

  /**
   * * alarm 등록 POST
   * * alarm/?category={categoryId}&url={urlId} (all Required)
   * * JWT 필요
   */
  alarmWrite: {
    method: 'post',
    bodyQuery: {
      name: '',
      reserved_time: {
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
      },
    },
  },

  /**
   * * alarm 등록 DELETE
   * * alarm/{alarmId}/ (Required)
   * * JWT 필요
   */
  alarmDelete: { method: 'delete' },
  // ****************** ALRAM - END ************************ //

  // ****************** ALRAM - SOCKET ************************ //
  /**
   * * alarm Read
   * * 알람 봤다고 요청
   */
  alarmReadMessage: {
    bodyQuery: {
      alarm_id: '',
      action: '', // * read
    },
  },

  /**
   * * alarm No message return
   * * 알람에 노출하지 않기로 요청
   */
  alarmNoReturnMessage: {
    bodyQuery: {
      alarm_id: '',
      action: '', // * done
    },
  },

  // ****************** ALRAM - - SOCKET - END *****************//
};

export default queryData;

export function selialize({ type, queryType = 'bodyQuery', originDataInfo }) {
  const dataInfo = {};
  const dataKeys = Object.keys(queryData[type][queryType]);
  Object.entries(originDataInfo).forEach(([key, value]) => {
    if (dataKeys.includes(key)) dataInfo[key] = value;
  });
  return dataInfo;
}
