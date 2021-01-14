import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  userGloginThunk,
  userGregisterThunk,
  userRegisterThunk,
  userLoginThunk,
  userLogoutThunk,
  userRemoveThunk,
} from '@modules/user';

function useUser() {
  const dispatch = useDispatch();

  const gRegisterThunk = useCallback(() => {
    return dispatch(userGregisterThunk());
  }, [dispatch]);

  const gloginThunk = useCallback(() => {
    return dispatch(userGloginThunk());
  }, [dispatch]);

  const registerThunk = useCallback(
    (formdata) => {
      return dispatch(userRegisterThunk(formdata));
    },
    [dispatch]
  );

  const loginThunk = useCallback(
    (formdata) => {
      return dispatch(userLoginThunk(formdata));
    },
    [dispatch]
  );

  const logoutThunk = useCallback(() => {
    return dispatch(userLogoutThunk());
  }, [dispatch]);

  const removeThunk = useCallback(() => {
    return dispatch(userRemoveThunk());
  }, [dispatch]);

  return { gRegisterThunk, gloginThunk, registerThunk, loginThunk, logoutThunk, removeThunk };
}

export default useUser;
