import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Popover, Badge, List, Avatar, Grid } from '@material-ui/core';
import useStyles, { StyledListItem } from './style';
import AlarmList from './AlarmList';
import Profile from './Profile';
import alarmImg from '@images/alarm.png';
import personImg from '@images/person.png';
import historyImg from '@images/history.png';
import { useAlaramNoticeConnection, alaramNoticeSelector } from '@modules/alarmNotice';

function CategoryAppBar() {
  useAlaramNoticeConnection();
  const classes = useStyles();
  const alarmList = useSelector(alaramNoticeSelector.listData);

  const alarmRef = useRef(null);
  const [openAlarm, setOpenAlarm] = useState(false);

  const profileRef = useRef(null);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <Grid container className={classes.appBar}>
      <List className={classes.toolBar}>
        <StyledListItem button>
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
  );
}

export default CategoryAppBar;
