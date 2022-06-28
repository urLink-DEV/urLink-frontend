import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@mui/material'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import {
  categoryEdit,
  categoryClearEdit,
  categorySelect,
  categorySelector,
  categoryModifyThunk,
  categoriesReadThunk,
} from '@modules/category'
import { useToast } from '@modules/ui'
import { GAEvent } from '@utils/ga'

import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, useStyles } from './style'

function UpdateCategoryModal({ open, onClose }) {
  const dispatch = useDispatch()
  const editedCategory = useSelector(categorySelector.editedCategory)
  const { openToast } = useToast()
  const inputRef = useRef()
  const classes = useStyles()
  const [categoryName, setCategoryName] = useState(editedCategory.name)
  const [updateLoading, setUpdateLoading] = useState(false)

  const handleConfirm = async () => {
    setUpdateLoading(true)
    if (updateLoading || !categoryName) return
    try {
      const response = await dispatch(
        categoryModifyThunk({
          id: editedCategory.id,
          name: inputRef.current.value,
        })
      )
      await dispatch(categoriesReadThunk())
      dispatch(categorySelect({ ...response }))
      dispatch(categoryClearEdit())
      setUpdateLoading(false)
      GAEvent('메인', '카테고리 제목 수정 완료')
      onClose()
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }
  const handleChangeInput = (e) => {
    if (e.target.value.length > 24) return
    setCategoryName((prev) => (prev = e.target.value))
    dispatch(categoryEdit({ name: e.target.value }))
  }
  const handleKeyUpEnter = (e) => {
    e.stopPropagation()
    if (e.key === 'Enter') handleConfirm()
  }
  const handleCancel = () => {
    dispatch(categoryClearEdit())
    onClose()
    GAEvent('메인', '카테고리 제목 수정 취소')
  }

  return (
    <StyledDialog aria-labelledby="update-category-dialog-title" maxWidth="sm" open={open} onClose={handleCancel}>
      <StyledDialogTitle id="update-category-dialog-title">카테고리 수정</StyledDialogTitle>
      <StyledDialogContent>
        <input
          autoFocus
          type="text"
          className={classes.categoryNameInput}
          value={categoryName}
          onKeyUp={handleKeyUpEnter}
          onChange={handleChangeInput}
          placeholder="카테고리 이름을 입력해주세요."
          ref={inputRef}
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={handleCancel} className={clsx('cancle', classes.modalButton)}>
          취소
        </Button>
        <Button onClick={handleConfirm} className={clsx('confirm', classes.modalButton)}>
          확인
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default UpdateCategoryModal
