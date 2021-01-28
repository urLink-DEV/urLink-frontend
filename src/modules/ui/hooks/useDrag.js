import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DRAG, setDrag, clearDrag, uiSelector } from '@modules/ui';
const { DRAG_STATUS } = DRAG;

const useDrag = (type) => {
  const { type: dragType, status: dragStatus, listData } = useSelector(uiSelector.drag);
  const dispatch = useDispatch();

  const setDragData = useCallback(
    (listData) => {
      dispatch(
        setDrag({
          type,
          status: DRAG_STATUS,
          listData,
        })
      );
    },
    [type, dispatch]
  );

  const clearDragData = useCallback(() => {
    dispatch(clearDrag());
  }, [dispatch]);

  return { dragType, dragStatus, listData, setDragData, clearDragData };
};

export default useDrag;
