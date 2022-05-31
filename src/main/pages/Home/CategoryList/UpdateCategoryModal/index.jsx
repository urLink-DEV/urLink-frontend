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

function UpdateCategoryModal({ open, onClose, data }) {
  const [categoryName, setCategoryName] = useState(data.name)
  const dispatch = useDispatch()
  const { openToast } = useToast()
  const inputRef = useRef()
  const classes = useStyles()

  const handleChangeInput = (e) => {
    setCategoryName((prev) => (prev = e.target.value))
    dispatch(categoryEdit({ name: e.target.value }))
  }

  const handleClickCancel = () => {
    onClose()
    dispatch(categoryClearEdit())
    GAEvent('메인', '카테고리 제목 수정 취소')
  }

  const handleClickConfirm = async () => {
    try {
      const response = await dispatch(
        categoryModifyThunk({
          id: data.id,
          name: inputRef.current.value,
        })
      )
      await dispatch(categoriesReadThunk())
      dispatch(categorySelect({ ...response }))
      dispatch(categoryClearEdit())
      onClose()
      GAEvent('메인', '카테고리 제목 수정 완료')
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }
  const handleKeyUpEnter = (e) => {
    e.stopPropagation()
    if (e.key === 'Enter') handleClickConfirm()
  }

  useEffect(() => {
    dispatch(categoryEdit({ id: data?.id, name: data?.name }))
    GAEvent('메인', '카테고리 제목 수정 버튼 클릭')
  }, [])

  return (
    <StyledDialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <StyledDialogTitle id="alert-dialog-title">카테고리 수정</StyledDialogTitle>
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
        <Button onClick={handleClickCancel} className={clsx('cancle', classes.modalButton)}>
          취소
        </Button>
        <Button onClick={handleClickConfirm} className={clsx('confirm', classes.modalButton)}>
          확인
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default UpdateCategoryModal
