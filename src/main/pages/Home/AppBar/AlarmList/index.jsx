import React, { useCallback } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import NoImageIcon from '@material-ui/icons/Image'
import NotificationsIcon from '@material-ui/icons/Notifications'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import { createTab } from '@/utils/chromeApis/tab'
import linkListEmptyIcon from '@assets/images/linkListEmptyIcon.png'
import { alaramNoticeSelector, alaramNoticeReadNotice, alaramNoticeNoReturnNoticeThunk } from '@modules/alarmNotice'
import { useToast } from '@modules/ui'

import useStyles, { SmallAvatar } from './style'

const EMPTY_ALARM = 0

function AlarmList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const listData = useSelector(alaramNoticeSelector.listData)
  const { openToast } = useToast()

  const handleClickAlarm = useCallback(
    (alarm) => (e) => {
      e.stopPropagation()
      dispatch(alaramNoticeReadNotice.request({ alarm_id: alarm.id }))
      createTab(alarm.url_path)
    },
    [dispatch]
  )

  const handleDeleteAlarm = useCallback(
    (alarm_id) => async (e) => {
      try {
        e.stopPropagation()
        await dispatch(alaramNoticeNoReturnNoticeThunk({ alarm_id }))
        openToast({ type: 'success', message: '알람을 삭제했습니다.' })
      } catch (error) {
        openToast({ type: 'error', message: '알람을 삭제하지 못했습니다.' })
      }
    },
    [dispatch, openToast]
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
                    overlap="circle"
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
