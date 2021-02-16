import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import useStyles from './style';
import star from '@images/star.svg';

import {
  categorySelect,
  selectSelectedCategory,
  categoriesRead,
  categoryCreateThunk,
  categoryRemove,
} from '@modules/category';

export default function CategoryListItem(props) {
  const {
    categoryData,
    selected,
    isEditTitle,
    historyDragFinished,
    dragFinished,
    selectedCategoryTitle,
  } = props;

  const { id, name, is_favorited, url_count } = categoryData;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [categoryTitle, setCategoryTitle] = useState(name);

  const handleClickCategory = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(categorySelect({ ...categoryData }));
    },
    [dispatch, categoryData]
  );

  useEffect(() => {
    if (selected) {
      setCategoryTitle(selectedCategoryTitle);
    }
  }, [selected, selectedCategoryTitle]);

  return (
    <div key={id}>
      <div
        onClick={handleClickCategory}
        className={
          classes.listTab +
          (selected ? ' ' + classes.selectedItem : '') +
          (selected && isEditTitle ? ' ' + classes.modifying : '')
        }
      >
        <Paper
          className={
            classes.root + (dragFinished || historyDragFinished ? ' ' + classes.dragFinished : '')
          }
          component="div"
          id={id}
        >
          <div className={classes.title + (selected ? ' ' + classes.selectedTitle : '')}>
            {categoryTitle}
          </div>
          <div className={classes.linkBox}>
            <div className={classes.urlCountBox + (!is_favorited ? ' ' + classes.marginRight : '')}>
              {url_count === 0 ? '링크 없음' : url_count + ' 링크'}
            </div>
            {is_favorited ? (
              <img
                draggable="false"
                className={classes.favoriteStar}
                alt="favorite-star"
                src={star}
              />
            ) : (
              ''
            )}
          </div>
        </Paper>
      </div>
    </div>
  );
}
