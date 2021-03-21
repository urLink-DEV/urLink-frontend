import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DoneIcon from '@material-ui/icons/Done'
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

const CHECK_CATEGORY_NAME = /[a-zA-Z]/
const CATEGORY_NAME_EN_MAX_LENTH = 13
const CATEGORY_NAME_KO_MAX_LENTH = 6
const CATEGORY_SCHEMA = yup.object({
  name: yup.string().max(CATEGORY_NAME_EN_MAX_LENTH).required(),
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
  const [categoryNameMaxLength, setCategoyNameMaxLength] = useState(CATEGORY_NAME_EN_MAX_LENTH)
  const [isEditable, setIsEditable] = useState(false)

  const editedName = watch('name') || ''

  useEffect(() => {
    if (CHECK_CATEGORY_NAME.test(editedName)) setCategoyNameMaxLength(CATEGORY_NAME_EN_MAX_LENTH)
    else setCategoyNameMaxLength(CATEGORY_NAME_KO_MAX_LENTH)

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
              maxLength: categoryNameMaxLength,
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
