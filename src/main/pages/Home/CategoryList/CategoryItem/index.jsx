import React, { useCallback, useMemo } from 'react'

import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import starImg from '@assets/images/star.svg'
import starFillImg from '@assets/images/star_fill.svg'
import { categorySelect, categorySelector, categoriesReadThunk, categoryModifyThunk } from '@modules/category'
import { linkSelector, linkSelectBoxChangeState, linkClearSelect } from '@modules/link'
import { useToast } from '@modules/ui'
import { GAEvent } from '@utils/ga'

import useStyles from './style'

function CategoryItem({ data = {}, selected = false, hovered = false, dragFinished = false }) {
  const { openToast } = useToast()
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

  const handleClickFavoriteStar = async (e) => {
    e.stopPropagation()
    try {
      await dispatch(
        categoryModifyThunk({
          id: data.id,
          name: data.name,
          order: 1,
          is_favorited: data.is_favorited ? false : true,
        })
      )
      await dispatch(categoriesReadThunk())
      GAEvent('카테고리', `카테고리 ${data.is_favorited ? '즐겨찾기 해제' : '즐겨찾기'} 완료`)
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }
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
        </div>
        <div className={clsx('show-btn-group', classes.btnGroup)}>
          <button type="button" className={classes.favoriteBtn} onClick={handleClickFavoriteStar}>
            <img className={classes.favoriteStar} alt="favorite-star" src={data.is_favorited ? starFillImg : starImg} />
          </button>
          <button type="button" className={classes.moreBtn}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryItem
