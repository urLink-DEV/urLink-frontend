import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  userRead,
  userGloginThunk,
  userGregisterThunk,
  userRegisterThunk,
  userLoginThunk,
  userLogoutThunk,
  userRemoveThunk,
  userSelector,
} from '@modules/user';

export function useUserData() {
  const dispatch = useDispatch();
  const data = useSelector(userSelector.data);
  const pending = useSelector((state) => state.pending[userRead.TYPE]);
  const error = useSelector((state) => state.error[userRead.TYPE]);

  const reload = () => {
    dispatch(userRead.request());
  };

  useEffect(() => {
    if (pending === undefined) {
      dispatch(userRead.request());
    }
  }, [dispatch, pending]);

  return { pending, error, data, reload };
}

export function useUser() {
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

