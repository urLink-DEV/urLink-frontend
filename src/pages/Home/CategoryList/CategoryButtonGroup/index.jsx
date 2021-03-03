import React, { useState, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import { AlertModal } from '@components/modals'
import useEventListener from '@hooks/useEventListener'
import useStyles from './style'
import { useDialog, useToast, MODAL_NAME } from '@modules/ui'

import {
  categorySelect,
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
  const selectedCategory = useSelector(selectSelectedCategory)

  const [buttonState, setButtonState] = useState(BUTTON_STATE.addOpen)
  const [categoryName, setCategoryName] = useState('')

  const {
    open: deleteCategoryOpen,
    toggle: deleteCategoryToggle,
    close: deleteCategoryClose,
  } = useDialog(MODAL_NAME.DELETE_CATEGORY_ALERT_MODAL)

  const handleClickChangeToAddBtn = useCallback(() => {
    setButtonState(BUTTON_STATE.addOpen)
  }, [])

  useEventListener('click', handleClickChangeToAddBtn)

  const handleClickOpenEnterTab = (e) => {
    e.stopPropagation()
    setButtonState(BUTTON_STATE.addInput)
  }

  const handleClickAdd = async (e) => {
    try {
      e.stopPropagation()
      if (!categoryName) {
        setButtonState(BUTTON_STATE.addOpen)
        setCategoryName('')
      } else {
        setButtonState(BUTTON_STATE.addOpen)
        await dispatch(categoryCreateThunk({ name: categoryName, is_favorited: false }))
        setCategoryName('')
        dispatch(categoriesRead.request())
      }
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }

  const handleChangeNewCategoryTitle = useCallback((e) => {
    let checks = /[a-zA-Z]/
    if (checks.test(e.target.value)) {
      if (e.target.value.length >= 14) return
    } else if (e.target.value.length >= 7) return
    setCategoryName(e.target.value)
  }, [])

  const onKeyUpAddTab = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.keyCode === 13) handleClickAdd(e)
  }

  const handleClickAddInput = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleClickCancel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setButtonState(BUTTON_STATE.addOpen)
    setCategoryName('')
  }

  const handleClickdDelete = async (e) => {
    try {
      e.stopPropagation()
      await dispatch(categoryRemoveThunk({ id: selectedCategory.id }))
      dispatch(categoriesRead.request())
      openToast({ type: 'success', message: '선택하신 카테고리가 삭제되었습니다.' })
      deleteCategoryToggle()
      setButtonState(BUTTON_STATE.deleteOpen)
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }

  useEffect(() => {
    if (selectedCategory?.type === 'mount') {
      setButtonState(BUTTON_STATE.addOpen)
    } else {
      setButtonState(BUTTON_STATE.deleteOpen)
    }
  }, [selectedCategory])

  return (
    <>
      <Button
        className={clsx(classes.addButton, {
          [classes.hidden]: buttonState !== BUTTON_STATE.addOpen,
          [classes.block]: buttonState === BUTTON_STATE.addOpen,
        })}
        variant="contained"
        onClick={handleClickOpenEnterTab}
      >
        <AddCircleOutlineIcon className={classes.addCircleIcon} />
      </Button>
      <Button
        className={clsx(classes.deleteButton, {
          [classes.block]: buttonState === BUTTON_STATE.deleteOpen,
          [classes.hidden]: buttonState !== BUTTON_STATE.deleteOpen,
        })}
        variant="contained"
        onClick={deleteCategoryToggle}
      >
        <DeleteIcon style={{ color: '#cccccc' }} />
      </Button>

      {buttonState === BUTTON_STATE.addInput && (
        <Paper className={classes.enterTab} component="div">
          <InputBase
            className={classes.input}
            placeholder="New Category"
            value={categoryName}
            onChange={handleChangeNewCategoryTitle}
            onKeyUp={onKeyUpAddTab}
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

export default CategoryButtonGroup
