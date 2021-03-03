import React, { useCallback, useRef, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import DoneIcon from '@material-ui/icons/Done'
import useStyles from './style'
import useOutsideAlerter from '@hooks/useOutsideAlerter'
import { categoriesRead, selectSelectedCategory, categoryModifyThunk } from '@modules/category'

const CATEGORY_SCHEMA = yup.object({
  name: yup
    .string()
    .matches(/[a-zA-Z]/)
    .min(7)
    .max(14),
})

function EditTitle() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const category = useSelector(selectSelectedCategory)
  const { register, handleSubmit: checkSubmit } = useForm({
    defaultValues: {
      name: category?.name,
    },
    resolver: yupResolver(CATEGORY_SCHEMA),
  })

  const rootRef = useRef(null)
  const [isEditable, setIsEditable] = useState(false)

  const handleEditDone = useMemo(() => {
    return checkSubmit(async (e) => {
      if (e.keyCode === 13) {
        await dispatch(
          categoryModifyThunk({
            id: category?.id,
            // name: formData.name,
          })
        )
        dispatch(categoriesRead.request())
        setIsEditable(false)
      }
    })
  }, [category, checkSubmit, dispatch])

  const handleShowEdit = useCallback(() => {
    setIsEditable(true)
  }, [])

  const handleCancelEdit = useCallback(() => {
    setIsEditable(false)
  }, [])

  useOutsideAlerter(rootRef, isEditable, handleCancelEdit)

  return (
    <div className={classes.root} ref={rootRef}>
      {isEditable ? (
        <>
          <InputBase name="name" onKeyUp={handleEditDone} inputRef={register} />
          <IconButton aria-label="카테고리 제목 수정 하기" onClick={handleEditDone}>
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

export default EditTitle
