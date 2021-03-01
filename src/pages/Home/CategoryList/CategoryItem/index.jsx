import React, { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import useStyles from './style'
import starImg from '@images/star.svg'

import { categorySelect } from '@modules/category'

function CategoryItem({
  data = {},
  selected = false,
  isEditTitle = false,
  historyDragFinished = false,
  dragFinished = false,
  selectedCategoryTitle = '',
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [categoryTitle, setCategoryTitle] = useState(data.name)

  const handleClickCategory = useCallback(
    (e) => {
      e.stopPropagation()
      dispatch(categorySelect({ ...data }))
    },
    [dispatch, data]
  )

  useEffect(() => {
    if (selected) {
      setCategoryTitle(selectedCategoryTitle)
    }
  }, [selected, selectedCategoryTitle])

  return (
    <div>
      <div
        onClick={handleClickCategory}
        className={clsx(classes.listTab, {
          [classes.selectedItem]: Boolean(selected),
          [classes.modifying]: Boolean(selected && isEditTitle),
        })}
      >
        <Paper
          className={clsx(classes.root, classes.paper, {
            [classes.dragFinished]: Boolean(dragFinished || historyDragFinished),
          })}
          component="div"
        >
          <div
            className={clsx(classes.title, {
              [classes.selectedTitle]: Boolean(selected),
            })}
          >
            {categoryTitle}
          </div>

          <div className={classes.linkBox}>
            <span
              className={clsx(classes.urlCountBox, {
                [classes.marginRight]: !Boolean(data.is_favorited),
              })}
            >
              {data.url_count === 0 ? '링크 없음' : data.url_count + ' 링크'}
            </span>
            {data.is_favorited && (
              <img
                draggable="false"
                className={classes.favoriteStar}
                alt="favorite-star"
                src={starImg}
              />
            )}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default React.memo(CategoryItem)
