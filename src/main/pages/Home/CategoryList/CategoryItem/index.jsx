import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'

import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import useOutsideAlerter from '@/hooks/useOutsideAlerter'
import { AlertModal } from '@/main/components/modals'
import moreImg from '@assets/images/more_3dot.svg'
import starImg from '@assets/images/star.svg'
import starFillImg from '@assets/images/star_fill.svg'
import {
  categorySelect,
  categoriesReadThunk,
  categoryModifyThunk,
  categoryRemoveThunk,
  categoriesRead,
  categoryEdit,
  categorySelector,
} from '@modules/category'
import { linkSelector, linkSelectBoxChangeState, linkClearSelect } from '@modules/link'
import { useToast, useDialog, MODAL_NAME } from '@modules/ui'
import { GAEvent } from '@utils/ga'

import useStyles from './style'

function CategoryItem({ data = {}, selected = false, hovered = false, dragFinished = false }) {
  const { openToast } = useToast()
  const dispatch = useDispatch()
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const isOpenLinkSelectBox = useSelector(linkSelector.isOpenLinkSelectBox)
  const [moreOpen, setMoreOpen] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState(false)
  const [moreBtnGroupPosition, setMoreBtnGroupPosition] = useState({})
  const moreBtnGroupRef = useRef()
  const moreBtnRef = useRef()
  const classes = useStyles({ selected, hovered, favorite: data.is_favorited, moreOpen })

  const {
    open: deleteAlertOpen,
    toggle: deleteAlertToggle,
    close: deleteAlertClose,
  } = useDialog(MODAL_NAME.DELETE_CATEGORY_ALERT_MODAL)
  const { toggle: updateCategoryToggle } = useDialog(MODAL_NAME.UPDATE_CATEGORY_MODAL)

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
      dispatch(categoriesReadThunk())
      GAEvent('카테고리', `카테고리 ${data.is_favorited ? '즐겨찾기 해제' : '즐겨찾기'} 완료`)
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }

  const handleClickMore = (e) => {
    e.stopPropagation()
    const rect = moreBtnRef.current.getBoundingClientRect()
    setMoreOpen(true)
    setMoreBtnGroupPosition({
      ...moreBtnGroupPosition,
      x: rect.left + 32,
      y: rect.top,
    })
  }

  const handleClickDelete = (e) => {
    e.stopPropagation()
    setMoreOpen(false)
    setDeleteStatus(true)
    deleteAlertToggle()
  }

  const handleCloseDeleteAlert = () => {
    setMoreOpen(false)
    setDeleteStatus(false)
    deleteAlertClose()
  }
  const handleDelete = async (e) => {
    try {
      e.stopPropagation()
      handleCloseDeleteAlert()
      await dispatch(categoryRemoveThunk({ id: data.id }))
      if (data.id === selectedCategory.id) {
        dispatch(categoriesRead.request(undefined, { selectFirstCategory: true }))
      }
      openToast({ type: 'success', message: '선택하신 카테고리가 삭제되었습니다.' })
      GAEvent('카테고리', '카테고리 삭제 완료')
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }

  const handleClickChangeName = (e) => {
    e.stopPropagation()
    setMoreOpen(false)
    updateCategoryToggle()
    dispatch(categoryEdit({ id: data?.id, name: data?.name }))
    GAEvent('카테고리', '카테고리 제목 수정 버튼 클릭')
  }

  useOutsideAlerter(moreBtnGroupRef, moreOpen, () => setMoreOpen(false))

  const categoryContainer = document.getElementById('category-container')

  useEffect(() => {
    const detectSrcoll = () => {
      if (moreOpen) {
        setMoreOpen(false)
      }
    }

    if (moreOpen) {
      categoryContainer.addEventListener('scroll', detectSrcoll)
    } else {
      categoryContainer.removeEventListener('scroll', detectSrcoll)
    }
  }, [moreOpen, categoryContainer])

  return (
    <div onClick={handleClickCategory} className={classes.tabContainer}>
      <div
        className={clsx(classes.tab, {
          [classes.dragFinished]: Boolean(dragFinished),
        })}
      >
        <div className={classes.title}>{data?.name}</div>
        <div className={clsx('link-container', classes.link)}>
          <span className={classes.urlCount}>{data.url_count === 0 ? '링크 없음' : '링크 ' + data.url_count}</span>
        </div>
        <div className={clsx('show-btn-group', classes.btnGroup)}>
          <button type="button" className={classes.favoriteBtn} onClick={handleClickFavoriteStar}>
            <img alt="favorite-star" src={data.is_favorited ? starFillImg : starImg} />
          </button>
          <button type="button" ref={moreBtnRef} className={classes.moreBtn} onClick={handleClickMore}>
            <img alt="more-dots" src={moreImg} />
          </button>

          {moreOpen ? (
            <div
              className={classes.moreBtnGroup}
              ref={moreBtnGroupRef}
              style={{ top: moreBtnGroupPosition.y, left: moreBtnGroupPosition.x }}
            >
              <button type="button" onClick={handleClickChangeName}>
                이름 변경
              </button>
              <button type="button" onClick={handleClickDelete}>
                삭제
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {deleteStatus && deleteAlertOpen && (
        <AlertModal
          openBool={deleteAlertOpen}
          btnYesText="삭제"
          contentText="카테고리를 삭제하면 안에 저장된 모든 탭이 삭제 됩니다. 그래도 삭제 하시겠습니까?"
          handleClose={handleCloseDeleteAlert}
          handleYesClick={handleDelete}
        />
      )}
    </div>
  )
}

export default CategoryItem
