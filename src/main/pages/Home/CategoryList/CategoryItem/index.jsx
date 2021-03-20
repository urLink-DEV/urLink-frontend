import React, { useCallback } from 'react'

import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import starImg from '@assets/images/star.svg'
import { categorySelect, categorySelector } from '@modules/category'

import useStyles from './style'

function CategoryItem({ data = {}, selected = false, dragFinished = false }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const editedCategory = useSelector(categorySelector.editedCategory)
  const isEditingTitle = Boolean(editedCategory?.id === data?.id)

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
            [classes.dragFinished]: Boolean(dragFinished),
          })}
          component="div"
        >
          <div
            className={clsx(classes.title, {
              [classes.selectedTitle]: Boolean(selected),
            })}
          >
            {isEditingTitle ? editedCategory?.name : data?.name}
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
              <img draggable="false" className={classes.favoriteStar} alt="favorite-star" src={starImg} />
            )}
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default React.memo(CategoryItem)
