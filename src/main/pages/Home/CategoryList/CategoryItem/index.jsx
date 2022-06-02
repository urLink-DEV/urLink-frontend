import React, { useCallback, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import useOutsideAlerter from '@/hooks/useOutsideAlerter'
import { AlertModal } from '@/main/components/modals'
import moreImg from '@assets/images/more_3dot.svg'
import starImg from '@assets/images/star.svg'
import starFillImg from '@assets/images/star_fill.svg'
import {
  categorySelect,
  categorySelector,
  categoriesReadThunk,
  categoryModifyThunk,
  categoryRemoveThunk,
  categoriesRead,
  categoryEdit,
  categoryClearEdit,
} from '@modules/category'
import { linkSelector, linkSelectBoxChangeState, linkClearSelect } from '@modules/link'
import { useToast, useDialog, MODAL_NAME } from '@modules/ui'
import { GAEvent } from '@utils/ga'

import UpdateCategoryModal from '../UpdateCategoryModal'
import useStyles from './style'

function CategoryItem({ data = {}, selected = false, hovered = false, dragFinished = false }) {
  const { openToast } = useToast()
  const dispatch = useDispatch()
  const editedCategory = useSelector(categorySelector.editedCategory)
  const isOpenLinkSelectBox = useSelector(linkSelector.isOpenLinkSelectBox)
  const isEditingTitle = useMemo(() => Boolean(editedCategory?.id === data?.id), [editedCategory, data])
  const [moreOpen, setMoreOpen] = useState(false)
  const [updateCategoryOpen, setUpdateCategoryOpen] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState(false)

  const {
    open: deleteAlertOpen,
    toggle: deleteAlertToggle,
    close: deleteAlertClose,
  } = useDialog(MODAL_NAME.DELETE_CATEGORY_ALERT_MODAL)
  const moreBtnGroupRef = useRef()
  const classes = useStyles({ selected, hovered, editing: isEditingTitle, favorite: data.is_favorited, moreOpen })

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
    setMoreOpen(true)
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
      dispatch(categoriesRead.request(undefined, { selectFirstCategory: true }))
      openToast({ type: 'success', message: '선택하신 카테고리가 삭제되었습니다.' })
      GAEvent('카테고리', '카테고리 삭제 완료')
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }

  const handleCloseUpdateCategoryModal = () => {
    setMoreOpen(false)
    setUpdateCategoryOpen(false)
    dispatch(categoryClearEdit())
  }
  const handleClickChangeName = (e) => {
    e.stopPropagation()
    setMoreOpen(false)
    setUpdateCategoryOpen(true)
    dispatch(categoryEdit({ id: data?.id, name: data?.name }))
    GAEvent('메인', '카테고리 제목 수정 버튼 클릭')
  }

  useOutsideAlerter(moreBtnGroupRef, moreOpen, () => setMoreOpen(false))

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
            <img alt="favorite-star" src={data.is_favorited ? starFillImg : starImg} />
          </button>
          <button type="button" className={classes.moreBtn} onClick={handleClickMore}>
            <img alt="more-dots" src={moreImg} />
          </button>

          {moreOpen ? (
            <div className={classes.moreBtnGroup} ref={moreBtnGroupRef}>
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

      {updateCategoryOpen && (
        <UpdateCategoryModal open={updateCategoryOpen} onClose={handleCloseUpdateCategoryModal} data={data} />
      )}

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
