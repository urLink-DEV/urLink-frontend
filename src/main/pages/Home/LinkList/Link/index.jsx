import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import AddAlertIcon from '@mui/icons-material/AddAlert'
import CreateIcon from '@mui/icons-material/Create'
import DoneIcon from '@mui/icons-material/Done'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
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
import { GAEvent } from '@utils/ga'

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
  const {
    register,
    handleSubmit: checkSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
    resolver: yupResolver(LINK_SCHEMA),
  })

  const rootRef = useRef(null)
  const [showNewTabIcon, setShowNewTabIcon] = useState(false)
  const [showAlarmModal, setShowAlarmModal] = useState(false)
  const [dateVal, setDateVal] = useState(new Date())
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
      GAEvent('메인', '링크 선택 하기')
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
      GAEvent('메인', '링크 새 탭 열기 버튼 클릭')
    },
    [data.path]
  )

  const handleToggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation()
      GAEvent('메인', '페이보릿 버튼 클릭')
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
      GAEvent('메인', '링크 복사 버튼 클릭')
    },
    [data.path, openToast]
  )

  const handleSetAlarm = useCallback(
    async (date) => {
      GAEvent('메인', '알람 설정 버튼 클릭')
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
        GAEvent('메인', '알람 설정 완료')
      } catch (error) {
        openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
      }
    },
    [data.category, data.id, dispatch, openToast]
  )

  const handleShowEdit = useCallback(() => {
    setIsEditable(true)
    GAEvent('메인', '링크 수정 버튼 클릭')
  }, [])

  const handleCancelEdit = useCallback(() => {
    setIsEditable(false)
    GAEvent('메인', '링크 바깥 영역 클릭하여 수정 취소')
  }, [])

  const handleEditDone = useMemo(
    () =>
      checkSubmit(async (formData) => {
        GAEvent('메인', '링크 수정 완료 버튼 클릭')
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
        {/* <MobileDateTimePicker
          label="알람 시간 설정하기"
          value={dateVal}
          onChange={(value) => {
            setDateVal(new Date(value))
          }}
          onAccept={handleSetAlarm}
          disablePast={true}
          minDate={new Date()}
          ampm={false}
          inputFormat="yyyy/MM/DD hh:mm a"
          renderInput={(props) => {
            return (
              <div>
                {
                  // MobileDateTimePicker의 Input은 모달 안의 Input과 연결되어있다.
                  // inputProps.onClick으로 구분가능
                  props.inputProps.onClick ? (
                    <div>
                      <TextField className={classes.dateTimePicker} {...props} />
                      <IconButton onClick={props.inputProps.onClick}>
                        <AddAlertIcon
                          fontSize="small"
                          className={clsx({
                            [classes.alarmIconActive]: data.has_alarms,
                          })}
                        />
                      </IconButton>
                    </div>
                  ) : (
                    <TextField {...props} />
                  )
                }
              </div>
            )
          }}
        /> */}{' '}
        <IconButton onClick={() => setShowAlarmModal(true)}>
          <AddAlertIcon
            fontSize="small"
            className={clsx({
              [classes.alarmIconActive]: data.has_alarms,
            })}
          />
        </IconButton>
        {showAlarmModal ? (
          <TextField
            id="datetime-local"
            type="datetime-local"
            label="알람 시간 설정하기"
            value={dateVal}
            onChange={(value) => {
              setDateVal(new Date(value))
            }}
            defaultValue="2017-05-24T10:30"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : null}
        {/* <MobileDateTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          label="With error handler"
          onError={console.log}
          minDate={new Date('2018-01-01T00:00')}
          inputFormat="yyyy/MM/dd hh:mm a"
          mask="___/__/__ __:__ _M"
          renderInput={(params) => <TextField {...params} />}
        /> */}
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
