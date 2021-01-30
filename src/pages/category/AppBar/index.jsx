import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Popover, Badge, List, Avatar, Grid, Drawer } from '@material-ui/core';
import useStyles, { StyledListItem } from './style';
import DragableHistoryList from './DragableHistoryList';
import AlarmList from './AlarmList';
import Profile from './Profile';
import alarmImg from '@images/alarm.png';
import personImg from '@images/person.png';
import historyImg from '@images/history.png';
import { useHistoryLinkListData } from '@modules/historyLink';
import { useAlaramNoticeConnection, alaramNoticeSelector } from '@modules/alarmNotice';

function AppBar() {
  useAlaramNoticeConnection();
  const classes = useStyles();
  const { reload } = useHistoryLinkListData();
  const alarmList = useSelector(alaramNoticeSelector.listData);
  const alarmRef = useRef(null);
  const profileRef = useRef(null);
  const [historyOpen, setOpenHistory] = useState(false);
  const [openAlarm, setOpenAlarm] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <Grid container className={classes.appBar}>
        <List className={classes.toolBar}>
          <StyledListItem
            button
            aria-describedby="history-drawer"
            onClick={() => {
              reload();
              setOpenHistory((open) => !open);
            }}
          >
            <Avatar
              variant="square"
              className={classes.imgButton}
              src={historyImg}
              alt="history button"
            />
          </StyledListItem>

          <StyledListItem
            button
            ref={alarmRef}
            aria-describedby="alarm-popover"
            onClick={() => setOpenAlarm((open) => !open)}
          >
            <Badge
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              badgeContent={alarmList.length}
              max={99}
              color="primary"
            >
              <Avatar
                variant="square"
                src={alarmImg}
                alt="alarm button"
                className={classes.imgButton}
              />
            </Badge>
            <Popover
              id="alarm-popover"
              open={openAlarm}
              anchorEl={alarmRef.current}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <AlarmList />
            </Popover>
          </StyledListItem>

          <StyledListItem
            button
            ref={profileRef}
            aria-describedby="profile-popover"
            onClick={() => setOpenProfile((open) => !open)}
          >
            <Avatar
              variant="square"
              src={personImg}
              alt="profile-popover-button"
              className={classes.imgButton}
            />
          </StyledListItem>
          <Popover
            id="profile-popover"
            open={openProfile}
            onClose={() => setOpenProfile((open) => !open)}
            anchorEl={profileRef.current}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Profile />
          </Popover>
        </List>
      </Grid>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={historyOpen}
        onClose={() => setOpenHistory(false)}
      >
        <DragableHistoryList  />
      </Drawer>
    </>
  );
}

export default AppBar;
