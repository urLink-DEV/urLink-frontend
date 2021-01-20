import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Badge,
} from '@material-ui/core';
import {
  Close as CloseIcon,
  Image as NoImageIcon,
  Notifications as NotificationsIcon,
} from '@material-ui/icons';
import useStyles, { SmallAvatar } from './style';
import linkListEmptyIcon from '@images/linkListEmptyIcon.png';
import {
  alaramNoticeSelector,
  alaramNoticeReadNotice,
  alaramNoticeNoReturnNoticeThunk,
} from '@modules/alarmNotice';
import { useToast } from '@modules/ui';

function AlarmList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const listData = useSelector(alaramNoticeSelector.listData);
  const { openToast } = useToast();

  const handleClickAlarm = (alarm) => (_e) => {
    dispatch(alaramNoticeReadNotice.request({ alarm_id: alarm.id }));
    window.open(alarm.url_path);
  };

  const handleDeleteAlarm = (alarm_id) => async (_e) => {
    try {
      await dispatch(alaramNoticeNoReturnNoticeThunk({ alarm_id }));
      openToast({ type: 'success', message: '알람을 삭제했습니다.' });
    } catch (error) {
      openToast({ type: 'error', message: '알람을 삭제하지 못했습니다.' });
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>알람</Typography>
        {!!listData.length && (
          <List dense>
            {listData.map((data) => (
              <ListItem
                key={data.id}
                button
                className={classes.listItem}
                onClick={handleClickAlarm(data)}
              >
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
                  <IconButton
                    edge="end"
                    aria-label="alaram-notice-delete"
                    onClick={handleDeleteAlarm(data.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        {!listData.length && (
          <CardMedia className={classes.cover} image={linkListEmptyIcon} alt="alarm list empty" />
        )}
      </CardContent>
    </Card>
  );
}

export default AlarmList;

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
