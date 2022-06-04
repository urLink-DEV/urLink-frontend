import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import AddAlertIcon from '@mui/icons-material/AddAlert'
import CreateIcon from '@mui/icons-material/Create'
import DoneIcon from '@mui/icons-material/Done'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Backdrop from '@mui/material/Backdrop'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import { AlertModal } from '@/main/components/modals'
import CloseIconImg from '@assets/images/close.svg'
import LinkIconImg from '@assets/images/link.svg'
import newTabIconImg from '@assets/images/new-tab.svg'
import UnionIconImg from '@assets/images/union.svg'
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
  const [dateVal, setDateVal] = useState(moment(new Date()).format())
  const [isEditable, setIsEditable] = useState(false)
  const [openMore, setOpenMore] = useState(false)
  const [moreAnchorEl, setMoreAnchorEl] = useState(null)
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

  const handleSetAlarm = useCallback(async () => {
    GAEvent('메인', '알람 설정 버튼 클릭')
    try {
      const date = moment(dateVal)
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
  }, [dateVal, data.category, data.id, dispatch, openToast])

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
        {!isEditable ? (
          <>
            <IconButton aria-label="최상단 노출 하기" onClick={handleToggleFavorite}>
              <FavoriteIcon fontSize="small" color={data.is_favorited ? 'secondary' : 'action'} />
            </IconButton>
            <IconButton className={classes.editIcon} aria-label="제목 및 내용 수정 모드 전환" onClick={handleShowEdit}>
              <CreateIcon fontSize="small" />
            </IconButton>
            <IconButton
              className={classes.unionIcon}
              aria-label="메뉴 더보기"
              onClick={(e) => {
                setMoreAnchorEl(e.currentTarget)
                setOpenMore((open) => !open)
              }}
            >
              <img src={UnionIconImg} alt="alert-icon" />
            </IconButton>
            <Backdrop className={classes.backdrop} open={openMore} onClick={() => setOpenMore((open) => !open)} />
            <Menu
              id="more-menu"
              open={openMore}
              onClose={() => setOpenMore((open) => !open)}
              anchorEl={moreAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleCopy}>
                <img className={classes.menuIconImg} src={LinkIconImg} alt="링크 복사하기" />
                링크 복사
              </MenuItem>
              <MenuItem onClick={() => setShowAlarmModal(true)}>
                <AddAlertIcon
                  className={clsx(classes.menuIconImg, {
                    [classes.alarmIconActive]: data.has_alarms,
                  })}
                />{' '}
                알람 설정
              </MenuItem>
              <MenuItem>
                <img className={classes.menuIconImg} src={CloseIconImg} alt="링크 삭제하기" />
                삭제
              </MenuItem>
            </Menu>
          </>
        ) : (
          <IconButton className={classes.doneIcon} aria-label="제목 및 내용 수정 하기" onClick={handleEditDone}>
            <DoneIcon fontSize="small" />
          </IconButton>
        )}
        <AlertModal
          openBool={showAlarmModal}
          handleClose={() => {
            setDateVal(moment(new Date()).format())
            setShowAlarmModal(false)
          }}
          handleYesClick={handleSetAlarm}
        >
          <TextField
            id="datetime"
            type="datetime-local"
            label="알람 시간 설정하기"
            defaultValue={dateVal.toString().substring(0, 16)}
            onChange={(e) => {
              setDateVal(moment(new Date(e.target.value)).format())
            }}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </AlertModal>
      </CardActions>
    </Card>
  )
}

export default memo(Link)
