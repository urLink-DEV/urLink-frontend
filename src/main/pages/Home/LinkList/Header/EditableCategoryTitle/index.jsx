import React from 'react'

import CreateIcon from '@mui/icons-material/Create'
import DoneIcon from '@mui/icons-material/Done'
import RefreshIcon from '@mui/icons-material/Refresh'
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
  }, [dispatch, category])

  const handleCancelEdit = useCallback(() => {
    setIsEditable(false)
    reset(defaultValues)
    dispatch(categoryClearEdit())
    GAEvent('메인', '카테고리 제목 수정 취소')
  }, [dispatch, reset, defaultValues])

  const handleEditDone = useMemo(() => {
    return checkSubmit(async (formData) => {
      const response = await dispatch(
        categoryModifyThunk({
          id: category.id,
          name: formData.name,
        })
      )
      await dispatch(categoriesReadThunk())
      dispatch(categorySelect({ ...response }))
      dispatch(categoryClearEdit())
      reset(defaultValues)
      setIsEditable(false)
      GAEvent('메인', '카테고리 제목 수정 완료')
    })
  }, [category, checkSubmit, dispatch, reset, defaultValues])

  const handleEditKeyUp = useCallback(
    (e) => {
      if (e.key === 'Enter') handleEditDone()
    },
    [handleEditDone]
  )

  const handleReload = useMemo(() => {
    // return debounce(() => {
    // handleResetInput()
    // GAEvent('메인', '새로고침 버튼 클릭')
    // }, 400)
  }, [])

  useOutsideAlerter(rootRef, isEditable, handleCancelEdit)

  if (!category.id) return null

  return (
    <div className={classes.root} ref={rootRef}>
      {isEditable ? (
        <div className={classes.titleContainer}>
          <InputBase
            name="name"
            onKeyUp={handleEditKeyUp}
            autoFocus
            inputProps={{
              maxLength: CATEGORY_NAME_MAX_LENTH,
            }}
            inputRef={register}
            className={classes.title}
          />
          <button
            type="button"
            className={clsx({
              [classes.confirmBtn]: !isObjkeysEmpty(errors),
            })}
            onClick={handleEditDone}
            disabled={isObjkeysEmpty(errors)}
          >
            확인
          </button>
        </div>
      ) : (
        <div className={classes.titleContainer}>
          <Typography variant="h6" component="span" className={classes.title}>
            {category?.id === editedCategory.id ? editedCategory.name : category?.name}
          </Typography>
          <IconButton className={classes.iconBtn} aria-label="카테고리 제목 수정 모드 전환" onClick={handleShowEdit}>
            <CreateIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default EditableCategoryTitle
