import React, { useState } from 'react'

import { Button } from '@mui/material'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import { categoriesRead, categoryCreateThunk } from '@modules/category'
import { useToast } from '@modules/ui'
import { GAEvent } from '@utils/ga'

import { StyledDialog, StyledDialogTitle, StyledDialogContent, StyledDialogActions, useStyles } from './style'

function AddCategoryModal({ open, onClose }) {
  const [categoryName, setCategoryName] = useState('')
  const dispatch = useDispatch()
  const { openToast } = useToast()
  const classes = useStyles()

  const handleClickConfirm = async () => {
    if (!categoryName) return
    try {
      await dispatch(categoryCreateThunk({ name: categoryName, is_favorited: false }))
      dispatch(categoriesRead.request(undefined, { selectFirstCategory: true }))
      setCategoryName('')
      GAEvent('카테고리', '카테고리 생성 완료')
      onClose()
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }
  const handleChangeInput = (e) => {
    if (e.target.value.length > 24) return
    setCategoryName((prev) => (prev = e.target.value))
  }
  const handleKeyUpEnter = (e) => {
    e.stopPropagation()
    if (e.key === 'Enter') handleClickConfirm()
  }
  const handleClickCancel = () => {
    setCategoryName('')
    onClose()
    GAEvent('카테고리', '카테고리 생성 취소')
  }

  return (
    <StyledDialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <StyledDialogTitle id="alert-dialog-title">카테고리 생성</StyledDialogTitle>
      <StyledDialogContent>
        <input
          autoFocus
          type="text"
          className={classes.categoryNameInput}
          value={categoryName}
          onKeyUp={handleKeyUpEnter}
          onChange={handleChangeInput}
          placeholder="카테고리 이름을 입력해주세요."
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

export default AddCategoryModal
