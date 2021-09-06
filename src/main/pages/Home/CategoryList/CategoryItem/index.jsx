import React, { useCallback, useMemo } from 'react'

import Paper from '@mui/material/Paper'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import starImg from '@assets/images/star.svg'
import { categorySelect, categorySelector } from '@modules/category'

import useStyles from './style'

function CategoryItem({ data = {}, selected = false, hovered = false, dragFinished = false }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const editedCategory = useSelector(categorySelector.editedCategory)
  const isEditingTitle = useMemo(() => Boolean(editedCategory?.id === data?.id), [editedCategory, data])

  const handleClickCategory = useCallback(
    (e) => {
      e.stopPropagation()
      dispatch(categorySelect({ ...data }))
    },
    [dispatch, data]
  )

  return (
    <div>
      <div
        onClick={handleClickCategory}
        className={clsx(classes.listTab, {
          [classes.selectedItem]: Boolean(selected),
          [classes.modifying]: Boolean(selected && isEditingTitle),
        })}
      >
        <Paper
          className={clsx(classes.root, classes.paper, {
            [classes.hoveredItem]: Boolean(hovered),
            [classes.dragFinished]: Boolean(dragFinished),
          })}
          component="div"
        >
          <div
            className={clsx(classes.title, {
              [classes.selectedTitle]: Boolean(selected),
              [classes.favoriteTitle]: Boolean(data.is_favorited),
            })}
          >
            {isEditingTitle ? editedCategory?.name : data?.name}
          </div>

          <div className={classes.linkBox}>
            <span className={clsx(classes.urlCountBox)}>
              {data.url_count === 0 ? '링크 없음' : data.url_count + ' 링크'}
            </span>
            {data.is_favorited && (
              <img draggable="false" className={classes.favoriteStar} alt="favorite-star" src={starImg} />
            )}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default React.memo(CategoryItem)
