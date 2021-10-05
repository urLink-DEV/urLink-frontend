import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import AddAlertIcon from '@material-ui/icons/AddAlert'
import CreateIcon from '@material-ui/icons/Create'
import DoneIcon from '@material-ui/icons/Done'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import copyIconImg from '@assets/images/link-icon.png'
import newTabIconImg from '@assets/images/new-tab.svg'
import useOutsideAlerter from '@hooks/useOutsideAlerter'
import { alarmCreateThunk } from '@modules/alarm'
import { linkSelector, linksRead, linkModifyThunk, linkSelect, linkCancleSelect } from '@modules/link'
import { useToast } from '@modules/ui'
import { createTab } from '@utils/chromeApis/tab'
import copyLink from '@utils/copyLink'

import useStyles from './style'

const LINK_SCHEMA = yup.object({
  title: yup.string(),
  description: yup.string(),
})

function Link({ data }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { openToast } = useToast()
  const selectedLinkList = useSelector(linkSelector.selectSelectedLink)
  const { register, handleSubmit: checkSubmit, reset } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
    resolver: yupResolver(LINK_SCHEMA),
  })

  const rootRef = useRef(null)
  const [showNewTabIcon, setShowNewTabIcon] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const isSelected = useMemo(() => {
    return selectedLinkList?.find((selectData) => selectData.id === data.id)
  }, [data.id, selectedLinkList])

  useEffect(() => {
    reset({
      title: data.title,
      description: data.description,
    })
  }, [data, reset])

  const handleSelectedLinkCard = useCallback(
    (e) => {
      e.stopPropagation()
      if (isEditable) return
      if (isSelected) dispatch(linkCancleSelect(data))
      else dispatch(linkSelect(data))
    },
    [data, dispatch, isEditable, isSelected]
  )

  const handleShowNewTabIcon = useCallback(() => {
    setShowNewTabIcon(true)
  }, [])

  const handleCloseNewTabIcon = useCallback(() => {
    setShowNewTabIcon(false)
  }, [])

  const handleNewTab = useCallback(
    (e) => {
      e.stopPropagation()
      createTab(data.path)
    },
    [data.path]
  )

  const handleToggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation()
      try {
        await dispatch(
          linkModifyThunk({
            urlId: data.id,
            is_favorited: !data.is_favorited,
          })
        )
        dispatch(linksRead.request({ categoryId: data.category }, { key: data.category }))
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [data.category, data.id, data.is_favorited, dispatch, openToast]
  )

  const handleCopy = useCallback(
    (e) => {
      e.stopPropagation()
      copyLink(data.path)
      openToast({ type: 'success', message: '링크가 복사 되었습니다.' })
    },
    [data.path, openToast]
  )

  const handleSetAlarm = useCallback(
    async (date) => {
      try {
        await dispatch(
          alarmCreateThunk({
            categoryId: data.category,
            urlId: data.id,
            name: `${data.category}-${data.id}`,
            reserved_time: {
              year: date.year(),
              month: date.month() + 1,
              day: date.date(),
              hour: date.hours(),
              minute: date.minute(),
            },
          })
        )
        dispatch(linksRead.request({ categoryId: data.category }, { key: data.category }))
        openToast({ type: 'success', message: '알람이 설정 되었습니다.' })
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [data.category, data.id, dispatch, openToast]
  )

  const handleShowEdit = useCallback(() => {
    setIsEditable(true)
  }, [])

  const handleCancelEdit = useCallback(() => {
    setIsEditable(false)
  }, [])

  const handleEditDone = useMemo(
    () =>
      checkSubmit(async (formData) => {
        try {
          await dispatch(
            linkModifyThunk({
              urlId: data.id,
              title: formData.title,
              description: formData.description,
            })
          )
          dispatch(linksRead.request({ categoryId: data.category }, { key: data.category }))
          setIsEditable(false)
          openToast({ type: 'success', message: '링크 카드 정보가 수정 되었습니다.' })
        } catch (error) {
          openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
        }
      }),
    [checkSubmit, data.category, data.id, dispatch, openToast]
  )

  useOutsideAlerter(rootRef, isEditable, handleCancelEdit)

  return (
    <Card
      className={clsx(classes.root, {
        [classes.editableCard]: isEditable,
        [classes.selectedCard]: isSelected && !isEditable,
      })}
      onClick={handleSelectedLinkCard}
      onMouseEnter={handleShowNewTabIcon}
      onMouseLeave={handleCloseNewTabIcon}
      ref={rootRef}
    >
      <CardActionArea disableRipple>
        <CardMedia component="img" height="120" image={data.image_path} alt={data.title} />
        {showNewTabIcon && (
          <img className={classes.newTabIcon} src={newTabIconImg} onClick={handleNewTab} alt="새 창으로 열기" />
        )}
        <CardContent className={classes.cardContent}>
          {isEditable ? (
            <>
              <InputBase className={classes.contentTitle} name="title" inputRef={register} />
              <InputBase className={classes.contentDesc} name="description" rows={3} multiline inputRef={register} />
            </>
          ) : (
            <>
              <Typography className={classes.contentTitle} noWrap gutterBottom variant="h6" component="h2">
                {data.title}
              </Typography>
              <Typography className={classes.contentDesc} color="textSecondary" variant="body2" component="p">
                {data.description}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions} disableSpacing onClick={(e) => e.stopPropagation()}>
        <IconButton aria-label="최상단 노출 하기" onClick={handleToggleFavorite}>
          <FavoriteIcon fontSize="small" color={data.is_favorited ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton aria-label="복사 하기" onClick={handleCopy}>
          <img className={classes.copyIcon} src={copyIconImg} alt="복사 하기" />
        </IconButton>
        <KeyboardDateTimePicker
          onChange={handleSetAlarm}
          InputProps={{
            disableUnderline: true,
            className: classes.keyboardDatetimePicker,
          }}
          initialFocusedDate={Date.now()}
          disablePast={true}
          keyboardIcon={
            <AddAlertIcon
              fontSize="small"
              className={clsx({
                [classes.alarmIconActive]: data.has_alarms,
              })}
            />
          }
          KeyboardButtonProps={{
            'aria-label': '알람 설정 하기',
          }}
        />
        {isEditable ? (
          <IconButton className={classes.editIcon} aria-label="제목 및 내용 수정 하기" onClick={handleEditDone}>
            <DoneIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton className={classes.editIcon} aria-label="제목 및 내용 수정 모드 전환" onClick={handleShowEdit}>
            <CreateIcon fontSize="small" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
}

export default memo(Link)
