import React, { useState, useCallback, useEffect, Fragment } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'

import useEventListener from '@hooks/useEventListener'
import { AlertModal } from '@main/components/modals'
import { categorySelector, categoriesRead, categoryCreateThunk, categoryRemoveThunk } from '@modules/category'
import { useDialog, useToast, MODAL_NAME } from '@modules/ui'
import { GAEvent } from '@utils/ga'

import useStyles from './style'

const BUTTON_STATE = {
  addOpen: 'addOpen',
  deleteOpen: 'deleteOpen',
  addInput: 'addInput',
}

function CategoryButtonGroup() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { openToast } = useToast()
  const {
    open: deleteCategoryOpen,
    toggle: deleteCategoryToggle,
    close: deleteCategoryClose,
  } = useDialog(MODAL_NAME.DELETE_CATEGORY_ALERT_MODAL)
  const selectedCategory = useSelector(categorySelector.selectedCategory)

  const [buttonState, setButtonState] = useState(BUTTON_STATE.addOpen)
  const [categoryName, setCategoryName] = useState('')

  const handleClickChangeToAddBtn = useCallback(() => {
    setButtonState(BUTTON_STATE.addOpen)
  }, [])

  useEventListener('click', handleClickChangeToAddBtn)

  const handleClickOpenEnterTab = useCallback((e) => {
    e.stopPropagation()
    setButtonState(BUTTON_STATE.addInput)
    GAEvent('카테고리', '카테고리 생성 텍스트 입력창으로 토글')
  }, [])

  const handleClickAdd = useCallback(
    async (e) => {
      if (!categoryName) return
      try {
        e.stopPropagation()
        setCategoryName('')
        await dispatch(categoryCreateThunk({ name: categoryName, is_favorited: false }))
        dispatch(categoriesRead.request(undefined, { selectFirstCategory: true }))
        GAEvent('카테고리', '카테고리 생성 완료')
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [categoryName, dispatch, openToast]
  )

  const handleChangeNewCategoryTitle = useCallback((e) => {
    if (e.target.value.length > 18) return
    setCategoryName(e.target.value)
  }, [])

  const handleKeyUpAddTab = useCallback(
    (e) => {
      if (e.key === 'Enter') handleClickAdd(e)
    },
    [handleClickAdd]
  )

  const handleClickAddInput = useCallback((e) => {
    e.stopPropagation()
  }, [])

  const handleClickCancel = useCallback((e) => {
    e.stopPropagation()
    setButtonState(BUTTON_STATE.addOpen)
    setCategoryName('')
    GAEvent('카테고리', '카테고리 생성 취소')
  }, [])

  const handleClickDelete = useCallback(
    async (e) => {
      try {
        e.stopPropagation()
        deleteCategoryToggle()
        await dispatch(categoryRemoveThunk({ id: selectedCategory.id }))
        dispatch(categoriesRead.request(undefined, { selectFirstCategory: true }))
        openToast({ type: 'success', message: '선택하신 카테고리가 삭제되었습니다.' })
        GAEvent('카테고리', '카테고리 삭제 완료')
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [deleteCategoryToggle, dispatch, openToast, selectedCategory.id]
  )

  useEffect(() => {
    if (selectedCategory?.id) setButtonState(BUTTON_STATE.deleteOpen)
  }, [selectedCategory])

  return (
    <Fragment>
      {buttonState === BUTTON_STATE.addOpen && (
        <Button className={classes.addButton} variant="contained" onClick={handleClickOpenEnterTab}>
          <AddCircleOutlineIcon className={classes.addCircleIcon} />
        </Button>
      )}

      {buttonState === BUTTON_STATE.deleteOpen && (
        <Button className={classes.deleteButton} variant="contained" onClick={deleteCategoryToggle}>
          <DeleteIcon style={{ color: '#cccccc' }} />
        </Button>
      )}

      {buttonState === BUTTON_STATE.addInput && (
        <Paper className={classes.enterTab} component="div">
          <InputBase
            autoFocus
            className={classes.input}
            placeholder="New Category"
            value={categoryName}
            onChange={handleChangeNewCategoryTitle}
            onKeyUp={handleKeyUpAddTab}
            onClick={handleClickAddInput}
          />
          <Button className={classes.okBtn} onClick={handleClickAdd}>
            확인
          </Button>
          <Button className={classes.cancelBtn} onClick={handleClickCancel}>
            취소
          </Button>
        </Paper>
      )}

      <AlertModal
        openBool={deleteCategoryOpen}
        btnYesText="삭제"
        contentText="카테고리를 삭제하면 안에 저장된 모든 탭이 삭제 됩니다. 그래도 삭제 하시겠습니까?"
        handleClose={deleteCategoryClose}
        handleYesClick={handleClickDelete}
      />
    </Fragment>
  )
}

export default React.memo(CategoryButtonGroup)
