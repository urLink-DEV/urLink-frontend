import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from './styles/AlarmPopover'
import linkListEmptyIcon from '../../images/logo/logo32.png'
/*
 * id: 15
 * name: "test"
 * alarm_has_done: false
 * alarm_has_read: false
 * reserved_time: "2020-06-21 09:31:00+00:00"
 * url_description: "개발을 진행하거나, 웹브라우저를 이용하여 업무를 하다보면, 의외로 크롬에 있는 웹스토어에서 extension을 다운받아 진행하는 경우들이 많습니다. 웹브라우저내의 스크린샷을 찍는다"
 * url_favicon_path: "https://trustyoo86.github.io/assets/icons/android-icon-192x192.png"
 * url_image_path: "https://trustyoo86.github.io/assets/back-code2.jpg"
 * url_path: "https://trustyoo86.github.io/javascript/2019/12/27/chrome-extension-overview.html"
 * url_title: "Chrome extension 만들기 (1)" 
 */
export default function AlarmPopover(props) {
  const classes = useStyles()
  const {alarmList, onAlarmRead, onNoReturnAlarm} = props

  const handleClickAlarm = alarm => e => {
    onAlarmRead({ alarm_id: alarm.id, action: "read" })
    window.open(alarm.url_path)
  }

  const handleDeleteAlarm = id => e => {
    onNoReturnAlarm({ alarm_id: id, action: "done" })
  }

  return (
      (alarmList.length > 0)
       ? <List className={classes.root}>
       {alarmList.map((alarm) =>
         <ListItem key={alarm.id} button 
           onClick={handleClickAlarm(alarm)}
           style={alarm.alarm_has_read ? {width:'100%', backgroundColor: '#e9ecef'} : {width:'100%', backgroundColor: 'white'}}
         >
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              {
                alarm.url_image_path 
                ? <img className={classes.img} src={alarm.url_image_path} alt="url-favicon"/> 
                : <ImageIcon />
              }
            </Avatar>
          </ListItemAvatar>
          <ListItemText className={classes.text} 
            primary={alarm.url_title} 
            secondary={new Date(alarm.reserved_time).toLocaleString()}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments" onClick={handleDeleteAlarm(alarm.id)}>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
       )}
     </List> : <img src={linkListEmptyIcon} alt="alarm list empty"/>
  )
}