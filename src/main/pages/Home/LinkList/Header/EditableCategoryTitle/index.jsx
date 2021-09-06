import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CreateIcon from '@mui/icons-material/Create'
import DoneIcon from '@mui/icons-material/Done'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'

import useOutsideAlerter from '@hooks/useOutsideAlerter'
import {
  categoryEdit,
  categoryClearEdit,
  categorySelect,
  categorySelector,
  categoryModifyThunk,
  categoriesReadThunk,
} from '@modules/category'
import { isObjkeysEmpty } from '@utils/filter'

import useStyles from './style'

const CATEGORY_NAME_MAX_LENTH = 18
const CATEGORY_SCHEMA = yup.object({
  name: yup.string().max(CATEGORY_NAME_MAX_LENTH).required(),
})

function EditableCategoryTitle() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const category = useSelector(categorySelector.selectedCategory)
  const defaultValues = useMemo(() => {
    return { name: category?.name }
  }, [category])
  const { register, handleSubmit: checkSubmit, reset, errors, watch } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(CATEGORY_SCHEMA),
  })

  const rootRef = useRef(null)
  const [isEditable, setIsEditable] = useState(false)

  const editedName = watch('name') || ''

  useEffect(() => {
    if (isEditable) dispatch(categoryEdit({ name: editedName }))
  }, [isEditable, editedName, dispatch])

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  const handleShowEdit = useCallback(() => {
    setIsEditable(true)
    dispatch(categoryEdit({ id: category?.id, name: category?.name }))
  }, [dispatch, category])

  const handleCancelEdit = useCallback(() => {
    setIsEditable(false)
    dispatch(categoryClearEdit())
  }, [dispatch])

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
      setIsEditable(false)
    })
  }, [category, checkSubmit, dispatch])

  const handleEditKeyUp = useCallback(
    (e) => {
      if (e.key === 'Enter') handleEditDone()
    },
    [handleEditDone]
  )

  useOutsideAlerter(rootRef, isEditable, handleCancelEdit)

  if (!category.id) return null

  return (
    <div className={classes.root} ref={rootRef}>
      {isEditable ? (
        <>
          <InputBase
            name="name"
            onKeyUp={handleEditKeyUp}
            autoFocus
            inputProps={{
              maxLength: CATEGORY_NAME_MAX_LENTH,
            }}
            inputRef={register}
          />
          <IconButton
            aria-label="카테고리 제목 수정 하기"
            className={clsx({
              [classes.editIconActive]: !isObjkeysEmpty(errors),
            })}
            onClick={handleEditDone}
            disabled={isObjkeysEmpty(errors)}
          >
            <DoneIcon fontSize="small" />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h6" component="span">
            {category?.name}
          </Typography>
          <IconButton aria-label="카테고리 제목 수정 모드 전환" onClick={handleShowEdit}>
            <CreateIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </div>
  )
}

export default EditableCategoryTitle
