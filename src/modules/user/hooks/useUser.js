import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRead, userSelector } from '@modules/user';

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
