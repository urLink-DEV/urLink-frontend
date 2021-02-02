import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesRead, categorySelector } from '@modules/category';

export function useCategories() {
  const dispatch = useDispatch();
  const categories = useSelector(categorySelector.data);
  const pending = useSelector((state) => state.pending[categoriesRead.TYPE]);
  const error = useSelector((state) => state.error[categoriesRead.TYPE]);

  const reload = () => {
    dispatch(categoriesRead.request());
  };

  React.useEffect(() => {
    // If not loaded yet
    if (pending === undefined) {
      dispatch(categoriesRead.request());
    }
  }, [dispatch, pending]);

  return { pending, error, categories, reload };
}
