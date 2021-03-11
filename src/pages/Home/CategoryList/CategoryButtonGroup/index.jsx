import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AlertModal } from '@components/modals'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import useStyles from './style'
import useEventListener from '@hooks/useEventListener'
import { useDialog, useToast, MODAL_NAME } from '@modules/ui'
import {
  selectSelectedCategory,
  categoriesRead,
  categoryCreateThunk,
  categoryRemoveThunk,
} from '@modules/category'

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
  const selectedCategory = useSelector(selectSelectedCategory)

  const [buttonState, setButtonState] = useState(BUTTON_STATE.addOpen)
  const [categoryName, setCategoryName] = useState('')

  const handleClickChangeToAddBtn = useCallback(() => {
    setButtonState(BUTTON_STATE.addOpen)
  }, [])

  useEventListener('click', handleClickChangeToAddBtn)

  const handleClickOpenEnterTab = useCallback((e) => {
    e.stopPropagation()
    setButtonState(BUTTON_STATE.addInput)
  },[])

  const handleClickAdd = useCallback(async (e) => {
    try {
      e.stopPropagation()
      if (!categoryName) {
        setButtonState(BUTTON_STATE.addOpen)
        setCategoryName('')
      } else {
        setButtonState(BUTTON_STATE.addOpen)
        await dispatch(categoryCreateThunk({ name: categoryName, is_favorited: false }))
        setCategoryName('')
        dispatch(categoriesRead.request(undefined, { key: 'isFirstCategory' }))
      }
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  },[categoryName, dispatch, openToast])

  const handleChangeNewCategoryTitle = useCallback((e) => {
    const checks = /[a-zA-Z]/
    if (checks.test(e.target.value)) {
      if (e.target.value.length >= 14) return
    } else if (e.target.value.length >= 7) return
    setCategoryName(e.target.value)
  }, [])

  const handleKeyUpAddTab = useCallback((e) => {
    if (e.keyCode === 13) handleClickAdd(e)
  },[handleClickAdd])

  const handleClickAddInput = useCallback((e) => {
    e.stopPropagation()
  },[])

  const handleClickCancel = useCallback((e) => {
    e.stopPropagation()
    setButtonState(BUTTON_STATE.addOpen)
    setCategoryName('')
  },[])

  const handleClickdDelete = useCallback(async (e) => {
    try {
      e.stopPropagation()
      await dispatch(categoryRemoveThunk({ id: selectedCategory.id }))
      dispatch(categoriesRead.request(undefined, { key: 'isFirstCategory' }))
      openToast({ type: 'success', message: '선택하신 카테고리가 삭제되었습니다.' })
      deleteCategoryToggle()
      setButtonState(BUTTON_STATE.deleteOpen)
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  },[deleteCategoryToggle, dispatch, openToast, selectedCategory.id])

  useEffect(() => {
    if (selectedCategory?.type === 'mount') {
      setButtonState(BUTTON_STATE.addOpen)
    } else {
      setButtonState(BUTTON_STATE.deleteOpen)
    }
  }, [selectedCategory])

  return (
    <>
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
        handleYesClick={handleClickdDelete}
      />
    </>
  )
}

export default React.memo(CategoryButtonGroup)
