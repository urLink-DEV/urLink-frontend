import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDropZone, closeDropZone, closeAllDropZones, uiSelector } from '@modules/ui';

const useDropZone = (type) => {
  const dropZones = useSelector(uiSelector.dropZones);
  const dispatch = useDispatch();
  const open = !!dropZones.find((dropZone) => dropZone.type === type);

  const toggle = useCallback(() => {
    if (open) dispatch(closeDropZone({ type }));
    else dispatch(openDropZone({ type }));
  }, [open, type, dispatch]);

  const close = useCallback(() => {
    dispatch(closeDropZone({ type }));
  }, [dispatch, type]);

  const closeAll = useCallback(() => {
    if (dropZones.length) {
      dispatch(closeAllDropZones());
    }
  }, [dispatch, dropZones]);

  return { open, toggle, close, closeAll };
};

export default useDropZone;
