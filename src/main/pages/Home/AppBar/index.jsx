import React, { useState, useRef, useMemo, Fragment } from 'react'

import { Popover, Badge, List, Avatar, Grid, Drawer } from '@material-ui/core'
import { useSelector } from 'react-redux'

import alarmImg from '@assets/images/alarm.png'
import historyImg from '@assets/images/history.png'
import personImg from '@assets/images/person.png'
import { alarmNoticeSelector } from '@modules/alarmNotice'
import { useHistoryLinks } from '@modules/historyLink'

import AlarmList from './AlarmList'
import DragableHistoryList from './DragableHistoryList'
import Profile from './Profile'
import useStyles, { StyledListItem } from './style'

function AppBar() {
  const classes = useStyles()
  const { reload } = useHistoryLinks()
  const alarmList = useSelector(alarmNoticeSelector.listData)
  const notReadAlarmList = useMemo(() => {
    return alarmList?.filter((item) => !Boolean(item?.alarm_has_read))
  }, [alarmList])
  const alarmRef = useRef(null)
  const profileRef = useRef(null)
  const [historyOpen, setOpenHistory] = useState(false)
  const [openAlarm, setOpenAlarm] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)

  return (
    <Fragment>
      <Grid container className={classes.appBar}>
        <List className={classes.toolBar}>
          <StyledListItem
            button
            aria-describedby="history-drawer"
            onClick={() => {
              reload()
              setOpenHistory((open) => !open)
            }}
          >
            <Avatar variant="square" className={classes.imgButton} src={historyImg} alt="history button" />
          </StyledListItem>

          <StyledListItem
            button
            ref={alarmRef}
            aria-describedby="alarm-popover"
            onClick={() => setOpenAlarm((open) => !open)}
          >
            <Badge
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              badgeContent={notReadAlarmList?.length}
              max={99}
              color="primary"
            >
              <Avatar variant="square" src={alarmImg} alt="alarm button" className={classes.imgButton} />
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
            <Avatar variant="square" src={personImg} alt="profile-popover-button" className={classes.imgButton} />
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
        <DragableHistoryList />
      </Drawer>
    </Fragment>
  )
}

export default AppBar
