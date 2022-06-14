import React from 'react'

import CreateIcon from '@mui/icons-material/Create'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Tween, Timeline } from 'react-gsap'
import { useSelector, useDispatch } from 'react-redux'
import { Scene } from 'react-scrollmagic'

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
        <Scene duration={100} triggerHook={0.2}>
          <Timeline>
            <Tween
              from={{ fontWeight: 700, fontSize: 28 }}
              to={{ fontWeight: 700, fontSize: 16 }}
              duration={2}
              ease="slow(0.5, 0.8)"
            >
              <Typography variant="h6" component="span" className={classes.title}>
                {category?.name}
              </Typography>
            </Tween>
          </Timeline>
        </Scene>

        <Scene duration={100} triggerHook={0.2}>
          <Timeline>
            <Tween from={{ opacity: 1 }} to={{ opacity: 0 }} duration={2} ease="slow(0.5, 0.8)">
              <IconButton
                aria-label="카테고리 제목 수정 모달 팝업"
                onClick={handleClickChangeName}
                className={classes.updateBtn}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            </Tween>
          </Timeline>
        </Scene>
      </div>
    </div>
  )
}

export default EditableCategoryTitle
