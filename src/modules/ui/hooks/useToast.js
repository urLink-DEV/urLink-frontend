import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setToast, uiSelector } from '@modules/ui';

const useToast = () => {
  const dispatch = useDispatch();
  const { open, type, message } = useSelector(uiSelector.toast);

  const openToast = useCallback(
    ({ type, message }) => {
      dispatch(setToast({ open: true, type, message }));
    },
    [dispatch]
  );

  const close = useCallback(() => {
    dispatch(setToast({ open: false }));
  }, [dispatch]);

  return { open, type, message, openToast, close };
};

export default useToast;
