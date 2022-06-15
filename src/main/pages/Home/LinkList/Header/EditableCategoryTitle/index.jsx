import React from 'react'

import CreateIcon from '@mui/icons-material/Create'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'

import { MODAL_NAME, useDialog } from '@/modules/ui'
import { categoryEdit, categorySelector } from '@modules/category'
import { GAEvent } from '@utils/ga'

import useStyles from './style'

function EditableCategoryTitle() {
  const dispatch = useDispatch()
  const category = useSelector(categorySelector.selectedCategory)
  const classes = useStyles()

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
      <div className={classes.titleContainer}>
        <Typography variant="h6" component="span" className={classes.title}>
          {category?.name}
        </Typography>
        <IconButton
          aria-label="카테고리 제목 수정 모달 팝업"
          onClick={handleClickChangeName}
          className={classes.updateBtn}
        >
          <CreateIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  )
}

export default EditableCategoryTitle
