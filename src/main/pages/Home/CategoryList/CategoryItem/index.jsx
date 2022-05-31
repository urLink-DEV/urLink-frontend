import React, { useCallback, useMemo } from 'react'

import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import starImg from '@assets/images/star.svg'
import { categorySelect, categorySelector } from '@modules/category'
import { linkSelector, linkSelectBoxChangeState, linkClearSelect } from '@modules/link'
import { GAEvent } from '@utils/ga'

import useStyles from './style'

function CategoryItem({ data = {}, selected = false, hovered = false, dragFinished = false }) {
  const dispatch = useDispatch()
  const editedCategory = useSelector(categorySelector.editedCategory)
  const isOpenLinkSelectBox = useSelector(linkSelector.isOpenLinkSelectBox)
  const isEditingTitle = useMemo(() => Boolean(editedCategory?.id === data?.id), [editedCategory, data])
  const classes = useStyles({ selected, hovered, editing: isEditingTitle, favorite: data.is_favorited })

  const handleClickCategory = useCallback(
    (e) => {
      e.stopPropagation()
      if (isOpenLinkSelectBox) {
        dispatch(linkSelectBoxChangeState(false))
        dispatch(linkClearSelect())
      }
      dispatch(categorySelect({ ...data }))
      GAEvent('카테고리', '카테고리 선택')
    },
    [dispatch, isOpenLinkSelectBox, data]
  )

  return (
    <div onClick={handleClickCategory} className={classes.tabContainer}>
      <div
        className={clsx(classes.tab, {
          [classes.dragFinished]: Boolean(dragFinished),
        })}
      >
        <div className={classes.title}>{isEditingTitle ? editedCategory?.name : data?.name}</div>
        <div className={classes.link}>
          <span className={classes.urlCount}>{data.url_count === 0 ? '링크 없음' : '링크 ' + data.url_count}</span>
          {data.is_favorited && (
            <img draggable="false" className={classes.favoriteStar} alt="favorite-star" src={starImg} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryItem
