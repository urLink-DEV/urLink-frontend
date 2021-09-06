import React, { useCallback } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import NoImageIcon from '@mui/icons-material/Image'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import { createTab } from '@/utils/chromeApis/tab'
import linkListEmptyIcon from '@assets/images/linkListEmptyIcon.png'
import {
  alaramNoticeSelector,
  alaramNoticeReadNoticeThunk,
  alaramNoticeNoReturnNoticeThunk,
} from '@modules/alarmNotice'
import { categorySelector } from '@modules/category'
import { linksRead } from '@modules/link'
import { useToast } from '@modules/ui'

import useStyles, { SmallAvatar } from './style'

const EMPTY_ALARM = 0

function AlarmList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const listData = useSelector(alaramNoticeSelector.listData)
  const selectedCategory = useSelector(categorySelector.selectedCategory)
  const { openToast } = useToast()

  const handleClickAlarm = useCallback(
    (alarm) => async (e) => {
      try {
        e.stopPropagation()
        await dispatch(alaramNoticeReadNoticeThunk({ alarm_id: alarm.id }))
        dispatch(linksRead.request({ categoryId: selectedCategory?.id }))
        createTab(alarm.url_path)
      } catch (error) {
        openToast({ type: 'error', message: '예상치 못한 에러가 발생했습니다.' })
      }
    },
    [dispatch, openToast, selectedCategory]
  )

  const handleDeleteAlarm = useCallback(
    (alarm_id) => async (e) => {
      try {
        e.stopPropagation()
        await dispatch(alaramNoticeNoReturnNoticeThunk({ alarm_id }))
        dispatch(linksRead.request({ categoryId: selectedCategory?.id }))
        openToast({ type: 'success', message: '알람을 삭제했습니다.' })
      } catch (error) {
        openToast({ type: 'error', message: '알람을 삭제하지 못했습니다.' })
      }
    },
    [dispatch, openToast, selectedCategory]
  )

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>알람</Typography>
        {listData.length !== EMPTY_ALARM && (
          <List dense>
            {listData.map((data) => (
              <ListItem key={data.id} button className={classes.listItem} onClick={handleClickAlarm(data)}>
                <ListItemAvatar className={classes.avatar}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <SmallAvatar
                        className={clsx({
                          [classes.bgGrey]: data.alarm_has_read,
                        })}
                        alt="alarm-notice"
                      >
                        <NotificationsIcon />
                      </SmallAvatar>
                    }
                  >
                    <Avatar className={classes.icon} src={data.url_image_path} alt="url-favicon">
                      <NoImageIcon />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  className={clsx(classes.text, {
                    [classes.notiecText]: !data.alarm_has_read,
                    [classes.readText]: data.alarm_has_read,
                  })}
                  title={data.url_title}
                  primary={data.url_title}
                  secondary={new Date(data.reserved_time).toLocaleString()}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="alaram-notice-delete" onClick={handleDeleteAlarm(data.id)}>
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        {listData.length === EMPTY_ALARM && (
          <CardMedia className={classes.cover} image={linkListEmptyIcon} alt="alarm list empty" />
        )}
      </CardContent>
    </Card>
  )
}

export default AlarmList
