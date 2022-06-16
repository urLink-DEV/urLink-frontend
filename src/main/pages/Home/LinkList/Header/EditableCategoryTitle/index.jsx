import React from 'react'

import CreateIcon from '@mui/icons-material/Create'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { MODAL_NAME, uiSelector, useDialog } from '@/modules/ui'
import { categoryEdit, categorySelector } from '@modules/category'
import { GAEvent } from '@utils/ga'

import useStyles from './style'

function EditableCategoryTitle() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const category = useSelector(categorySelector.selectedCategory)
  const isAppBarInversion = useSelector(uiSelector.isAppBarInversion)

  const { toggle: updateCategoryToggle } = useDialog(MODAL_NAME.UPDATE_CATEGORY_MODAL)

  const handleClickChangeName = (e) => {
    e.stopPropagation()
    updateCategoryToggle()
    dispatch(categoryEdit({ id: category?.id, name: category?.name }))
    GAEvent('메인', '카테고리 제목 수정 버튼 클릭')
  }

  if (!category.id) return null

  return (
    <div className={classes.root}>
      <Typography
        variant="h6"
        component="span"
        className={clsx(classes.title, { [classes.titleInversion]: isAppBarInversion })}
      >
        {category?.name}
      </Typography>
      <IconButton
        aria-label="카테고리 제목 수정 모달 팝업"
        onClick={handleClickChangeName}
        className={clsx(classes.updateBtn, { [classes.updateBtnInversion]: isAppBarInversion })}
      >
        <CreateIcon fontSize="small" />
      </IconButton>
    </div>
  )
}

export default EditableCategoryTitle
